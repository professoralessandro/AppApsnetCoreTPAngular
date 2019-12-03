using Consumindo_WebApi_Produtos.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Consumindo_WebApi_Produtos.Views.Produto.Cadastro
{
    public partial class CadastroProduto : Form
    {
        public CadastroProduto()
        {
            InitializeComponent();
            textBoxId.Visible = false;
        }

        public CadastroProduto(Int32 idProduto)
        {
            InitializeComponent();

            //this.carregaProduto(idProduto);

            textBoxId.Enabled = false;
            textBoxId.Text = idProduto.ToString();
        }

        public CadastroProduto(int? Id, string nome, decimal? preco)
        {
            InitializeComponent();
            textBoxId.Enabled = false;

            if (Id == null || Id < 1)
            {
                btnCadastrarProduto.Text = "Cadastrar Produto";
            }
            else
            {
                btnCadastrarProduto.Text = "Editar Produto";
                textBoxId.Enabled = false;
                textBoxId.Text = Id.ToString();
                textBoxNome.Text = nome;
                textBoxPreco.Text = preco.ToString();
            }
        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        public static Produtos Produto;

        private async void RetornaProdutoById(int? codProduto)
        {
            //string URI = "http://localhost:5000/api/produto?id="+codProduto;
            Produtos produto = new Produtos();
            try
            {
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    string URI = "http://localhost:5000/api/produto/getById?id=" + codProduto.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        //produto = new Produto();
                        var produtos = await response.Content.ReadAsAsync<IEnumerable<Produtos>>();
                        /*
                        var livrinho = produtos.Select( livrinho => new
                        {
                            
                        }).ToList()
                        */

                        textBoxNome.Text = produto.Nome;
                        textBoxPreco.Text = produto.Preco.ToString();

                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro :" + ex.Message);
            }
        }
        /*
        protected internal override void OnInit(EventArgs e)
        {
            var form1 = new Form1();
            textBoxId.Enabled = false;

            if (form1.idProduto == null)
            {

            }
            else
            {
                textBoxId.Text = form1.idProduto.ToString();
            }
        }
        */

        public static String mensagem;

        private async void AddProduto()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/produto";
                Produtos produto = new Produtos();
                //produto.Id = codProduto;
                produto.Nome = textBoxNome.Text;
                produto.Preco = Convert.ToDecimal(textBoxPreco.Text);
                produto.Ativo = true;

                if (!this.ValidateBook(produto))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedProduto = JsonConvert.SerializeObject(produto);
                        var content = new StringContent(serializedProduto, Encoding.UTF8, "application/json");
                        var result = await client.PostAsync(URI, content);
                    }
                    MessageBox.Show("Produto " + produto.Nome + " Foi cadastrado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro :" + ex.Message);
            }
        }

        private async void UpdateProduto()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/produto";
                Produtos produto = new Produtos();
                produto.Id = Convert.ToInt32(textBoxId.Text);
                produto.Nome = textBoxNome.Text;
                produto.Preco = Convert.ToDecimal(textBoxPreco.Text);

                if (!this.ValidateBook(produto))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedProduto = JsonConvert.SerializeObject(produto);
                        var content = new StringContent(serializedProduto, Encoding.UTF8, "application/json");
                        var result = await client.PutAsync(URI, content);
                    }
                    MessageBox.Show("Produto " + produto.Nome + " Foi editado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro :" + ex.Message);
            }
        }

        private Boolean ValidateBook(Produtos produto)
        {
            mensagem = "";
            Boolean validador = false;

            if (produto.Nome.Length == 0)
            {
                validador = true;
                mensagem += "O Campo autor é obrigatório /n";
            }

            if (validador.Equals(true))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private void btnCadastrarProduto_Click(object sender, EventArgs e)
        {
            if (String.IsNullOrEmpty(textBoxId.Text))
            {
                this.AddProduto();
            }
            else
            {
                this.UpdateProduto();
            }
            return;
        }

        private void btnVoltar_Click(object sender, EventArgs e)
        {
            FormProduto formProduto = new FormProduto();
            formProduto.Show();
            this.Close();
            this.Dispose();
        }
    }
}
