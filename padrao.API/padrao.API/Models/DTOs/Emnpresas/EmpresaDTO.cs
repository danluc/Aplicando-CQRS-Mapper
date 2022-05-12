using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Emnpresas
{
    public class EmpresaDTO
    {
        public string Nome { get; set; }
        public string CPFCNPJ { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public string Imagem { get; set; }
        public Enderecos Endereco { get; set; }
    }
}
