using Microsoft.EntityFrameworkCore.Migrations;

namespace padrao.API.Migrations
{
    public partial class Versao_0700 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Contato",
                table: "Hotel",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Telefone",
                table: "Hotel",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Contato",
                table: "Hotel");

            migrationBuilder.DropColumn(
                name: "Telefone",
                table: "Hotel");
        }
    }
}
