using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using padrao.API.Handlers.Comandos.Hotel.AtualizarHotel;
using padrao.API.Handlers.Comandos.Hotel.CadastrarHotel;
using padrao.API.Handlers.Consultas.Hotel.ListarHotelPorEmpresa;
using padrao.API.Handlers.Consultas.Hotel.SelecionarHotelPorCodigo;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Hotel;
using System.Threading.Tasks;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize()]
    public class HotelController : ControllerBase
    {
        private readonly IMediator _mediator;

        public HotelController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("")]
        public async Task<ActionResult> Get()
        {
            var dados = await _mediator.Send(new ParametroListarHotelPorEmpresa(this.RetornarIdEmpresaDoToken()));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpGet("{codigo}")]
        public async Task<ActionResult> Get(string codigo)
        {
            var dados = await _mediator.Send(new ParametroSelecionarHotelPorCodigo(this.RetornarIdEmpresaDoToken(), codigo));
            if (!dados.Sucesso)
                return BadRequest($"{dados.Mensagem}");

            return Ok(dados);
        }

        [HttpPost("")]
        public async Task<ActionResult> Post(HotelDTO dados)
        {
            var result = await _mediator.Send(new ParametroCadastrarHotel(this.RetornarIdEmpresaDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }

        [HttpPut("")]
        public async Task<ActionResult> Put(HotelDTO dados)
        {
            var result = await _mediator.Send(new ParametroAtualizarHotel(this.RetornarIdEmpresaDoToken(), dados));
            if (!result.Sucesso)
                return BadRequest($"{result.Mensagem}");

            return Ok(result);
        }
    }
}
