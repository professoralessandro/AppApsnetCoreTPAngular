using Consumindo_WebApi_Produtos.Common;
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

namespace Consumindo_WebApi_Produtos.Cadastrar
{
    public partial class FormCadastrar : Form
    {
        public FormCadastrar(Int32 idLivro)
        {
                InitializeComponent();

                //this.carregaLivro(idLivro);

                textBoxId.Enabled = false;
                textBoxId.Text = idLivro.ToString();
        }

        public FormCadastrar(int? Id, string Titulo, string Subtitulo, string Autor, string Resumo, string Capa, int? Quantidade)
        {
            InitializeComponent();

            if(Id == null || Id < 1)
            {
                btnCadastrar.Text = "Cadastrar Livro";
            }
            else
            {
                btnCadastrar.Text = "Editar Livro";
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

        public void carregaLivro(Int32 idLivro)
        {
            Livro livro = new Livro();
            livro = this.RetornaLivroById(idLivro).Result;

            textBoxTitulo.Text = livro.Titulo;
            textBoxSubtitulo.Text = livro.Subtitulo;
            textBoxAutor.Text = livro.Autor;
            textBoxResumo.Text = livro.Resumo;
            textBoxCapa.Text = livro.Capa;
            textBoxQuantidade.Text = livro.Quantidade.ToString();
        }

        public FormCadastrar()
        {
            InitializeComponent();
            textBoxId.Enabled = false;
        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private async Task<Livro> RetornaLivroById(int? codLivro)
        {
            //string URI = "http://localhost:5000/api/livro?id="+codLivro;
            Livro livro = new Livro();
            try
            {
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    string URI = "http://localhost:5000/api/livro/getById?id=" + codLivro.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        //livro = new Livro();
                        var livros = await response.Content.ReadAsAsync<IEnumerable<Livro>>();
                        /*
                        var livrinho = livros.Select( livrinho => new
                        {
                            
                        }).ToList()
                        */

                        textBoxTitulo.Text = livro.Titulo;
                        textBoxSubtitulo.Text = livro.Subtitulo;
                        textBoxAutor.Text = livro.Autor;
                        textBoxResumo.Text = livro.Resumo;
                        textBoxCapa.Text = livro.Capa;
                        textBoxQuantidade.Text = livro.Quantidade.ToString();

                        //dgvDados.DataSource = bsDados;
                        return livro;
                    }
                    else
                    {
                        return livro;
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
        protected internal override void OnInit(EventArgs e)
        {
            var form1 = new Form1();
            textBoxId.Enabled = false;

            if (form1.idLivro == null)
            {

            }
            else
            {
                textBoxId.Text = form1.idLivro.ToString();
            }
        }
        */
        private void BtnCadastrar_Click(object sender, EventArgs e)
        {
            if((Convert.ToInt32(textBoxId.Text) < 1 || String.IsNullOrEmpty(textBoxId.Text)))
            {
                this.AddLivro();
            }
            else
            {
                this.UpdateLivro();
            }
            return;
        }

        public static String mensagem;

        private async void AddLivro()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/livro";
                Livro livro = new Livro();
                //livro.Id = codLivro;
                livro.Titulo = textBoxTitulo.Text;
                livro.Subtitulo = textBoxSubtitulo.Text;
                livro.Autor = textBoxAutor.Text;
                livro.Resumo = textBoxResumo.Text;
                livro.Capa = textBoxCapa.Text;
                livro.Quantidade = Convert.ToInt32(textBoxQuantidade.Text);

                if(!this.ValidateBook(livro))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedLivro = JsonConvert.SerializeObject(livro);
                        var content = new StringContent(serializedLivro, Encoding.UTF8, "application/json");
                        var result = await client.PostAsync(URI, content);
                    }
                    MessageBox.Show("Livro " + livro.Titulo + " Foi cadastrado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }                
            }
            catch
            {
                throw new Excessao("Falha ao adicionar o livro.");
            }
        }

        private async void UpdateLivro()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/livro";
                Livro livro = new Livro();
                livro.Id = Convert.ToInt32(textBoxId.Text);
                livro.Titulo = textBoxTitulo.Text;
                livro.Subtitulo = textBoxSubtitulo.Text;
                livro.Autor = textBoxAutor.Text;
                livro.Resumo = textBoxResumo.Text;
                livro.Capa = textBoxCapa.Text;
                livro.Quantidade = Convert.ToInt32(textBoxQuantidade.Text);

                if (!this.ValidateBook(livro))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedLivro = JsonConvert.SerializeObject(livro);
                        var content = new StringContent(serializedLivro, Encoding.UTF8, "application/json");
                        var result = await client.PutAsync(URI, content);
                    }
                    MessageBox.Show("Livro " + livro.Titulo + " Foi editado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch
            {
                throw new Excessao("Falha ao atualizar o livro.");
            }
        }

        private Boolean ValidateBook(Livro livro)
        {
            mensagem = "";
            Boolean validador = false;

            if(livro.Autor.Length == 0)
            {
                validador = true;
                mensagem += "O Campo autor é obrigatório /n";
            }
                

            if(livro.Titulo.Length == 0)
            {
                validador = true;
                mensagem += "O Campo titulo é obrigatório /n";
            }

            if(validador.Equals(true))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private void TextBoxId_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
