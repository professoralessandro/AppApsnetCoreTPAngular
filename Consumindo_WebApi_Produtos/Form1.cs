using System;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Net.Http;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Consumindo_WebApi_Produtos.Models;
using Consumindo_WebApi_Produtos.Common;
using Consumindo_WebApi_Produtos.Cadastrar;
using System.Threading.Tasks;
using Consumindo_WebApi_Produtos.Views.Produto;
using Consumindo_WebApi_Produtos.Views.Produto.Cadastro;

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

        private void btnObterLivros_Click(object sender, EventArgs e)
        {
            GetAllLivros();
        }

        private void btnLivrosPorId_Click(object sender, EventArgs e)
        {
            InputBox();
            if (codigoLivro != -1)
            {
                GetLivroById(codigoLivro);
            }
        }

        private void btnIncluirLivro_Click(object sender, EventArgs e)
        {
            FormCadastrar formCadastrar = new FormCadastrar();
            formCadastrar.Show();
            //AddLivro();
        }

        static public Boolean isNew;

        private async void btnAtualizaLivro_Click(object sender, EventArgs e)
        {
            InputBox();

            isNew = true;

            if (codigoLivro != -1)
            {
                this.GetLivroById(codigoLivro);
                if (livro.Titulo != "" && livro.Titulo != null)
                {
                    FormCadastrar formCadastrar = new FormCadastrar(livro.Id, livro.Titulo, livro.Subtitulo, livro.Autor, livro.Resumo, livro.Capa, livro.Quantidade);
                    formCadastrar.Show();
                }
                else
                {
                    MessageBox.Show("Houve um erro ao buscar o Livro");
                }
            }
        }

        private void btnDeletarLivro_Click(object sender, EventArgs e)
        {
            GetLogin();
        }

        public async void GetLogin()
        {
            try
            {
                /*
                 var serializedLivro = JsonConvert.SerializeObject(livro);
                        var content = new StringContent(serializedLivro, Encoding.UTF8, "application/json");
                        var result = await client.PostAsync(URI, content);
                 */

                Usuarios usuario = new Usuarios();
                usuario.Nome = txtbNome.Text;
                usuario.Senha = txtbSenha.Text;

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

        private void InputBox()
        {
            /* usando a função VB.Net para exibir um prompt para o usuário informar a senha */
            string Prompt = "Informe o código do Livro.";
            string Titulo = "www.macoratti.net";
            string Resultado = Microsoft.VisualBasic.Interaction.InputBox(Prompt, Titulo, "9", 600, 350);
            /* verifica se o resultado é uma string vazia o que indica que foi cancelado. */
            if (Resultado != "")
            {
                codigoLivro = Convert.ToInt32(Resultado);
            }
            else
            {
                codigoLivro = -1;
            }
        }
        //=================================métodos para acessar a Web API ------------------------------------------------------
        public async void GetAllLivros()
        {
            try
            {
                //URI = txtNome.Text;
                using (var client = new HttpClient())
                {
                    using (var response = await client.GetAsync(URI))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            //clienteUri = response.Headers.Location;
                            var LivroJsonString = await response.Content.ReadAsStringAsync();
                            //dgvDados.DataSource = JsonConvert.DeserializeObject<Livro[]>(LivroJsonString).ToList();
                        }
                        else
                        {
                            MessageBox.Show("Não foi possível obter o livro : " + response.StatusCode);
                        }
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o livro.");
            }
        }

        static string mensagem;

        private async Task<Livro> RetornaLivroById(int? codLivro)
        {
            try
            {
                mensagem = "";
                //URI = txtNome.Text;
                URI += "getbyid?id=" + codLivro;
                Livro livro = new Livro();
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        var LivroJsonString = await response.Content.ReadAsStringAsync();
                        livro = JsonConvert.DeserializeObject<Livro>(LivroJsonString);
                        return livro;
                    }
                    else
                    {
                        MessageBox.Show("Falha ao obter o livro : " + response.StatusCode);
                        return livro;
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o livro.");
            }
        }

        static Livro livro = new Livro();

        public async void GetLivroById(int codLivro)
        {
            try
            {
                //codigoLivro = TextBoxid
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    //URI = txtNome.Text + "/getById?id=" + codLivro.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        var LivroJsonString = await response.Content.ReadAsStringAsync();
                        bsDados.DataSource = JsonConvert.DeserializeObject<Livro>(LivroJsonString);

                        if (isNew)
                        {
                            livro = JsonConvert.DeserializeObject<Livro>(LivroJsonString);
                        }
                        else
                        {
                            //dgvDados.DataSource = bsDados;
                        }
                    }
                    else
                    {
                        MessageBox.Show("Falha ao obter o livro : " + response.StatusCode);
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o livro.");
            }
        }
        /*
        public async Task<Livro> RetonaLivroById(int codLivro, bool isReturn)
        {
            try
            {
                Livro livro = new Livro();
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    URI = txtURI.Text + "/" + codLivro.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        var LivroJsonString = await response.Content.ReadAsStringAsync();
                        livro = JsonConvert.DeserializeObject<Livro>(LivroJsonString);
                        return livro;
                    }
                    else
                    {
                        MessageBox.Show("Falha ao obter o livro : " + response.StatusCode);
                        return livro;
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o livro.");
            }
        }
        */
        private async void AddLivro()
        {
            try
            {
                //URI = txtNome.Text;
                Livro livro = new Livro();
                //livro.Id = codLivro;
                livro.Titulo = "NoteBook Lenovo";
                livro.Resumo = "Notebooks";
                livro.Autor = "Lenovo";
                livro.Quantidade = 12;

                using (var client = new HttpClient())
                {
                    var serializedLivro = JsonConvert.SerializeObject(livro);
                    var content = new StringContent(serializedLivro, Encoding.UTF8, "application/json");
                    var result = await client.PostAsync(URI, content);
                }
                GetAllLivros();
            }
            catch
            {
                throw new Excessao("Falha ao adicionar o livro.");
            }
        }

        private async void UpdateLivro(int codLivro)
        {
            try
            {
                //URI = txtNome.Text;
                Livro livro = new Livro();
                livro.Id = codLivro;
                livro.Titulo = "NoteBook Apple";
                livro.Subtitulo = "Notebooks";
                livro.Autor = "Apple";
                livro.Quantidade = 15; // atualizando o preço do livro

                using (var client = new HttpClient())
                {
                    HttpResponseMessage responseMessage = await client.PutAsJsonAsync(URI + "/" + livro.Id, livro);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Livro atualizado");
                    }
                    else
                    {
                        MessageBox.Show("Falha ao atualizar o livro : " + responseMessage.StatusCode);
                    }
                }
                GetAllLivros();
            }
            catch
            {
                throw new Excessao("Falha ao atualizar o livro.");
            }
        }


        private async void DeleteLivro(int codLivro)
        {
            try
            {
                //URI = txtNome.Text;
                URI += "/?id=" + codLivro;
                int LivroID = codLivro;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(URI);
                    HttpResponseMessage responseMessage = await client.DeleteAsync(URI);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Livro excluído com sucesso");
                    }
                    else
                    {
                        MessageBox.Show("Falha ao excluir o livro  : " + responseMessage.StatusCode);
                    }
                }
                GetAllLivros();
            }
            catch
            {
                throw new Excessao("Falha ao atualizar o livro.");
            }
        }
    }
}
