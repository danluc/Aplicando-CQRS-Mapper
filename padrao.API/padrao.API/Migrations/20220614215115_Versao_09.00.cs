using Microsoft.EntityFrameworkCore.Migrations;

namespace padrao.API.Migrations
{
    public partial class Versao_0900 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_OnibusMotoristaExcursao_MotoristasId",
                table: "OnibusMotoristaExcursao",
                column: "MotoristasId");

            migrationBuilder.CreateIndex(
                name: "IX_OnibusMotoristaExcursao_OnibusId",
                table: "OnibusMotoristaExcursao",
                column: "OnibusId");

            migrationBuilder.AddForeignKey(
                name: "FK_OnibusMotoristaExcursao_Motoristas_MotoristasId",
                table: "OnibusMotoristaExcursao",
                column: "MotoristasId",
                principalTable: "Motoristas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OnibusMotoristaExcursao_Onibus_OnibusId",
                table: "OnibusMotoristaExcursao",
                column: "OnibusId",
                principalTable: "Onibus",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OnibusMotoristaExcursao_Motoristas_MotoristasId",
                table: "OnibusMotoristaExcursao");

            migrationBuilder.DropForeignKey(
                name: "FK_OnibusMotoristaExcursao_Onibus_OnibusId",
                table: "OnibusMotoristaExcursao");

            migrationBuilder.DropIndex(
                name: "IX_OnibusMotoristaExcursao_MotoristasId",
                table: "OnibusMotoristaExcursao");

            migrationBuilder.DropIndex(
                name: "IX_OnibusMotoristaExcursao_OnibusId",
                table: "OnibusMotoristaExcursao");
        }
    }
}
