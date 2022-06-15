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

namespace padrao.API.Handlers.Consultas.Excursoes.SelecionarExcursaoPorCodigo
{
    public class ComandoSelecionarExcursaoPorCodigo : IRequestHandler<ParametroSelecionarExcursaoPorCodigo, ResultadoSelecionarExcursaoPorCodigo>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoSelecionarExcursaoPorCodigo(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoSelecionarExcursaoPorCodigo> Handle(ParametroSelecionarExcursaoPorCodigo request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Excursoes.AsNoTracking()
                                                            .Include("EnderecoDestino")
                                                            .Include("EnderecoSaida")
                                                            .Include("Empresa")
                                                            .Include("OnibusMotoristas")
                                                            .Include("OnibusMotoristas.Motorista")
                                                            .Include("OnibusMotoristas.Onibus")
                                                            .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);

                return new ResultadoSelecionarExcursaoPorCodigo
                {
                    Excursao = _mapper.Map<ExcursaoDTO>(dados),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoSelecionarExcursaoPorCodigo
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
