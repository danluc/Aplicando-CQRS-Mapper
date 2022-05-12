﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using padrao.API.Data;

namespace padrao.API.Migrations
{
    [DbContext(typeof(BancoDBContext))]
    partial class BancoDBContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("padrao.API.Models.Clientes", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CPF");

                    b.Property<string>("Celular");

                    b.Property<string>("Codigo");

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<DateTime>("DataNascimento");

                    b.Property<string>("Email");

                    b.Property<int>("EmpresaId");

                    b.Property<int?>("EnderecoId");

                    b.Property<string>("Imagem");

                    b.Property<string>("Nome");

                    b.Property<string>("Observacao");

                    b.Property<string>("OrgEmissor");

                    b.Property<string>("RG");

                    b.Property<bool>("Situacao");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.HasIndex("EnderecoId");

                    b.ToTable("Clientes");
                });

            modelBuilder.Entity("padrao.API.Models.Empresas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CPFCNPJ");

                    b.Property<string>("Codigo");

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Email");

                    b.Property<int?>("EnderecoId");

                    b.Property<string>("Imagem");

                    b.Property<string>("Nome");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.HasIndex("EnderecoId");

                    b.ToTable("Empresas");
                });

            modelBuilder.Entity("padrao.API.Models.Enderecos", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Bairro");

                    b.Property<string>("CEP");

                    b.Property<string>("Cidade");

                    b.Property<string>("Complemento");

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Logradouro");

                    b.Property<string>("Numero");

                    b.Property<string>("UF");

                    b.HasKey("Id");

                    b.ToTable("Enderecos");
                });

            modelBuilder.Entity("padrao.API.Models.FuncoesEmpresaUsuario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<int>("EmpresaId");

                    b.Property<string>("Funcoes");

                    b.Property<int>("UsuarioId");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.HasIndex("UsuarioId")
                        .IsUnique();

                    b.ToTable("Funcoes_Empresa_Usuario");
                });

            modelBuilder.Entity("padrao.API.Models.Motoristas", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Celular");

                    b.Property<string>("Codigo");

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<int>("EmpresaId");

                    b.Property<string>("Nome");

                    b.Property<string>("Observacao");

                    b.Property<bool>("Situacao");

                    b.Property<string>("Telefone");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("Motoristas");
                });

            modelBuilder.Entity("padrao.API.Models.Onibus", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Codigo");

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<int>("EmpresaId");

                    b.Property<string>("Marca");

                    b.Property<string>("Nome");

                    b.Property<string>("Observacao");

                    b.Property<string>("Placa");

                    b.Property<int>("Poltronas");

                    b.Property<bool>("Situacao");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("Onibus");
                });

            modelBuilder.Entity("padrao.API.Models.Usuarios", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Codigo");

                    b.Property<DateTime?>("DataAlteracao");

                    b.Property<DateTime>("DataCadastro");

                    b.Property<string>("Email");

                    b.Property<int>("EmpresaId");

                    b.Property<string>("Nome");

                    b.Property<string>("Senha");

                    b.Property<bool>("Situacao");

                    b.HasKey("Id");

                    b.HasIndex("EmpresaId");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("padrao.API.Models.Clientes", b =>
                {
                    b.HasOne("padrao.API.Models.Empresas", "Empresa")
                        .WithMany()
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("padrao.API.Models.Enderecos", "Endereco")
                        .WithMany()
                        .HasForeignKey("EnderecoId");
                });

            modelBuilder.Entity("padrao.API.Models.Empresas", b =>
                {
                    b.HasOne("padrao.API.Models.Enderecos", "Endereco")
                        .WithMany()
                        .HasForeignKey("EnderecoId");
                });

            modelBuilder.Entity("padrao.API.Models.FuncoesEmpresaUsuario", b =>
                {
                    b.HasOne("padrao.API.Models.Empresas", "Empresa")
                        .WithMany()
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("padrao.API.Models.Usuarios", "Usuario")
                        .WithOne("Funcao")
                        .HasForeignKey("padrao.API.Models.FuncoesEmpresaUsuario", "UsuarioId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("padrao.API.Models.Motoristas", b =>
                {
                    b.HasOne("padrao.API.Models.Empresas", "Empresa")
                        .WithMany()
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("padrao.API.Models.Onibus", b =>
                {
                    b.HasOne("padrao.API.Models.Empresas", "Empresa")
                        .WithMany()
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("padrao.API.Models.Usuarios", b =>
                {
                    b.HasOne("padrao.API.Models.Empresas", "Empresa")
                        .WithMany("Usuarios")
                        .HasForeignKey("EmpresaId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
