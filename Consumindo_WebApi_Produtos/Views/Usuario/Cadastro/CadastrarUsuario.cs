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

namespace Consumindo_WebApi_Produtos.Views.Usuario.Cadastro
{
    public partial class CadastrarUsuario : Form
    {
        public CadastrarUsuario()
        {
            InitializeComponent();
        }

        public FormCadastrar(Int32 idUsuario)
        {
            InitializeComponent();

            //this.carregaUsuario(idUsuario);

            textBoxId.Enabled = false;
            textBoxId.Text = idUsuario.ToString();
        }

        public FormCadastrar(int? Id, string Titulo, string Subtitulo, string Autor, string Resumo, string Capa, int? Quantidade)
        {
            InitializeComponent();

            if (Id == null || Id < 1)
            {
                btnCadastrar.Text = "Cadastrar Usuario";
            }
            else
            {
                btnCadastrar.Text = "Editar Usuario";
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

        public void carregaUsuario(Int32 idUsuario)
        {
            Usuario usuario = new Usuario();
            usuario = this.RetornaUsuarioById(idUsuario).Result;

            textBoxTitulo.Text = usuario.Titulo;
            textBoxSubtitulo.Text = usuario.Subtitulo;
            textBoxAutor.Text = usuario.Autor;
            textBoxResumo.Text = usuario.Resumo;
            textBoxCapa.Text = usuario.Capa;
            textBoxQuantidade.Text = usuario.Quantidade.ToString();
        }

        public FormCadastrar()
        {
            InitializeComponent();
            textBoxId.Enabled = false;
        }

        private void TextBox1_TextChanged(object sender, EventArgs e)
        {

        }

        private async Task<Usuarios> RetornaUsuarioById(int? codUsuario)
        {
            //string URI = "http://localhost:5000/api/usuario?id="+codUsuario;
            Usuarios usuario = new Usuarios();
            try
            {
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    string URI = "http://localhost:5000/api/usuario/getById?id=" + codUsuario.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        //usuario = new Usuario();
                        var usuarios = await response.Content.ReadAsAsync<IEnumerable<Usuario>>();
                        /*
                        var livrinho = usuarios.Select( livrinho => new
                        {
                            
                        }).ToList()
                        */

                        textBoxTitulo.Text = usuario.Titulo;
                        textBoxSubtitulo.Text = usuario.Subtitulo;
                        textBoxAutor.Text = usuario.Autor;
                        textBoxResumo.Text = usuario.Resumo;
                        textBoxCapa.Text = usuario.Capa;
                        textBoxQuantidade.Text = usuario.Quantidade.ToString();

                        //dgvDados.DataSource = bsDados;
                        return usuario;
                    }
                    else
                    {
                        return usuario;
                        MessageBox.Show("Falha ao obter o usuario : " + response.StatusCode);
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o usuario.");
            }
        }
        /*
        protected internal override void OnInit(EventArgs e)
        {
            var form1 = new Form1();
            textBoxId.Enabled = false;

            if (form1.idUsuario == null)
            {

            }
            else
            {
                textBoxId.Text = form1.idUsuario.ToString();
            }
        }
        */

        public static String mensagem;

        private async void AddUsuario()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/usuario";
                Usuarios usuario = new Usuarios();
                //usuario.Id = codUsuario;
                usuario.Titulo = textBoxTitulo.Text;
                usuario.Subtitulo = textBoxSubtitulo.Text;
                usuario.Autor = textBoxAutor.Text;
                usuario.Resumo = textBoxResumo.Text;
                usuario.Capa = textBoxCapa.Text;
                usuario.Quantidade = Convert.ToInt32(textBoxQuantidade.Text);

                if (!this.ValidateBook(usuario))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedUsuario = JsonConvert.SerializeObject(usuario);
                        var content = new StringContent(serializedUsuario, Encoding.UTF8, "application/json");
                        var result = await client.PostAsync(URI, content);
                    }
                    MessageBox.Show("Usuario " + usuario.Titulo + " Foi cadastrado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch
            {
                throw new Excessao("Falha ao adicionar o usuario.");
            }
        }

        private async void UpdateUsuario()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/usuario";
                Usuarios usuario = new Usuarios();
                usuario.Id = Convert.ToInt32(textBoxId.Text);
                usuario.Titulo = textBoxTitulo.Text;
                usuario.Subtitulo = textBoxSubtitulo.Text;
                usuario.Autor = textBoxAutor.Text;
                usuario.Resumo = textBoxResumo.Text;
                usuario.Capa = textBoxCapa.Text;
                usuario.Quantidade = Convert.ToInt32(textBoxQuantidade.Text);

                if (!this.ValidateBook(usuario))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedUsuario = JsonConvert.SerializeObject(usuario);
                        var content = new StringContent(serializedUsuario, Encoding.UTF8, "application/json");
                        var result = await client.PutAsync(URI, content);
                    }
                    MessageBox.Show("Usuario " + usuario.Titulo + " Foi editado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch
            {
                throw new Excessao("Falha ao atualizar o usuario.");
            }
        }

        private Boolean ValidateBook(Usuarios usuario)
        {
            mensagem = "";
            Boolean validador = false;

            if (usuario.Autor.Length == 0)
            {
                validador = true;
                mensagem += "O Campo autor é obrigatório /n";
            }


            if (usuario.Titulo.Length == 0)
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

        private void btnCadastrarUsuario_Click(object sender, EventArgs e)
        {
            if ((Convert.ToInt32(textBoxId.Text) < 1 || String.IsNullOrEmpty(textBoxId.Text)))
            {
                this.AddUsuario();
            }
            else
            {
                this.UpdateUsuario();
            }
            return;
        }
    }
}
