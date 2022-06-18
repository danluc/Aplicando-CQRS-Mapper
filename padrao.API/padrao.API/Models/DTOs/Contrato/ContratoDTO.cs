using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Contrato
{
    public class ContratoDTO
    {
        public int Id { get; set; }
        public int EmpresaId { get; set; }
        public bool Situacao { get; set; }
        public string Contrato { get; set; }
        public string Codigo { get; set; }
        public Empresas Empresa { get; set; }
    }
}
