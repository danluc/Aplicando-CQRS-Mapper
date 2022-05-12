using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Empresas.AtualizarEmpresa;
using padrao.API.Handlers.Comandos.Empresas.CadastrarImgEmpresa;
using padrao.API.Handlers.Consultas.Empresas.SelecionarPorCodigoOuId;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Emnpresas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class EmpresasController : ControllerBase
    {
        private readonly IMediator _mediator;
        public EmpresasController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPut("Atualizar")]
        public async Task<ActionResult> Atualizar(EmpresaDTO dados)
        {
            var result = await _mediator.Send(new ParametroAtualizarEmpresa(dados, this.RetornarIdEmpresaDoToken()));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpGet("Selecionar")]
        public async Task<ActionResult> Selecionar()
        {
            var result = await _mediator.Send(new ParametroSelecionarPorCodigoOuId(this.RetornarIdEmpresaDoToken(), string.Empty));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPost("InserirImagem")]
        public async Task<ActionResult> InserirImagem([FromForm] IFormFile arquivo)
        {
            var result = await _mediator.Send(new ParametroCadastrarImgEmpresa(this.RetornarIdEmpresaDoToken(), arquivo));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }
    }
}
