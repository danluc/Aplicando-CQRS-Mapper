using MediatR;
using padrao.API.Models.DTOs.Usuarios;

namespace padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario
{
    public class ParametroSalvarUsuario : IRequest<ResultadoSalvarUsuario>
    {
        public ParametroSalvarUsuario(RegistrarDTO dados, string funcoes, string nomeEmpresa, string nomeUsuarioLogado, bool fnAdmin = true)
        {
            Dados = dados;
            Funcoes = funcoes;
            FnAdmin = fnAdmin;
            NomeEmpresa = nomeEmpresa;
            NomeUsuarioLogado = nomeUsuarioLogado;
        }

        public RegistrarDTO Dados { get; set; }
        public string Funcoes { get; set; }
        public string NomeEmpresa { get; set; }
        public string NomeUsuarioLogado { get; set; }
        public bool FnAdmin { get; set; }
    }
}
