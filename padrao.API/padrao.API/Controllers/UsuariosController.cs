using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Usuarios.AlterarFuncoes;
using padrao.API.Handlers.Comandos.Usuarios.AlterarSenha;
using padrao.API.Handlers.Comandos.Usuarios.AlterarStatus;
using padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class UsuariosController : ControllerBase
    {
        private readonly IMediator _mediator;
        public UsuariosController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("AdicionarUsuario")]
        public async Task<ActionResult> AdicionarUsuario(RegistrarDTO registrarDTO)
        {
            registrarDTO.EmpresaId = this.RetornarIdEmpresaDoToken();

            var dados = await _mediator.Send(new ParametroSalvarUsuario(registrarDTO, registrarDTO.Funcoes, 
                                                                        this.RetornarNomeEmpresaDoToken(), this.RetornarNomeUsuarioDoToken(), false));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPut("AlterarSenha")]
        public async Task<ActionResult> AlterarSenha(AlterarSenhaDTO dados)
        {
            var result = await _mediator.Send(new ParametroAlterarSenha(dados, this.RetornarIdUsuarioDoToken()));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPut("AlterarStatus/{codigo}")]
        public async Task<ActionResult> AlterarStatus(string codigo)
        {
            var result = await _mediator.Send(new ParametroAlterarStatus(codigo));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPut("AlterarFuncao/{codigo}")]
        public async Task<ActionResult> AlterarFuncao(string codigo, AlterarFuncaoDTO alterarFuncaoDTO)
        {
            var result = await _mediator.Send(new ParametroAlterarFuncoes(codigo, alterarFuncaoDTO));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }
    }
}
