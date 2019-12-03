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
            this.textBoxId.Enabled = false;
        }

        public CadastrarUsuario(Int32 idUsuario)
        {
            InitializeComponent();

            //this.carregaUsuario(idUsuario);

            textBoxId.Enabled = false;
            textBoxId.Text = idUsuario.ToString();
        }

        public CadastrarUsuario(Int32 idUsuario, String nome)
        {
            InitializeComponent();

            //this.carregaUsuario(idUsuario);
            textBoxId.Enabled = false;
            textBoxId.Text = idUsuario.ToString();
            textBoxNome.Text = nome;
        }

        static Usuarios usuario;

        private async void RetornaUsuarioById(int? codUsuario)
        {
            //string URI = "http://localhost:5000/api/usuario?id="+codUsuario;
            try
            {
                Usuarios usuario = new Usuarios();
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    string URI = "http://localhost:5000/api/usuario/getById?id=" + codUsuario.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        //usuario = new Usuario();
                        var usuarios = await response.Content.ReadAsAsync<IEnumerable<Usuarios>>();
                        textBoxNome.Text = usuario.Nome;
                        textBoxId.Text = usuario.Id.ToString();
                        //dgvDados.DataSource = bsDados;
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Erro :" + ex.Message);
            }
        }

        public static String mensagem;

        private async void AddUsuario()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/usuario";
                Usuarios usuario = new Usuarios();
                //usuario.Id = codUsuario;
                usuario.Nome = textBoxNome.Text;
                usuario.Ativo = true;

                if (!this.ValidateBook(usuario))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedUsuario = JsonConvert.SerializeObject(usuario);
                        var content = new StringContent(serializedUsuario, Encoding.UTF8, "application/json");
                        var result = await client.PostAsync(URI, content);
                    }
                    MessageBox.Show("Usuario " + usuario.Nome + " Foi cadastrado com sucesso;");
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

        private async void UpdateUsuario()
        {
            try
            {
                mensagem = "";
                string URI = "http://localhost:5000/api/usuario";
                Usuarios usuario = new Usuarios();
                usuario.Id = Convert.ToInt32(textBoxId.Text);
                usuario.Nome = textBoxNome.Text;

                if (!this.ValidateBook(usuario))
                {
                    mensagem = "";
                    using (var client = new HttpClient())
                    {
                        var serializedUsuario = JsonConvert.SerializeObject(usuario);
                        var content = new StringContent(serializedUsuario, Encoding.UTF8, "application/json");
                        var result = await client.PutAsync(URI, content);
                    }
                    MessageBox.Show("Usuario " + usuario.Nome + " Foi editado com sucesso;");
                }
                else
                {
                    MessageBox.Show(mensagem);
                }
            }
            catch(Exception ex)
            {
                MessageBox.Show("Erro :"+ex.Message);
            }
        }

        private Boolean ValidateBook(Usuarios usuario)
        {
            mensagem = "";
            Boolean validador = false;

            if (usuario.Nome.Length == 0)
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

        private void btnVoltar_Click(object sender, EventArgs e)
        {
            FormUsuario formUsuario = new FormUsuario();
            formUsuario.Show();
            this.Close();
            this.Dispose();
        }
    }
}
