using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Motoristas
{
    public class MotoristaDTO
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public string Observacao { get; set; }
        public string Codigo { get; set; }
        public bool Situacao { get; set; }
        public int EmpresaId { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public DateTime DataCadastro { get; set; }
        public Empresas Empresa { get; set; }
    }
}
