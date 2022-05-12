using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Onibus
{
    public class OnibusDTO
    {
        public string Nome { get; set; }
        public string Placa { get; set; }
        public string Marca { get; set; }
        public int Poltronas { get; set; }
        public string Observacao { get; set; }
        public string Codigo { get; set; }
        public bool Situacao { get; set; }
        public int EmpresaId { get; set; }
        public Empresas Empresa { get; set; }
    }
}
