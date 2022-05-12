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

namespace padrao.API.Handlers.Consultas.Onibus.SelecionarOnibusPorEmpresa
{
    public class ComandoSelecionarOnibusPorEmpresa : IRequestHandler<ParametroSelecionarOnibusPorEmpresa, ResultadoCadastrarOnibus>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoSelecionarOnibusPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarOnibus> Handle(ParametroSelecionarOnibusPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Onibus.AsNoTracking().Include(e => e.Empresa)
                                                           .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);

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
