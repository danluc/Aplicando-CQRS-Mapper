using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Clientes.AlterarSituacao;
using padrao.API.Handlers.Comandos.Clientes.AtualizarCliente;
using padrao.API.Handlers.Comandos.Clientes.CadastrarCliente;
using padrao.API.Handlers.Consultas.Clientes.ListarClientesPorEmpresa;
using padrao.API.Handlers.Consultas.Clientes.SelecionarClientePorCodigo;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class ClientesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ClientesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{skip}/{take}")]
        public async Task<ActionResult> Get(int skip, int take)
        {
            var dados = await _mediator.Send(new ParametroListarClientesPorEmpresa(this.RetornarIdEmpresaDoToken(), skip, take));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult> Get(string codigo)
        {
            var dados = await _mediator.Send(new ParametroSelecionarClientePorCodigo(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPost("")]
        public async Task<ActionResult> Post(ClienteDTO clienteDto)
        {
            var dados = await _mediator.Send(new ParametroCadastrarCliente(this.RetornarIdEmpresaDoToken(), clienteDto));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados); 
        }

        [HttpPut("")]
        public async Task<ActionResult> Put(ClienteDTO clienteDto)
        {
            var dados = await _mediator.Send(new ParametroAtualizarCliente(this.RetornarIdEmpresaDoToken(), clienteDto));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPut("AlterarSituacao/{codigo}")]
        public async Task<ActionResult> AlterarSituacao(string codigo)
        {
            var dados = await _mediator.Send(new ParametroAlterarSituacao(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }
    }
}
