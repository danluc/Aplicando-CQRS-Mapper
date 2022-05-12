using MediatR;

namespace padrao.API.Handlers.Comandos.Enderecos.CadastrarEndereco
{
    public class ParametroCadastrarEndereco : IRequest<ResultadoCadastrarEndereco>
    {
        public ParametroCadastrarEndereco(Models.Enderecos dados)
        {
            Dados = dados;
        }

        public Models.Enderecos Dados { get; set; }
    }
}
