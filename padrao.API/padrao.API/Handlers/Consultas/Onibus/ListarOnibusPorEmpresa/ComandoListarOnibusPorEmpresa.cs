using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Onibus.ListarOnibusPorEmpresa
{
    public class ComandoListarOnibusPorEmpresa : IRequestHandler<ParametroListarOnibusPorEmpresa, ResultadoListarOnibusPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarOnibusPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarOnibusPorEmpresa> Handle(ParametroListarOnibusPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Onibus.Include(e => e.Empresa).Where(e => e.Situacao).ToListAsync();
                return new ResultadoListarOnibusPorEmpresa
                {
                    Onibus = _mapper.Map<List<OnibusDTO>>(dados),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarOnibusPorEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
