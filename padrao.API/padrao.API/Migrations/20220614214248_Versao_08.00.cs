using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace padrao.API.Migrations
{
    public partial class Versao_0800 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Excursoes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DataAlteracao = table.Column<DateTime>(nullable: true),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    Codigo = table.Column<string>(nullable: true),
                    Nome = table.Column<string>(nullable: true),
                    DataIncio = table.Column<DateTime>(nullable: false),
                    DataFim = table.Column<DateTime>(nullable: false),
                    DataSaida = table.Column<DateTime>(nullable: false),
                    DataRetorno = table.Column<DateTime>(nullable: false),
                    ValorAdulto = table.Column<int>(nullable: false),
                    ValorInfantil = table.Column<int>(nullable: false),
                    ConsiderarCrianca = table.Column<int>(nullable: false),
                    Itinerario = table.Column<string>(nullable: true),
                    Observacoes = table.Column<string>(nullable: true),
                    Contrato = table.Column<string>(nullable: true),
                    Situacao = table.Column<bool>(nullable: false),
                    Orcamento = table.Column<bool>(nullable: false),
                    EnderecoDestinoId = table.Column<int>(nullable: false),
                    EnderecoSaidaId = table.Column<int>(nullable: false),
                    UsuarioId = table.Column<int>(nullable: false),
                    EmpresaId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Excursoes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Excursoes_Empresas_EmpresaId",
                        column: x => x.EmpresaId,
                        principalTable: "Empresas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Excursoes_Enderecos_EnderecoDestinoId",
                        column: x => x.EnderecoDestinoId,
                        principalTable: "Enderecos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Excursoes_Enderecos_EnderecoSaidaId",
                        column: x => x.EnderecoSaidaId,
                        principalTable: "Enderecos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OnibusMotoristaExcursao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DataAlteracao = table.Column<DateTime>(nullable: true),
                    DataCadastro = table.Column<DateTime>(nullable: false),
                    OnibusId = table.Column<int>(nullable: false),
                    MotoristasId = table.Column<int>(nullable: false),
                    ExcursoesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OnibusMotoristaExcursao", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OnibusMotoristaExcursao_Excursoes_ExcursoesId",
                        column: x => x.ExcursoesId,
                        principalTable: "Excursoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Excursoes_EmpresaId",
                table: "Excursoes",
                column: "EmpresaId");

            migrationBuilder.CreateIndex(
                name: "IX_Excursoes_EnderecoDestinoId",
                table: "Excursoes",
                column: "EnderecoDestinoId");

            migrationBuilder.CreateIndex(
                name: "IX_Excursoes_EnderecoSaidaId",
                table: "Excursoes",
                column: "EnderecoSaidaId");

            migrationBuilder.CreateIndex(
                name: "IX_OnibusMotoristaExcursao_ExcursoesId",
                table: "OnibusMotoristaExcursao",
                column: "ExcursoesId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OnibusMotoristaExcursao");

            migrationBuilder.DropTable(
                name: "Excursoes");
        }
    }
}
