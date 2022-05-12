using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.AtualizarEmpresa
{
    public class ComandoAtualizarEmpresa : IRequestHandler<ParametroAtualizarEmpresa, ResultadoAtualizarEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoAtualizarEmpresa(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoAtualizarEmpresa> Handle(ParametroAtualizarEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var nova = request.Dados;
                var empresa = await _bancoDBContext.Empresas.AsNoTracking().FirstOrDefaultAsync(e => e.Id == request.EmpresaId, cancellationToken);
                if(empresa == null)
                {
                    return new ResultadoAtualizarEmpresa
                    {
                        Mensagem = "Empresa não encontrada.",
                        Sucesso = false
                    };
                }

                if(nova.Endereco != null)
                {
                    empresa.Endereco = await CadastrarEndereco(nova.Endereco);
                    empresa.EnderecoId = empresa.Endereco.Id;
                }

                empresa.Nome = nova.Nome;
                empresa.Telefone = nova.Telefone;
                empresa.Email = nova.Email;
                empresa.CPFCNPJ = nova.CPFCNPJ;
                empresa.DataAlteracao = DateTime.Now;
                _bancoDBContext.Update(empresa);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoAtualizarEmpresa
                {
                    Sucesso = true,
                    Empresa = empresa
                };
            }
            catch (Exception ex)
            {
                return new ResultadoAtualizarEmpresa
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }

        private async Task<Models.Enderecos> CadastrarEndereco(Models.Enderecos enderecos)
        {
            var end = await _bancoDBContext.Enderecos.FirstOrDefaultAsync(e => e.CEP == enderecos.CEP && e.Numero == enderecos.Numero);
            if(end != null)
                return end;
            
            var result = await _bancoDBContext.AddAsync(enderecos);
            await _bancoDBContext.SaveChangesAsync();

            return result.Entity;
        }
    }
}
