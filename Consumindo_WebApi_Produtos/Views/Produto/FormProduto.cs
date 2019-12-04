using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using Consumindo_WebApi_Produtos.Models;
using Consumindo_WebApi_Produtos.Views.Produto.Cadastro;
using Consumindo_WebApi_Produtos.Views.Usuario;

namespace Consumindo_WebApi_Produtos.Views.Produto
{
    public partial class FormProduto : Form
    {
        public FormProduto()
        {
            InitializeComponent();
            this.GetAllProdutos();
        }

        private void btnObterProodutos_Click(object sender, EventArgs e)
        {
            this.GetAllProdutos();
        }

        string URI = "";
        int codigoProduto = 1;

        public async void GetAllProdutos()
        {
            try
            {
                URI = txtURI.Text;
                using (var client = new HttpClient())
                {
                    using (var response = await client.GetAsync(URI))
                    {
                        if (response.IsSuccessStatusCode)
                        {
                            //clienteUri = response.Headers.Location;
                            var ProdutoJsonString = await response.Content.ReadAsStringAsync();
                            dgvDados.DataSource = JsonConvert.DeserializeObject<Produtos[]>(ProdutoJsonString).ToList();
                        }
                        else
                        {
                            MessageBox.Show("Não foi possível obter o produto : " + response.StatusCode);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o produto: " + ex.Message);
            }
        }

        static string mensagem;
        static Produtos produto = new Produtos();
        static public Boolean isNew;

        public async void GetProdutoById(int codProduto,bool isForm)
        {
            try
            {
                //codigoProduto = TextBoxid
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    URI = txtURI.Text + "/getById?id=" + codProduto.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        var ProdutoJsonString = await response.Content.ReadAsStringAsync();
                        bsDados.Clear();
                        bsDados.DataSource = JsonConvert.DeserializeObject<Produtos>(ProdutoJsonString);

                        if (!isNew)
                        {
                            produto = JsonConvert.DeserializeObject<Produtos>(ProdutoJsonString);
                            if(isForm)
                            {
                                CadastroProduto cadastroProduto = new CadastroProduto(produto.Id, produto.Nome, produto.Preco);
                                cadastroProduto.Show();
                                this.Hide();
                            }
                        }
                        else
                        {
                            produto = new Produtos();
                            dgvDados.DataSource = bsDados;
                        }
                    }
                    else
                    {
                        MessageBox.Show("Falha ao obter o produto : " + response.StatusCode);
                    }
                }

            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o produto: " + ex.Message);
            }
        }
        private async void AddProduto()
        {
            try
            {
                URI = txtURI.Text;
                Produtos produto = new Produtos();
                //produto.Id = codProduto;
                /*
                produto.Titulo = "NoteBook Lenovo";
                produto.Resumo = "Notebooks";
                produto.Autor = "Lenovo";
                produto.Quantidade = 12;
                */

                using (var client = new HttpClient())
                {
                    var serializedProduto = JsonConvert.SerializeObject(produto);
                    var content = new StringContent(serializedProduto, Encoding.UTF8, "application/json");
                    var result = await client.PostAsync(URI, content);
                }
                GetAllProdutos();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o produto: " + ex.Message);
            }
        }

        private async void UpdateProduto(int codProduto)
        {
            try
            {
                URI = txtURI.Text;
                Produtos produto = new Produtos();
                produto.Id = codProduto;
                /*
                produto.Titulo = "NoteBook Apple";
                produto.Subtitulo = "Notebooks";
                produto.Autor = "Apple";
                produto.Quantidade = 15; // atualizando o preço do produto
                */

                using (var client = new HttpClient())
                {
                    HttpResponseMessage responseMessage = await client.PutAsJsonAsync(URI + "/" + produto.Id, produto);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Produto atualizado");
                    }
                    else
                    {
                        MessageBox.Show("Falha ao atualizar o produto : " + responseMessage.StatusCode);
                    }
                }
                GetAllProdutos();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o produto: " + ex.Message);
            }
        }


        private async void DeleteProduto(int codProduto)
        {
            try
            {
                URI = txtURI.Text;
                URI += "/?id=" + codProduto;
                int ProdutoID = codProduto;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(URI);
                    HttpResponseMessage responseMessage = await client.DeleteAsync(URI);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Produto excluído com sucesso");
                    }
                    else
                    {
                        MessageBox.Show("Falha ao excluir o produto  : " + responseMessage.StatusCode);
                    }
                }
                GetAllProdutos();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o produto: " + ex.Message);
            }
        }

        private void btnProdutosPorId_Click(object sender, EventArgs e)
        {
            InputBox();
            if (codigoProduto != -1)
            {
                GetProdutoById(codigoProduto, false);
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
                codigoProduto = Convert.ToInt32(Resultado);
            }
            else
            {
                codigoProduto = -1;
            }
        }

        private void btnAtualizaProduto_Click(object sender, EventArgs e)
        {
            try
            {
                InputBox();
                if (codigoProduto != -1)
                {
                    isNew = false;
                    this.GetProdutoById(codigoProduto, true);
                }
                else
                {
                    isNew = false;
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Houve um erro ao buscar o Produto: "+ ex.Message.ToString());
            }
        }

        private void btnDeletarProduto_Click(object sender, EventArgs e)
        {
            InputBox();
            if (codigoProduto != -1)
            {
                DeleteProduto(codigoProduto);
            }
        }

        private void btnIncluirProduto_Click(object sender, EventArgs e)
        {
            isNew = true;

            CadastroProduto cadastroProduto = new CadastroProduto();
            cadastroProduto.Show();
            this.Hide();
        }

        private void btnNavegarUsuario_Click(object sender, EventArgs e)
        {
            FormUsuario formUsuario = new FormUsuario();
            formUsuario.Show();
            this.Hide();
        }
    }//CLASS
}//NAMESPACE
