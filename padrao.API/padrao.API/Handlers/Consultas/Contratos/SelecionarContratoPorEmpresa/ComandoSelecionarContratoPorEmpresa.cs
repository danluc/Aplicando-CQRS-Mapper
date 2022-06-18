using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Contratos.CadastrarContrato;
using padrao.API.Models.DTOs.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Contratos.SelecionarContratoPorEmpresa
{
    public class ComandoSelecionarContratoPorEmpresa : IRequestHandler<ParametroSelecionarContratoPorEmpresa, ResultadoCadastrarContrato>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoSelecionarContratoPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarContrato> Handle(ParametroSelecionarContratoPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.ContratoViagem.AsNoTracking().Include(e => e.Empresa)
                                                                        .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);

                return new ResultadoCadastrarContrato
                {
                    Contrato = _mapper.Map<ContratoDTO>(dados),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarContrato
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
