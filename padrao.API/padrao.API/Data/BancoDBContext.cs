using Microsoft.EntityFrameworkCore;
using padrao.API.Models;

namespace padrao.API.Data
{
    public class BancoDBContext : DbContext
    {
        public BancoDBContext(DbContextOptions<BancoDBContext> options) : base(options)
        {
        }

        public virtual DbSet<Usuarios> Usuarios { get; set; }
        public virtual DbSet<Empresas> Empresas { get; set; }
        public virtual DbSet<Enderecos> Enderecos { get; set; }
        public virtual DbSet<FuncoesEmpresaUsuario> FuncoesEmpresaUsuario { get; set; }
        public virtual DbSet<Clientes> Clientes { get; set; }
        public virtual DbSet<Motoristas> Motoristas { get; set; }
        public virtual DbSet<Onibus> Onibus { get; set; }
        public virtual DbSet<Hotel> Hotel { get; set; }
        public virtual DbSet<Excursoes> Excursoes { get; set; }
        public virtual DbSet<OnibusMotoristaExcursao> OnibusMotoristaExcursao { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
