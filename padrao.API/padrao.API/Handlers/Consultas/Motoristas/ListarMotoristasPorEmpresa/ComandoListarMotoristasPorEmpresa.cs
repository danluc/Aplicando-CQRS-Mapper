using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.ListarMotoristasPorEmpresa
{
    public class ComandoListarMotoristasPorEmpresa : IRequestHandler<ParametroListarMotoristasPorEmpresa, ResultadoListarMotoristasPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarMotoristasPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarMotoristasPorEmpresa> Handle(ParametroListarMotoristasPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var motoristas = await _bancoDBContext.Motoristas.Include(e => e.Empresa).Where(e => e.Situacao).ToListAsync();
                return new ResultadoListarMotoristasPorEmpresa
                {
                    Motoristas = _mapper.Map<List<MotoristaDTO>>(motoristas),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarMotoristasPorEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
