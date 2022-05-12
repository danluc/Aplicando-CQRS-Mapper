using padrao.API.Models.DTOs;

namespace padrao.API.Handlers.Comandos.Enderecos.CadastrarEndereco
{
    public class ResultadoCadastrarEndereco : ResultadoControllerDTO
    {
        public Models.Enderecos Endereco { get; set; }
    }
}
