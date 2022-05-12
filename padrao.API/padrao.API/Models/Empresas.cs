using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class Empresas : BaseEntity
    {
        public string Nome { get; set; }
        public string CPFCNPJ { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Codigo { get; set; }
        public string Imagem { get; set; }
        [ForeignKey("Enderecos")]
        public int? EnderecoId { get; set; }
        public Enderecos Endereco { get; set; }
        public virtual List<Usuarios> Usuarios { get; set; }
    }
}
