using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Helpers
{
    public class ArquivoHelper
    {
        public static string CriarCaminhoGravarArquivo(string caminhoDiretorioGravacao, string nomeArquivo)
        {
            if (!Directory.Exists(caminhoDiretorioGravacao))
                Directory.CreateDirectory(caminhoDiretorioGravacao);

            return Path.Combine(caminhoDiretorioGravacao, nomeArquivo);
        }

        public static string CriarCaminhoLeituraArquivo(string caminhoDiretorioLeitura, string nomeArquivo)
        {
            return Path.Combine(caminhoDiretorioLeitura, nomeArquivo);
        }

        public static async Task<string> SalvarArquivo(string path, IFormFile arquivo)
        {
            var nomeArquivo = GerarNomeArquivo(arquivo);
            var caminho = CriarCaminhoGravarArquivo(path, nomeArquivo);

            using (var memoryStream = new MemoryStream())
            {
                await arquivo.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();

                await File.WriteAllBytesAsync(caminho, fileBytes);
            }

            return nomeArquivo;
        }

        public static string GerarNomeArquivo(IFormFile arquivo)
        {
            return DateTime.Now.DayOfYear.ToString() +
                Guid.NewGuid() +
                Path.GetExtension(arquivo.FileName);
        }

        public static string ExtrairNomeArquivoCaminhoLeitura(string caminhoAnexo)
        {
            return caminhoAnexo.Split("/").ToList().LastOrDefault();
        }

        public static void ExcluirArquivo(string caminhoAnexo)
        {
            if (File.Exists(caminhoAnexo))
            {
                File.Delete(caminhoAnexo);
            }
        }
    }
}
