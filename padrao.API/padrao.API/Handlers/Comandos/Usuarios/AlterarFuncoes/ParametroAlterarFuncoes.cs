using MediatR;
using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AlterarFuncoes
{
    public class ParametroAlterarFuncoes : IRequest<ResultadoControllerDTO>
    {
        public ParametroAlterarFuncoes(string codigo, AlterarFuncaoDTO alterarFuncaoDTO)
        {
            Codigo = codigo;
            Funcoes = alterarFuncaoDTO;
        }
        public string Codigo { get; set; }
        public AlterarFuncaoDTO Funcoes { get; set; }
    }
}
