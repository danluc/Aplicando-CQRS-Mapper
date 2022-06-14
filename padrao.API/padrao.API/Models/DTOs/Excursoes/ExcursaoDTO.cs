using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Excursoes
{
    public class ExcursaoDTO
    {
        public string Codigo { get; set; }
        public string Nome { get; set; }
        public DateTime DataIncio { get; set; }
        public DateTime DataFim { get; set; }
        public DateTime DataSaida { get; set; }
        public DateTime DataRetorno { get; set; }
        public int ValorAdulto { get; set; }
        public int ValorInfantil { get; set; }
        public int ConsiderarCrianca { get; set; }
        public string Itinerario { get; set; }
        public string Observacoes { get; set; }
        public string Contrato { get; set; }
        public bool Situacao { get; set; }
        public bool Orcamento { get; set; }
        public int? EnderecoDestinoId { get; set; }
        public int? EnderecoSaidaId { get; set; }
        public int EmpresaId { get; set; }
        public int UsuarioId { get; set; }
        public Empresas Empresa { get; set; }
        public Enderecos EnderecoDestino { get; set; }
        public Enderecos EnderecoSaida { get; set; }
        public ICollection<OnibusMotoristaExcursao> OnibusMotoristas { get; set; }
    }
}
