using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Onibus.AtualizarOnibus;
using padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus;
using padrao.API.Handlers.Consultas.Onibus.ListarOnibusPorEmpresa;
using padrao.API.Handlers.Consultas.Onibus.SelecionarOnibusPorEmpresa;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class OnibusController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OnibusController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        public async Task<ActionResult> Get()
        {
            var dados = await _mediator.Send(new ParametroListarOnibusPorEmpresa(this.RetornarIdEmpresaDoToken()));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult> Get(string codigo)
        {
            var dados = await _mediator.Send(new ParametroSelecionarOnibusPorEmpresa(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPost("")]
        public async Task<ActionResult> Post(OnibusDTO dados)
        {
            var result = await _mediator.Send(new ParametroCadastrarOnibus(this.RetornarIdEmpresaDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPut("")]
        public async Task<ActionResult> Put(OnibusDTO dados)
        {
            var result = await _mediator.Send(new ParametroAtualizarOnibus(this.RetornarIdEmpresaDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }
    }
}
