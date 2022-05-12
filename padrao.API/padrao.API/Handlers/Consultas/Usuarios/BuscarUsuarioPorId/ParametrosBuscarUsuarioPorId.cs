using MediatR;

namespace padrao.API.Handlers.Consultas.Usuarios.BuscarUsuarioPorId
{
    public class ParametrosBuscarUsuarioPorId : IRequest<ResultadoBuscarUsuarioPorId>
    {
        public int Id { get; set; }
    }
}
