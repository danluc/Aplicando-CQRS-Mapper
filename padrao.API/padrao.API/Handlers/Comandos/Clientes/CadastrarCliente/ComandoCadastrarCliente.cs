using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Clientes.CadastrarCliente
{
    public class ComandoCadastrarCliente : IRequestHandler<ParametroCadastrarCliente, ResultadoCadastrarCliente>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoCadastrarCliente(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }
        public async Task<ResultadoCadastrarCliente> Handle(ParametroCadastrarCliente request, CancellationToken cancellationToken)
        {
            try
            {
                var hasCliente = await _bancoDBContext.Clientes.AsNoTracking()
                                                        .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.CPF == request.Cliente.CPF);

                if (hasCliente != null)
                {
                    var clienteDto = _mapper.Map<ClienteDTO>(hasCliente);
                    return new ResultadoCadastrarCliente
                    {
                        Mensagem = "Cliente já cadastrado!",
                        Sucesso = false,
                        Cliente = clienteDto
                    };
                }

                if (request.Cliente.Endereco != null)
                {
                    var endereco = await CadastrarEndereco(request.Cliente.Endereco);
                    request.Cliente.EnderecoId = endereco.Id;
                    request.Cliente.Endereco = endereco;
                }

                request.Cliente.EmpresaId = request.EmpresaId;
                request.Cliente.Codigo = GerarCodigoHelper.GerarCodigo();
                var cliente = _mapper.Map<Models.Clientes>(request.Cliente);

                await _bancoDBContext.AddAsync(cliente);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarCliente
                {
                    Cliente = _mapper.Map<ClienteDTO>(cliente),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarCliente
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }

        private async Task<Models.Enderecos> CadastrarEndereco(Models.Enderecos enderecos)
        {
            var end = await _bancoDBContext.Enderecos.FirstOrDefaultAsync(e => e.CEP == enderecos.CEP && e.Numero == enderecos.Numero);
            if (end != null)
                return end;

            var result = await _bancoDBContext.AddAsync(enderecos);
            await _bancoDBContext.SaveChangesAsync();

            return result.Entity;
        }
    }
}
