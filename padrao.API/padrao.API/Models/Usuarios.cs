using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class Usuarios : BaseEntity
    {
        public Usuarios()
        {
            SetSituacao();
        }

        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public bool Situacao { get; set; }
        public string Codigo { get; set; }
        [ForeignKey("Empresas")]
        public int EmpresaId { get; set; }
        public virtual Empresas Empresa { get; set; }
        public virtual FuncoesEmpresaUsuario Funcao { get; set; }

        public void SetSituacao()
        {
            Situacao = true;
        }
    }
}
