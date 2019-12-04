using System;
using System.Text;
using System.Windows.Forms;
using System.Net.Http;
using Newtonsoft.Json;
using Consumindo_WebApi_Produtos.Models;
using Consumindo_WebApi_Produtos.Common;
using Consumindo_WebApi_Produtos.Views.Produto;
using System.Web.Providers.Entities;
using System.Runtime.Remoting.Contexts;

namespace Consumindo_WebApi_Produtos
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        string URI = "";
        int codigoLivro = 1;


        private void btnDeletarLivro_Click(object sender, EventArgs e)
        {
            GetLogin();
        }

        public async void GetLogin()
        {
            try
            {
                /*
                string firstName = "Jeff";
        string lastName = "Smith";
        string city = "Seattle";

        // Save to session state in a Web Forms page class.  
        Session["FirstName"] = firstName;  
Session["LastName"] = lastName;  
Session["City"] = city;  
  
// Read from session state in a Web Forms page class.  
firstName = (string) (Session["FirstName"]);  
lastName = (string) (Session["LastName"]);  
city = (string) (Session["City"]);  
  
// Outside of Web Forms page class, use HttpContext.Current.  
HttpContext context = HttpContext.Current;
        context.Session["FirstName"] = firstName;  
firstName = (string) (Context.Session["FirstName"]); 
                */
                Seguranca seguranca = new Seguranca();

                Usuarios usuario = new Usuarios();
                usuario.Nome = txtbNome.Text;
                usuario.Senha = seguranca.GerarHashMd5(txtbSenha.Text);

                var user = JsonConvert.SerializeObject(usuario);

                //codigoProduto = TextBoxid
                using (var client = new HttpClient())
                {
                    Boolean isAuth;
                    BindingSource bsDados = new BindingSource();
                    URI = "http://localhost:5000/api/login";
                    var content = new StringContent(user, Encoding.UTF8, "application/json");
                    var result = await client.PostAsync(URI, content);

                    var status = result.StatusCode.ToString();

                    if(status.Equals("OK"))
                    {
                        FormProduto formProduto = new FormProduto();
                        formProduto.Show();
                        this.Hide();
                    }
                    else
                    {
                        MessageBox.Show("Falha ao autenticar o usuário : ");
                        return;
                    }
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao autenticar o usuário: " + ex.Message);
            }
        }        
    }
}
