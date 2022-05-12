using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace padrao.API.Services.Email
{
    public class EmailService : IEmail
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        private void EnviarEmail(string corpoEmail, string assunto, IEnumerable<string> destinatarios,
                                                                            bool temAnexo = false, List<string> imgBase64Anexos = null)
        {
            var email = InstanciaNovoEmail(destinatarios, assunto, corpoEmail);
            EnviarEmail(email, temAnexo, imgBase64Anexos);
        }

        private void EnviarEmail(EmailModel emailModel, bool temAnexo, List<string> imgBase64Anexos = null)
        {
            ServicePointManager.ServerCertificateValidationCallback = MyCertHandler;
            MailMessage message = new MailMessage();
            SmtpClient smtp = new SmtpClient(emailModel.Smtp);
            //para quem vai ser enviado o email
            message.To.Add(emailModel.Remetente);
            message.Subject = emailModel.Assunto;
            message.From = new MailAddress(emailModel.Usuario);
            foreach (var item in emailModel.Destinatarios)
            {
                message.To.Add(item);
            }

            if (temAnexo && imgBase64Anexos.Any())
            {
                AdicionarAnexosImagens(message, imgBase64Anexos);
            }

            message.Body = emailModel.Corpo;
            message.IsBodyHtml = true;
            message.BodyEncoding = Encoding.UTF8;

            //configurações da conta de envio                
            smtp.Host = emailModel.Smtp;
            smtp.EnableSsl = emailModel.ConexaoSegura;
            smtp.Port = int.Parse(emailModel.PortaSmtp);
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(emailModel.Usuario, emailModel.SenhaMail);

            //envio do email
            smtp.SendMailAsync(message);
        }

        private bool MyCertHandler(object sender, X509Certificate certificado, X509Chain cadeia, SslPolicyErrors erro)
        {
            return true;
        }

        private EmailModel InstanciaNovoEmail(IEnumerable<string> destinatarios, string assunto, string corpoEmail)
        {
            var email = new EmailModel
            {
                Smtp = _configuration.GetValue<string>("ConfiguracoesEmail:Smtp"),
                ConexaoSegura = _configuration.GetValue<bool>("ConfiguracoesEmail:ConexaoSegura"),
                Autenticacao = true,
                Usuario = _configuration.GetValue<string>("ConfiguracoesEmail:Usuario"),
                SenhaMail = _configuration.GetValue<string>("ConfiguracoesEmail:Senha"),
                PortaSmtp = _configuration.GetValue<string>("ConfiguracoesEmail:PortaSmtp"),
                Remetente = _configuration.GetValue<string>("ConfiguracoesEmail:Email"),
                Destinatarios = destinatarios,
                Assunto = assunto,
                Corpo = corpoEmail
            };

            return email;
        }

        private void AdicionarAnexosImagens(MailMessage mailMessage, List<string> anexos = null)
        {
            if (anexos.Any())
            {
                foreach (var anexo in anexos)
                {
                    var novoAx = anexo.Replace("data:image/png;base64,", "");
                    var bytesAnexo = Convert.FromBase64String(novoAx);
                    var memStream = new MemoryStream(bytesAnexo);
                    var contentType = new ContentType(MediaTypeNames.Image.Jpeg);
                    var anexoPronto = new Attachment(memStream, contentType);
                    anexoPronto.ContentDisposition.FileName = "img.jpg";
                    mailMessage.Attachments.Add(anexoPronto);
                }
            }
        }

        public void EmailCadastroUsuarioConsultario(UsuarioDTO dados, string usuarioLogado, string nomeEmpresa)
        {
            string corpoEmail = ArquivosHtml.EmailContaCriadaAgenciaConta;
            string logo = "https://i.pinimg.com/originals/63/d3/e6/63d3e64048934b4fd9be2e4c1fc88e4e.png";
            string assunto = $"NOME DO SISTEMA";
            corpoEmail = corpoEmail.Replace("[LOGO]", logo);
            corpoEmail = corpoEmail.Replace("[USUARIOADM]", usuarioLogado);
            corpoEmail = corpoEmail.Replace("[NOMEAGENCIA]", nomeEmpresa);
            corpoEmail = corpoEmail.Replace("[EMAILLOGIN]", dados.Email);
            corpoEmail = corpoEmail.Replace("[DATA]", DateTime.Now.Date.ToString("D"));
            var emails = new List<string>();
            emails.Add(dados.Email);
            EnviarEmail(corpoEmail: corpoEmail, assunto: assunto, destinatarios: emails);
        }
    }
}
