using Consumindo_WebApi_Produtos.Models;
using Consumindo_WebApi_Produtos.Views.Produto;
using Consumindo_WebApi_Produtos.Views.Usuario.Cadastro;
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

namespace Consumindo_WebApi_Produtos.Views.Usuario
{
    public partial class FormUsuario : Form
    {
        public FormUsuario()
        {
            InitializeComponent();
            this.GetAllUsuarios();
        }

        private void btnObterUsuarios_Click(object sender, EventArgs e)
        {
            this.GetAllUsuarios();
        }

        string URI = "";
        int codigoUsuario = 1;

        public async void GetAllUsuarios()
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
                            var UsuarioJsonString = await response.Content.ReadAsStringAsync();
                            dgvDados.DataSource = JsonConvert.DeserializeObject<Usuarios[]>(UsuarioJsonString).ToList();
                        }
                        else
                        {
                            MessageBox.Show("Não foi possível obter o usuario : " + response.StatusCode);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o usuario: " + ex.Message);
            }
        }

        static string mensagem;
        static Usuarios usuario = new Usuarios();
        static public Boolean isNew;

        public async void GetUsuarioById(int codUsuario)
        {
            try
            {
                //codigoUsuario = TextBoxid
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    URI = txtURI.Text + "/getById?id=" + codUsuario.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        var UsuarioJsonString = await response.Content.ReadAsStringAsync();
                        bsDados.DataSource = JsonConvert.DeserializeObject<Usuarios>(UsuarioJsonString);

                        if (isNew)
                        {
                            usuario = JsonConvert.DeserializeObject<Usuarios>(UsuarioJsonString);
                        }
                        else
                        {
                            dgvDados.DataSource = bsDados;
                        }
                    }
                    else
                    {
                        MessageBox.Show("Falha ao obter o usuario : " + response.StatusCode);
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o usuario: " + ex.Message);
            }
        }
        /*
        public async Task<Usuario> RetonaUsuarioById(int codUsuario, bool isReturn)
        {
            try
            {
                Usuario usuario = new Usuario();
                using (var client = new HttpClient())
                {
                    BindingSource bsDados = new BindingSource();
                    URI = txtURI.Text + "/" + codUsuario.ToString();

                    HttpResponseMessage response = await client.GetAsync(URI);
                    if (response.IsSuccessStatusCode)
                    {
                        var UsuarioJsonString = await response.Content.ReadAsStringAsync();
                        usuario = JsonConvert.DeserializeObject<Usuario>(UsuarioJsonString);
                        return usuario;
                    }
                    else
                    {
                        MessageBox.Show("Falha ao obter o usuario : " + response.StatusCode);
                        return usuario;
                    }
                }
            }
            catch
            {
                throw new Excessao("Falha ao buscar o usuario.");
            }
        }
        */
        private async void AddUsuario()
        {
            try
            {
                URI = txtURI.Text;
                Usuarios usuario = new Usuarios();
                //usuario.Id = codUsuario;
                /*
                usuario.Titulo = "NoteBook Lenovo";
                usuario.Resumo = "Notebooks";
                usuario.Autor = "Lenovo";
                usuario.Quantidade = 12;
                */

                using (var client = new HttpClient())
                {
                    var serializedUsuario = JsonConvert.SerializeObject(usuario);
                    var content = new StringContent(serializedUsuario, Encoding.UTF8, "application/json");
                    var result = await client.PostAsync(URI, content);
                }
                GetAllUsuarios();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o usuario: " + ex.Message);
            }
        }

        private async void UpdateUsuario(int codUsuario)
        {
            try
            {
                URI = txtURI.Text;
                Usuarios usuario = new Usuarios();
                usuario.Id = codUsuario;
                /*
                usuario.Titulo = "NoteBook Apple";
                usuario.Subtitulo = "Notebooks";
                usuario.Autor = "Apple";
                usuario.Quantidade = 15; // atualizando o preço do usuario
                */

                using (var client = new HttpClient())
                {
                    HttpResponseMessage responseMessage = await client.PutAsJsonAsync(URI + "/" + usuario.Id, usuario);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Usuario atualizado");
                    }
                    else
                    {
                        MessageBox.Show("Falha ao atualizar o usuario : " + responseMessage.StatusCode);
                    }
                }
                GetAllUsuarios();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o usuario: " + ex.Message);
            }
        }


        private async void DeleteUsuario(int codUsuario)
        {
            try
            {
                URI = txtURI.Text;
                URI += "/?id=" + codUsuario;
                int UsuarioID = codUsuario;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(URI);
                    HttpResponseMessage responseMessage = await client.DeleteAsync(URI);
                    if (responseMessage.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Usuario excluído com sucesso");
                    }
                    else
                    {
                        MessageBox.Show("Falha ao excluir o usuario  : " + responseMessage.StatusCode);
                    }
                }
                GetAllUsuarios();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Falha ao buscar o usuario: " + ex.Message);
            }
        }

        private void btnAtualizaUsuario_Click(object sender, EventArgs e)
        {
            InputBox();

            isNew = true;

            if (codigoUsuario != -1)
            {
                this.GetUsuarioById(codigoUsuario);
                if (usuario.Nome != "")
                {
                    CadastrarUsuario cadastrarUsuario = new CadastrarUsuario(usuario.Id, usuario.Nome);
                    cadastrarUsuario.Show();
                    this.Hide();
                }
                else
                {
                    MessageBox.Show("Houve um erro ao buscar o Produto");
                }
            }
        }

        private void InputBox()
        {
            /* usando a função VB.Net para exibir um prompt para o usuário informar a senha */
            string Prompt = "Informe o código do Usuario.";
            string Titulo = "www.macoratti.net";
            string Resultado = Microsoft.VisualBasic.Interaction.InputBox(Prompt, Titulo, "9", 600, 350);
            /* verifica se o resultado é uma string vazia o que indica que foi cancelado. */
            if (Resultado != "")
            {
                codigoUsuario = Convert.ToInt32(Resultado);
            }
            else
            {
                codigoUsuario = -1;
            }
        }

        private void btnIncluirUsuario_Click(object sender, EventArgs e)
        {
            isNew = false;

            CadastrarUsuario cadastrarUsuario = new CadastrarUsuario();
            cadastrarUsuario.Show();
            this.Hide();
        }

        private void btnNavegarProduto_Click(object sender, EventArgs e)
        {
            FormProduto formProduto = new FormProduto();
            formProduto.Show();
            formProduto.Hide();
        }
    }//CLASS
}//NAMESPACE
