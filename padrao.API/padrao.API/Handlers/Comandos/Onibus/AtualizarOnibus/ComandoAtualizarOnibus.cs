using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Onibus.AtualizarOnibus
{
    public class ComandoAtualizarOnibus : IRequestHandler<ParametroAtualizarOnibus, ResultadoCadastrarOnibus>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarOnibus(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarOnibus> Handle(ParametroAtualizarOnibus request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Onibus.AsNoTracking()
                                                      .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Onibus.Codigo);
                if (dados == null)
                {
                    return new ResultadoCadastrarOnibus
                    {
                        Mensagem = "Carro não encontrado!",
                        Sucesso = false
                    };
                }

                dados.Nome = String.IsNullOrEmpty(request.Onibus.Nome) ? dados.Nome : request.Onibus.Nome;
                dados.Placa = String.IsNullOrEmpty(request.Onibus.Placa) ? dados.Placa : request.Onibus.Placa;
                dados.Observacao = String.IsNullOrEmpty(request.Onibus.Observacao) ? dados.Observacao : request.Onibus.Observacao;
                dados.Marca = String.IsNullOrEmpty(request.Onibus.Marca) ? dados.Marca : request.Onibus.Marca;
                dados.Poltronas = request.Onibus.Poltronas;
                dados.DataAlteracao = DateTime.Now;

                _bancoDBContext.Update(dados);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarOnibus
                {
                    Onibus = _mapper.Map<OnibusDTO>(dados),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarOnibus
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
