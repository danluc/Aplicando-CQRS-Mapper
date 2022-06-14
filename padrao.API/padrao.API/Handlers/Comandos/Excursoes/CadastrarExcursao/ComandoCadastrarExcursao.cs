using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Excursoes.CadastrarExcursao
{
    public class ComandoCadastrarExcursao : IRequestHandler<ParametroCadastrarExcursao, ResultadoCadastrarExcursao>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoCadastrarExcursao(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarExcursao> Handle(ParametroCadastrarExcursao request, CancellationToken cancellationToken)
        {
            try
            {
                var destino = await CadastrarEndereco(request.Excursao.EnderecoDestino);
                var saida = await CadastrarEndereco(request.Excursao.EnderecoSaida);
                request.Excursao.EmpresaId = request.EmpresaId;
                request.Excursao.EnderecoDestinoId = destino.Id;
                request.Excursao.EnderecoSaidaId = saida.Id;
                request.Excursao.UsuarioId = request.UsuarioId;
                request.Excursao.Codigo = GerarCodigoHelper.GerarCodigo();
                var dados = _mapper.Map<Models.Excursoes>(request.Excursao);
                await _bancoDBContext.AddAsync(dados);
                
                foreach (var item in request.Excursao.OnibusMotoristas)
                {
                    item.ExcursoesId = dados.Id;
                    await _bancoDBContext.AddAsync(item);
                }

                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarExcursao
                {
                    Sucesso = true,
                    Excursao = _mapper.Map<ExcursaoDTO>(dados)
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarExcursao
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }

        private async Task<Models.Enderecos> CadastrarEndereco(Models.Enderecos enderecos)
        {
            var end = await _bancoDBContext.Enderecos.FirstOrDefaultAsync(e => e.CEP == enderecos.CEP && e.Numero == enderecos.Numero);
            if (end != null)
                return end;

            var result = await _bancoDBContext.AddAsync(enderecos);
            await _bancoDBContext.SaveChangesAsync();

            return result.Entity;
        }
    }
}
