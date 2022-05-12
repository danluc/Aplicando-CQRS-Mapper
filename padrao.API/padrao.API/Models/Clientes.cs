using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class Clientes : BaseEntity
    {
        public Clientes()
        {
            SetSituacao();
        }

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
        public bool Situacao { get; set; }
        [ForeignKey("Empresas")]
        public int EmpresaId { get; set; }
        [ForeignKey("Enderecos")]
        public int? EnderecoId { get; set; }
        public Enderecos Endereco { get; set; }
        public Empresas Empresa { get; set; }

        public void SetSituacao()
        {
            Situacao = true;
        }
    }
}
