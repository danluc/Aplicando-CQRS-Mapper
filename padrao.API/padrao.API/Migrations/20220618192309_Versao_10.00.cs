using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace padrao.API.Migrations
{
    public partial class Versao_1000 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ContratoViagem",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DataAlteracao = table.Column<DateTime>(nullable: true),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    EmpresaId = table.Column<int>(nullable: false),
                    Situacao = table.Column<bool>(nullable: false, defaultValue: true),
                    Contrato = table.Column<string>(nullable: true),
                    Codigo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContratoViagem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContratoViagem_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContratoViagem_EmpresaId",
                table: "ContratoViagem",
                column: "EmpresaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContratoViagem");
        }
    }
}
