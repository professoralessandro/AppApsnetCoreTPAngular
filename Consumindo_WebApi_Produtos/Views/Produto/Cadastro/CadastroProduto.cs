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
        }

        public FormCadastrar(Int32 idProduto)
        {
            InitializeComponent();

            //this.carregaProduto(idProduto);

            textBoxId.Enabled = false;
            textBoxId.Text = idProduto.ToString();
        }

        public FormCadastrar(int? Id, string Titulo, string Subtitulo, string Autor, string Resumo, string Capa, int? Quantidade)
        {
            InitializeComponent();

            if (Id == null || Id < 1)
            {
                btnCadastrar.Text = "Cadastrar Produto";
            }
            else
            {
                btnCadastrar.Text = "Editar Produto";
                textBoxId.Enabled = false;
                textBoxId.Text = Id.ToString();
                textBoxTitulo.Text = Titulo;
                textBoxSubtitulo.Text = Subtitulo;
                textBoxAutor.Text = Autor;
                textBoxResumo.Text = Resumo;
                textBoxCapa.Text = Capa;
                textBoxQuantidade.Text = Quantidade.ToString();
            }
        }

        public void carregaProduto(Int32 idProduto)
        {
            Produtos produto = new Produtos();
            produto = this.RetornaProdutoById(idProduto).Result;

            textBoxTitulo.Text = produto.Titulo;
            textBoxSubtitulo.Text = produto.Subtitulo;
            textBoxAutor.Text = produto.Autor;
            textBoxResumo.Text = produto.Resumo;
            textBoxCapa.Text = produto.Capa;
            textBoxQuantidade.Text = produto.Quantidade.ToString();
        }

        public FormCadastrar()
        {
            InitializeComponent();
            textBoxId.Enabled = false;
        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private async Task<Produtos> RetornaProdutoById(int? codProduto)
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
                        var produtos = await response.Content.ReadAsAsync<IEnumerable<Produto>>();
                        /*
                        var livrinho = produtos.Select( livrinho => new
                        {
                            
                        }).ToList()
                        */

                        textBoxTitulo.Text = produto.Titulo;
                        textBoxSubtitulo.Text = produto.Subtitulo;
                        textBoxAutor.Text = produto.Autor;
                        textBoxResumo.Text = produto.Resumo;
                        textBoxCapa.Text = produto.Capa;
                        textBoxQuantidade.Text = produto.Quantidade.ToString();

                        //dgvDados.DataSource = bsDados;
                        return produto;
                    }
                    else
                    {
                        return produto;
                        MessageBox.Show("Falha ao obter o produto : " + response.StatusCode);
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o produto.");
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
                produto.Titulo = textBoxTitulo.Text;
                produto.Subtitulo = textBoxSubtitulo.Text;
                produto.Autor = textBoxAutor.Text;
                produto.Resumo = textBoxResumo.Text;
                produto.Capa = textBoxCapa.Text;
                produto.Quantidade = Convert.ToInt32(textBoxQuantidade.Text);

                if (!this.ValidateBook(produto))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedProduto = JsonConvert.SerializeObject(produto);
                        var content = new StringContent(serializedProduto, Encoding.UTF8, "application/json");
                        var result = await client.PostAsync(URI, content);
                    }
                    MessageBox.Show("Produto " + produto.Titulo + " Foi cadastrado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch
            {
                throw new Excessao("Falha ao adicionar o produto.");
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
                produto.Titulo = textBoxTitulo.Text;
                produto.Subtitulo = textBoxSubtitulo.Text;
                produto.Autor = textBoxAutor.Text;
                produto.Resumo = textBoxResumo.Text;
                produto.Capa = textBoxCapa.Text;
                produto.Quantidade = Convert.ToInt32(textBoxQuantidade.Text);

                if (!this.ValidateBook(produto))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedProduto = JsonConvert.SerializeObject(produto);
                        var content = new StringContent(serializedProduto, Encoding.UTF8, "application/json");
                        var result = await client.PutAsync(URI, content);
                    }
                    MessageBox.Show("Produto " + produto.Titulo + " Foi editado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch
            {
                throw new Excessao("Falha ao atualizar o produto.");
            }
        }

        private Boolean ValidateBook(Produtos produto)
        {
            mensagem = "";
            Boolean validador = false;

            if (produto.Autor.Length == 0)
            {
                validador = true;
                mensagem += "O Campo autor é obrigatório /n";
            }


            if (produto.Titulo.Length == 0)
            {
                validador = true;
                mensagem += "O Campo titulo é obrigatório /n";
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
            if ((Convert.ToInt32(textBoxId.Text) < 1 || String.IsNullOrEmpty(textBoxId.Text)))
            {
                this.AddProduto();
            }
            else
            {
                this.UpdateProduto();
            }
            return;
        }
    }
}
