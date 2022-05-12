using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace padrao.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class OnlineController : ControllerBase
    {
        private readonly IHostingEnvironment _environment;
        private readonly IConfiguration _configuration;

        public OnlineController(IHostingEnvironment environment, IConfiguration configuration)
        {
            _environment = environment;
            _configuration = configuration;
        }

        [HttpGet]
        public IActionResult Get() => Ok(new
        {
            Status = $"I'm online !! In Environment: {_environment.EnvironmentName}"
        });

    }
}
