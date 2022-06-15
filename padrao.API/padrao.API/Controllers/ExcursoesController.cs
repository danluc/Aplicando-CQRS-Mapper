using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Excursoes.AtualizarExcursao;
using padrao.API.Handlers.Comandos.Excursoes.CadastrarExcursao;
using padrao.API.Handlers.Consultas.Excursoes.ListarExcursoesPorEmpresa;
using padrao.API.Handlers.Consultas.Excursoes.SelecionarExcursaoPorCodigo;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class ExcursoesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ExcursoesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult> Get(string codigo)
        {
            var dados = await _mediator.Send(new ParametroSelecionarExcursaoPorCodigo(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpGet("{skip}/{take}/{nome?}")]
        public async Task<ActionResult> Get(int skip, int take, string nome)
        {
            var dados = await _mediator.Send(new ParametroListarExcursoesPorEmpresa(this.RetornarIdEmpresaDoToken(), skip, take, nome));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPost("")]
        public async Task<ActionResult> Post(ExcursaoDTO dados)
        {
            var result = await _mediator.Send(new ParametroCadastrarExcursao(this.RetornarIdEmpresaDoToken(), this.RetornarIdUsuarioDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPut("")]
        public async Task<ActionResult> Put(ExcursaoDTO excursaoDTO)
        {
            var dados = await _mediator.Send(new ParametroAtualizarExcursao(this.RetornarIdEmpresaDoToken(), this.RetornarIdUsuarioDoToken(), excursaoDTO));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }
    }
}
