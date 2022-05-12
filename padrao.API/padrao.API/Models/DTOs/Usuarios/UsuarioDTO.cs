using System;

namespace padrao.API.Models.DTOs.Usuarios
{
    public class UsuarioDTO
    {
        public int Id { get; set; }
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public bool Situacao { get; set; }
        public int EmpresaId { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public DateTime DataCadastro { get; set; }
        public virtual Empresas Empresa { get; set; }
        public virtual FuncoesEmpresaUsuario Funcao { get; set; }
    }
}
