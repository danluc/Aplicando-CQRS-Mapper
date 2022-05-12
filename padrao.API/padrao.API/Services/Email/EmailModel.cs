using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;

namespace padrao.API.Services.Email
{
    public class EmailModel
    {
        public EmailModel()
        { }

        public EmailModel(bool conexaoSegura, bool autenticacao, string pop, string portaSmtp, string remetente, string senhaMail, string smtp, string portaPop, string assunto, List<string> destinatario, string corpo, string usuario)
        { }

        public bool ConexaoSegura { get; set; }
        public bool Autenticacao { get; set; }
        public string Pop { get; set; }
        public string PortaSmtp { get; set; }
        public string Remetente { get; set; }
        public string SenhaMail { get; set; }
        public string Smtp { get; set; }
        public string PortaPop { get; set; }
        public string Assunto { get; set; }
        public IEnumerable<string> Destinatarios { get; set; }
        public string Corpo { get; set; }
        public string Usuario { get; set; }
        public MailPriority Prioridade { get; set; }
    }
}
