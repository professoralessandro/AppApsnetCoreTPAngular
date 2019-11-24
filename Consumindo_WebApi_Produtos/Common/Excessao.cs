using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Consumindo_WebApi_Produtos.Common
{
    class Excessao : Exception
    {
        public Excessao(string mensagem)
            : base(mensagem)
        {
        }
    }
}
