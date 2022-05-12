using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class Motoristas : BaseEntity
    {
        public Motoristas()
        {
            SetSituacao();
        }

        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }
        public string Observacao { get; set; }
        public string Codigo { get; set; }
        public bool Situacao { get; set; }
        [ForeignKey("Empresas")]
        public int EmpresaId { get; set; }
        public Empresas Empresa { get; set; }
        public void SetSituacao()
        {
            Situacao = true;
        }
    }
}
