using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models
{
    public class BaseEntity
    {
        public BaseEntity()
        {
            SetDataCadastro();
        }
        public int Id { get; set; }
        public DateTime? DataAlteracao { get; set; }
        public DateTime DataCadastro { get; set; }

        protected void SetDataCadastro()
        {
            DataCadastro = DateTime.Now;
        }
    }
}
