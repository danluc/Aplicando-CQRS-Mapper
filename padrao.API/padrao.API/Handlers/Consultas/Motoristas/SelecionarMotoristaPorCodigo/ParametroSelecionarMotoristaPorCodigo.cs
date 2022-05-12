using MediatR;
using padrao.API.Handlers.Comandos.Motoristas.CadastrarMotorista;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.SelecionarMotoristaPorCodigo
{
    public class ParametroSelecionarMotoristaPorCodigo : IRequest<ResultadoCadastrarMotorista>
    {
        public ParametroSelecionarMotoristaPorCodigo(int empresaId, string clienteCodigo)
        {
            EmpresaId = empresaId;
            Codigo = clienteCodigo;
        }
        public int EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
