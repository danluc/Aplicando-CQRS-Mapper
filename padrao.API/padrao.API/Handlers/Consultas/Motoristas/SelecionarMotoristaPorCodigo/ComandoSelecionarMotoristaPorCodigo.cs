using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Motoristas.CadastrarMotorista;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.SelecionarMotoristaPorCodigo
{
    public class ComandoSelecionarMotoristaPorCodigo : IRequestHandler<ParametroSelecionarMotoristaPorCodigo, ResultadoCadastrarMotorista>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoSelecionarMotoristaPorCodigo(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarMotorista> Handle(ParametroSelecionarMotoristaPorCodigo request, CancellationToken cancellationToken)
        {
            try
            {
                var motorista = await _bancoDBContext.Motoristas.AsNoTracking().Include(e => e.Empresa)
                                                           .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);

                return new ResultadoCadastrarMotorista
                {
                    Motorista = _mapper.Map<MotoristaDTO>(motorista),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarMotorista
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
