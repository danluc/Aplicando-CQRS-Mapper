using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Excursoes.AtualizarExcursao
{
    public class ComandoAtualizarExcursao : IRequestHandler<ParametroAtualizarExcursao, ResultadoAtualizarExcursao>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarExcursao(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoAtualizarExcursao> Handle(ParametroAtualizarExcursao request, CancellationToken cancellationToken)
        {
            try
            {
                var hasDados = await _bancoDBContext.Excursoes.AsNoTracking()
                                                            .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Excursao.Codigo);
                if (hasDados == null)
                {
                    return new ResultadoAtualizarExcursao
                    {
                        Mensagem = "Excursão não encotrado!",
                        Sucesso = false
                    };
                }

                var destino = await CadastrarEndereco(request.Excursao.EnderecoDestino);
                var saida = await CadastrarEndereco(request.Excursao.EnderecoSaida);
                hasDados.EnderecoDestinoId = destino.Id;
                hasDados.EnderecoSaidaId = saida.Id;
                hasDados.DataAlteracao = DateTime.Now;
                hasDados.UsuarioId = request.UsuarioId;
                hasDados.DataFim = request.Excursao.DataFim;
                hasDados.DataIncio = request.Excursao.DataIncio;
                hasDados.DataSaida = request.Excursao.DataSaida;
                hasDados.DataRetorno = request.Excursao.DataRetorno;
                hasDados.ValorAdulto = request.Excursao.ValorAdulto;
                hasDados.ValorInfantil = request.Excursao.ValorInfantil;
                hasDados.ConsiderarCrianca = request.Excursao.ConsiderarCrianca;
                hasDados.Itinerario = request.Excursao.Itinerario;
                hasDados.Observacoes = request.Excursao.Observacoes;
                hasDados.Contrato = request.Excursao.Contrato;
                hasDados.Orcamento = request.Excursao.Orcamento;
                hasDados.Nome = request.Excursao.Nome;

                _bancoDBContext.Update(hasDados);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoAtualizarExcursao
                {
                    Excursao = _mapper.Map<ExcursaoDTO>(hasDados),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoAtualizarExcursao
                {
                    Sucesso = false,
                    Mensagem = ex.Message
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
