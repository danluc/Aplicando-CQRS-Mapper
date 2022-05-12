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

namespace padrao.API.Handlers.Comandos.Motoristas.AtualizarMotorista
{
    public class ComandoAtualizarMotorista : IRequestHandler<ParametroAtualizarMotorista, ResultadoCadastrarMotorista>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarMotorista(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarMotorista> Handle(ParametroAtualizarMotorista request, CancellationToken cancellationToken)
        {
            try
            {
                var motorista = await _bancoDBContext.Motoristas.AsNoTracking()
                                                      .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Motorista.Codigo);
                if (motorista == null)
                {
                    return new ResultadoCadastrarMotorista
                    {
                        Mensagem = "Motorista não encontrado!",
                        Sucesso = false
                    };
                }

                motorista.Nome = String.IsNullOrEmpty(request.Motorista.Nome) ? motorista.Nome : request.Motorista.Nome;
                motorista.Celular = String.IsNullOrEmpty(request.Motorista.Celular) ? motorista.Celular : request.Motorista.Celular;
                motorista.Observacao = String.IsNullOrEmpty(request.Motorista.Observacao) ? motorista.Observacao : request.Motorista.Observacao;
                motorista.Telefone = String.IsNullOrEmpty(request.Motorista.Telefone) ? motorista.Observacao : request.Motorista.Telefone;
                motorista.DataAlteracao = DateTime.Now;
                _bancoDBContext.Update(motorista);
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
