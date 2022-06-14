using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class OnibusMotoristaExcursao : BaseEntity
    {
        [ForeignKey("Onibus")]
        public int OnibusId { get; set; }
        [ForeignKey("Motoristas")]
        public int MotoristasId { get; set; }
        [ForeignKey("Excursoes")]
        public int ExcursoesId { get; set; }

        [IgnoreDataMember]
        public virtual Onibus Onibus { get; set; }
        [IgnoreDataMember]
        public virtual Motoristas Motorista { get; set; }
    }
}
