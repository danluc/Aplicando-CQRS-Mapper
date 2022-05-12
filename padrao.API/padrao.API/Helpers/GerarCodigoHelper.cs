using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace padrao.API.Helpers
{
    public static class GerarCodigoHelper
    {
        public static string GerarCodigo(int numero = 6)
        {
            var str = Guid.NewGuid().ToString();
            str = Regex.Replace(str, "-", "", RegexOptions.IgnoreCase);
            return $"{str.PegarUltimos(15)}{DateTime.Now.Ticks.ToString().PegarUltimos(numero)}";
        }

        private static string PegarUltimos(this string source, int valor)
        {
            if (valor >= source.Length)
                return source;
            return source.Substring(source.Length - valor);
        }
    }
}
