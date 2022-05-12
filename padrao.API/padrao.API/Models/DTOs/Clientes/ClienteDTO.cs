using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Clientes
{
    public class ClienteDTO
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public string RG { get; set; }
        public string OrgEmissor { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public DateTime DataNascimento { get; set; }
        public string Imagem { get; set; }
        public string Observacao { get; set; }
        public string Codigo { get; set; }
        public int? EnderecoId { get; set; }
        public int EmpresaId { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public DateTime DataCadastro { get; set; }
        public Enderecos Endereco { get; set; }
        public Empresas Empresa { get; set; }
    }
}
