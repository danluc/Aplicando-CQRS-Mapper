using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Excursoes.CadastrarExcursao;
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

        [HttpPost("")]
        public async Task<ActionResult> Post(ExcursaoDTO dados)
        {
            var result = await _mediator.Send(new ParametroCadastrarExcursao(this.RetornarIdEmpresaDoToken(), this.RetornarIdUsuarioDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }
    }
}
