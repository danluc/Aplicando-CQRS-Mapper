using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    [Table("Funcoes_Empresa_Usuario")]
    public class FuncoesEmpresaUsuario : BaseEntity
    {
        public string Funcoes { get; set; }
        [ForeignKey("Empresas")]
        public int EmpresaId { get; set; }
        [ForeignKey("Usuarios")]
        public int UsuarioId { get; set; }
        public virtual Empresas Empresa { get; set; }
        public virtual Usuarios Usuario { get; set; }
    }
}
