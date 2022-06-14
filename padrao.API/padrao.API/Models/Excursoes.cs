using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class Excursoes : BaseEntity
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
        public int EnderecoDestinoId { get; set; }
        public int EnderecoSaidaId { get; set; }
        [ForeignKey("Usuarios")]
        public int UsuarioId { get; set; }
        [ForeignKey("Empresas")]
        public int EmpresaId { get; set; }
        public Empresas Empresa { get; set; }

        [IgnoreDataMember]
        public virtual Enderecos EnderecoDestino { get; set; }
        [IgnoreDataMember]
        public virtual Enderecos EnderecoSaida { get; set; }
        [IgnoreDataMember]
        public virtual ICollection<OnibusMotoristaExcursao> OnibusMotoristas { get; set; }
    }
}
