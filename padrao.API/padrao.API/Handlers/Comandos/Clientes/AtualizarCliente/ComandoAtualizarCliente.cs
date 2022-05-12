using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Clientes.CadastrarCliente;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Clientes.AtualizarCliente
{
    public class ComandoAtualizarCliente : IRequestHandler<ParametroAtualizarCliente, ResultadoCadastrarCliente>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarCliente(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }
        public async Task<ResultadoCadastrarCliente> Handle(ParametroAtualizarCliente request, CancellationToken cancellationToken)
        {
            try
            {
                var hasCliente = await _bancoDBContext.Clientes.AsNoTracking()
                                                        .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Cliente.Codigo);
                if (hasCliente == null)
                {
                    return new ResultadoCadastrarCliente
                    {
                        Mensagem = "Cliente não encotrado!",
                        Sucesso = false
                    };
                }

                if (request.Cliente.Endereco != null && hasCliente.Endereco == null)
                {
                    var endereco = await CadastrarEndereco(request.Cliente.Endereco);
                    request.Cliente.EnderecoId = endereco.Id;
                    request.Cliente.Endereco = endereco;
                }
                else if (hasCliente.Endereco != null && request.Cliente.Endereco != null)
                {
                    request.Cliente.Endereco.Id = hasCliente.EnderecoId.Value;
                    request.Cliente.Endereco = await AtualizarEndereco(request.Cliente.Endereco);
                }

                hasCliente.Nome = String.IsNullOrEmpty(request.Cliente.Nome) ? hasCliente.Nome : request.Cliente.Nome;
                hasCliente.Observacao = String.IsNullOrEmpty(request.Cliente.Observacao) ? hasCliente.Observacao : request.Cliente.Observacao;
                hasCliente.OrgEmissor = String.IsNullOrEmpty(request.Cliente.OrgEmissor) ? hasCliente.OrgEmissor : request.Cliente.OrgEmissor;
                hasCliente.RG = String.IsNullOrEmpty(request.Cliente.RG) ? hasCliente.RG : request.Cliente.RG;
                hasCliente.Telefone = String.IsNullOrEmpty(request.Cliente.Telefone) ? hasCliente.Telefone : request.Cliente.Telefone;
                hasCliente.CPF = String.IsNullOrEmpty(request.Cliente.CPF) ? hasCliente.CPF : request.Cliente.CPF;
                hasCliente.Email = String.IsNullOrEmpty(request.Cliente.Email) ? hasCliente.Email : request.Cliente.Email;
                hasCliente.DataAlteracao = DateTime.Now;

                _bancoDBContext.Update(hasCliente);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarCliente
                {
                    Cliente = _mapper.Map<ClienteDTO>(hasCliente),
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

        private async Task<Models.Enderecos> AtualizarEndereco(Models.Enderecos enderecos)
        {
            var result = _bancoDBContext.Update(enderecos);
            await _bancoDBContext.SaveChangesAsync();
            return result.Entity;
        }
    }
}
