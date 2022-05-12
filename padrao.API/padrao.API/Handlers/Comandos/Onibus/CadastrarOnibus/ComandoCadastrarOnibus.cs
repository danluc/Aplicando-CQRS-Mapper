using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus
{
    public class ComandoCadastrarOnibus : IRequestHandler<ParametroCadastrarOnibus, ResultadoCadastrarOnibus>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoCadastrarOnibus(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarOnibus> Handle(ParametroCadastrarOnibus request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Onibus.AsNoTracking()
                                                       .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId
                                                                            && e.Nome == request.Onibus.Nome
                                                                            && e.Placa == request.Onibus.Placa);
                if (dados != null)
                {
                    var dTO = _mapper.Map<OnibusDTO>(dados);
                    return new ResultadoCadastrarOnibus
                    {
                        Mensagem = "Carro já cadastrado!",
                        Sucesso = false,
                        Onibus = dTO
                    };
                }

                request.Onibus.EmpresaId = request.EmpresaId;
                request.Onibus.Codigo = GerarCodigoHelper.GerarCodigo();
                var onibus = _mapper.Map<Models.Onibus>(request.Onibus);
                onibus.SetSituacao();
                await _bancoDBContext.AddAsync(onibus);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarOnibus
                {
                    Sucesso = true,
                    Onibus = _mapper.Map<OnibusDTO>(onibus)
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
