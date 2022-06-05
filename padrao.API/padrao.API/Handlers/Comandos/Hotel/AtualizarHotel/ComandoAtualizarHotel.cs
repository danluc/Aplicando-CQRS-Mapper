using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Hotel.AtualizarHotel
{
    public class ComandoAtualizarHotel : IRequestHandler<ParametroAtualizarHotel, RespostaAtualizarHotel>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarHotel(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<RespostaAtualizarHotel> Handle(ParametroAtualizarHotel request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Hotel.AsNoTracking()
                                                      .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Hotel.Codigo);
                if (dados == null)
                {
                    return new RespostaAtualizarHotel
                    {
                        Mensagem = "Hotel não encontrado!",
                        Sucesso = false
                    };
                }

                if (dados.Endereco != null)
                {
                    dados.Endereco = await CadastrarEndereco(request.Hotel.Endereco);
                    dados.EnderecoId = dados.Endereco.Id;
                }

                dados.Nome = String.IsNullOrEmpty(request.Hotel.Nome) ? dados.Nome : request.Hotel.Nome;
                dados.Contato = String.IsNullOrEmpty(request.Hotel.Contato) ? dados.Contato : request.Hotel.Contato;
                dados.Telefone = String.IsNullOrEmpty(request.Hotel.Telefone) ? dados.Telefone : request.Hotel.Telefone;
                dados.Observacao = String.IsNullOrEmpty(request.Hotel.Observacao) ? dados.Observacao : request.Hotel.Observacao;
                dados.DataAlteracao = DateTime.Now;

                _bancoDBContext.Update(dados);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new RespostaAtualizarHotel
                {
                    Hotel = _mapper.Map<HotelDTO>(dados),
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new RespostaAtualizarHotel
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
