using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class ContratoViagem : BaseEntity
    {
        [ForeignKey("Empresas")]
        public int EmpresaId { get; set; }
        public bool Situacao { get; set; } = true;
        public string Contrato { get; set; }
        public string Codigo { get; set; }
        public Empresas Empresa { get; set; }
    }
}
