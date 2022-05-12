using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Motoristas.AtualizarMotorista;
using padrao.API.Handlers.Comandos.Motoristas.CadastrarMotorista;
using padrao.API.Handlers.Consultas.Motoristas.ListarMotoristasPorEmpresa;
using padrao.API.Handlers.Consultas.Motoristas.SelecionarMotoristaPorCodigo;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class MotoristasController : ControllerBase
    {
        private readonly IMediator _mediator;

        public MotoristasController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        public async Task<ActionResult> Get()
        {
            var dados = await _mediator.Send(new ParametroListarMotoristasPorEmpresa(this.RetornarIdEmpresaDoToken()));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult> Get(string codigo)
        {
            var dados = await _mediator.Send(new ParametroSelecionarMotoristaPorCodigo(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPost("")]
        public async Task<ActionResult> Post(MotoristaDTO motorista)
        {
            var dados = await _mediator.Send(new ParametroCadastrarMotorista(this.RetornarIdEmpresaDoToken(), motorista));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPut("")]
        public async Task<ActionResult> Put(MotoristaDTO motorista)
        {
            var dados = await _mediator.Send(new ParametroAtualizarMotorista(this.RetornarIdEmpresaDoToken(), motorista));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }
    }
}
