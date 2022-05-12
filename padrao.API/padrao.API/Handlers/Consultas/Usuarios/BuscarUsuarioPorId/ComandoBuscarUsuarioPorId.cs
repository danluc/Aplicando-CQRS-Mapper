using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Usuarios.BuscarUsuarioPorId
{
    public class ComandoBuscarUsuarioPorId : IRequestHandler<ParametrosBuscarUsuarioPorId, ResultadoBuscarUsuarioPorId>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoBuscarUsuarioPorId(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoBuscarUsuarioPorId> Handle(ParametrosBuscarUsuarioPorId request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Usuarios.Include("Empresa").Include("Funcao").FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

                return new ResultadoBuscarUsuarioPorId
                {
                    Sucesso = true,
                    Usuario = _mapper.Map<UsuarioDTO>(dados)
                };
            }
            catch (Exception ex)
            {
                return new ResultadoBuscarUsuarioPorId
                {
                    Mensagem = ex.Message,
                    Sucesso = false,
                };
            }
        }
    }
}
