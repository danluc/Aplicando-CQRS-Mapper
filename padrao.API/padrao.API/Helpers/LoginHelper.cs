using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using padrao.API.Models.DTOs.Usuarios;
using padrao.API.Models.Global;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace padrao.API.Helpers
{
    public static class LoginHelper
    {
        public static string GerarToken(UsuarioDTO usuario, IConfiguration config)
        {
            var chave = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config.GetValue<string>("JWT:Token")));

            var claims = new List<Claim> {
                    new Claim (ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                    new Claim (ClaimTypes.Name, usuario.Nome),
                    new Claim (ClaimTypes.Email, usuario.Email),
                    new Claim (Constantes.EMPRESAID, usuario.EmpresaId.ToString()),
                    new Claim (Constantes.EMPRESANOME, usuario.Empresa.Nome),
                    new Claim (Constantes.FUNCOES, usuario.Funcao.Funcoes),
                };

            var creds = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
