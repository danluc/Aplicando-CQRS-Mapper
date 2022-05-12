using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace padrao.API.Helpers
{
    public class ArquivosHtml
    {
        public static string EmailContaCriadaAgenciaConta => RecuperarConteudoHtml("EmailContaCriadaAgenciaConta.html", "Emails");
      
        private static string RecuperarConteudoHtml(string arquivo, string pasta)
        {
            var assembly = Assembly.GetExecutingAssembly();

            var diretorio = assembly.Location.Replace(assembly.ManifestModule.Name, "");
            var pathArquivo = Path.Combine(diretorio, "Services", "Recursos", pasta, arquivo);

            var fi = new FileInfo(pathArquivo);
            using (TextReader reader = new StreamReader(fi.OpenRead()))
                return reader.ReadToEnd();
        }

        private static string RecuperarCaminhoArquivo(string arquivo, string pasta)
        {
            var assembly = Assembly.GetExecutingAssembly();

            var diretorio = assembly.Location.Replace(assembly.ManifestModule.Name, "");
            return Path.Combine(diretorio, "Services", "Recursos", pasta, arquivo);
        }
    }
}
