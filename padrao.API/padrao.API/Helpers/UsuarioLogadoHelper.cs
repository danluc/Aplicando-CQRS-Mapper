using Microsoft.AspNetCore.Mvc;
using padrao.API.Models.Global;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace padrao.API.Helpers
{
    public static class UsuarioLogadoHelper
    {
        public static int RetornarIdUsuarioDoToken(this ControllerBase controller)
        {
            var userId = controller.ControllerContext.HttpContext
                .User.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier);

            var usuarioId = Convert.ToInt32(userId.Value);

            return usuarioId;
        }

        public static string RetornarNomeUsuarioDoToken(this ControllerBase controller)
        {
            return controller.ControllerContext.HttpContext
                .User.Claims.FirstOrDefault(o => o.Type == ClaimTypes.Name).Value;
        }

        public static string RetornarNomeEmpresaDoToken(this ControllerBase controller)
        {
            return controller.ControllerContext.HttpContext
                .User.Claims.FirstOrDefault(o => o.Type == Constantes.EMPRESANOME).Value;
        }

        public static int RetornarIdEmpresaDoToken(this ControllerBase controller)
        {
            var userId = controller.ControllerContext.HttpContext
                .User.Claims.FirstOrDefault(o => o.Type == Constantes.EMPRESAID);

            var usuarioId = Convert.ToInt32(userId.Value);

            return usuarioId;
        }
    }
}
