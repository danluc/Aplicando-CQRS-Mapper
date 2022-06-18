using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Contratos.AtualizarContrato;
using padrao.API.Handlers.Comandos.Contratos.CadastrarContrato;
using padrao.API.Handlers.Consultas.Contratos.SelecionarContratoPorEmpresa;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class ContratoController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ContratoController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult> Get(string codigo)
        {
            var dados = await _mediator.Send(new ParametroSelecionarContratoPorEmpresa(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPost("")]
        public async Task<ActionResult> Post(ContratoDTO dados)
        {
            var result = await _mediator.Send(new ParametroCadastrarContrato(this.RetornarIdEmpresaDoToken(), dados.Contrato));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPut("")]
        public async Task<ActionResult> Put(ContratoDTO dados)
        {
            var result = await _mediator.Send(new ParametrosAtualizarContrato(this.RetornarIdEmpresaDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }
    }
}
