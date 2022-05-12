using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Motoristas.CadastrarMotorista
{
    public class ComandoCadastrarMotorista : IRequestHandler<ParametroCadastrarMotorista, ResultadoCadastrarMotorista>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoCadastrarMotorista(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarMotorista> Handle(ParametroCadastrarMotorista request, CancellationToken cancellationToken)
        {
            try
            {
                var motorista = await _bancoDBContext.Motoristas.AsNoTracking()
                                                       .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId
                                                                            && e.Nome == request.Motorista.Nome
                                                                            && e.Celular == request.Motorista.Celular);
                if (motorista != null)
                {
                    var motoristadto = _mapper.Map<MotoristaDTO>(motorista);
                    return new ResultadoCadastrarMotorista
                    {
                        Mensagem = "Motorista já cadastrado!",
                        Sucesso = false,
                        Motorista = motoristadto
                    };
                }

                request.Motorista.EmpresaId = request.EmpresaId;
                request.Motorista.Codigo = GerarCodigoHelper.GerarCodigo();
                motorista = _mapper.Map<Models.Motoristas>(request.Motorista);
                motorista.SetSituacao();
                await _bancoDBContext.AddAsync(motorista);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

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
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
