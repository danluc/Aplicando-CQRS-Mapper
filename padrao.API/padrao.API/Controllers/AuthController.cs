using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Empresas.CadastrarEmpresa;
using padrao.API.Handlers.Comandos.Empresas.ExcluirEmpresa;
using padrao.API.Handlers.Comandos.Login;
using padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;
        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("Registrar")]
        public async Task<ActionResult> Registrar(RegistrarDTO dados)
        {
            try
            {
                var empresa = await _mediator.Send(new ParametroCadastrarEmpresa(null, true));
                if (!empresa.Sucesso)
                    return BadRequest($"Erro cadastrar empresa - {empresa.Mensagem}");

                dados.EmpresaId = empresa.Empresa.Id;
                var usuario = await _mediator.Send(new ParametroSalvarUsuario(dados, string.Empty, string.Empty, string.Empty));

                if (!usuario.Sucesso)
                {
                    await _mediator.Send(new ParametroExcluirEmpresa(empresa.Empresa));
                    return BadRequest($"Erro cadastrar usuário - {usuario.Mensagem}");
                }

                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult> Login(LoginDTO dados)
        {
            try
            {
                var result = await _mediator.Send(new ParametroLogin(dados));
                if (!result.Sucesso)
                    return BadRequest($"{result.Mensagem}");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
