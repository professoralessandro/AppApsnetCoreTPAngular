namespace Consumindo_WebApi_Produtos.Views.Usuario
{
    partial class FormUsuario
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.txtURI = new System.Windows.Forms.TextBox();
            this.dgvDados = new System.Windows.Forms.DataGridView();
            this.btnDeletarUsuario = new System.Windows.Forms.Button();
            this.btnAtualizaUsuario = new System.Windows.Forms.Button();
            this.btnIncluirUsuario = new System.Windows.Forms.Button();
            this.btnUsuariosPorId = new System.Windows.Forms.Button();
            this.btnObterUsuarios = new System.Windows.Forms.Button();
            this.btnNavegarProduto = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDados)).BeginInit();
            this.SuspendLayout();
            // 
            // txtURI
            // 
            this.txtURI.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtURI.Location = new System.Drawing.Point(266, 18);
            this.txtURI.Name = "txtURI";
            this.txtURI.Size = new System.Drawing.Size(509, 22);
            this.txtURI.TabIndex = 19;
            this.txtURI.Text = "http://localhost:5000/api/usuario";
            this.txtURI.Visible = false;
            // 
            // dgvDados
            // 
            this.dgvDados.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(224)))), ((int)(((byte)(192)))));
            this.dgvDados.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvDados.Location = new System.Drawing.Point(5, 57);
            this.dgvDados.Name = "dgvDados";
            this.dgvDados.RowHeadersWidth = 51;
            this.dgvDados.Size = new System.Drawing.Size(770, 333);
            this.dgvDados.TabIndex = 17;
            // 
            // btnDeletarUsuario
            // 
            this.btnDeletarUsuario.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnDeletarUsuario.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDeletarUsuario.Location = new System.Drawing.Point(626, 396);
            this.btnDeletarUsuario.Name = "btnDeletarUsuario";
            this.btnDeletarUsuario.Size = new System.Drawing.Size(149, 44);
            this.btnDeletarUsuario.TabIndex = 12;
            this.btnDeletarUsuario.Text = "Deletar Usuario";
            this.btnDeletarUsuario.UseVisualStyleBackColor = false;
            // 
            // btnAtualizaUsuario
            // 
            this.btnAtualizaUsuario.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnAtualizaUsuario.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAtualizaUsuario.Location = new System.Drawing.Point(471, 396);
            this.btnAtualizaUsuario.Name = "btnAtualizaUsuario";
            this.btnAtualizaUsuario.Size = new System.Drawing.Size(149, 44);
            this.btnAtualizaUsuario.TabIndex = 13;
            this.btnAtualizaUsuario.Text = "Atualizar Usuario";
            this.btnAtualizaUsuario.UseVisualStyleBackColor = false;
            this.btnAtualizaUsuario.Click += new System.EventHandler(this.btnAtualizaUsuario_Click);
            // 
            // btnIncluirUsuario
            // 
            this.btnIncluirUsuario.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnIncluirUsuario.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnIncluirUsuario.Location = new System.Drawing.Point(316, 396);
            this.btnIncluirUsuario.Name = "btnIncluirUsuario";
            this.btnIncluirUsuario.Size = new System.Drawing.Size(149, 44);
            this.btnIncluirUsuario.TabIndex = 14;
            this.btnIncluirUsuario.Text = "Incluir Usuario";
            this.btnIncluirUsuario.UseVisualStyleBackColor = false;
            this.btnIncluirUsuario.Click += new System.EventHandler(this.btnIncluirUsuario_Click);
            // 
            // btnUsuariosPorId
            // 
            this.btnUsuariosPorId.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnUsuariosPorId.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnUsuariosPorId.Location = new System.Drawing.Point(161, 396);
            this.btnUsuariosPorId.Name = "btnUsuariosPorId";
            this.btnUsuariosPorId.Size = new System.Drawing.Size(149, 44);
            this.btnUsuariosPorId.TabIndex = 15;
            this.btnUsuariosPorId.Text = "Obter Usuario Por ID";
            this.btnUsuariosPorId.UseVisualStyleBackColor = false;
            // 
            // btnObterUsuarios
            // 
            this.btnObterUsuarios.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnObterUsuarios.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnObterUsuarios.Location = new System.Drawing.Point(6, 396);
            this.btnObterUsuarios.Name = "btnObterUsuarios";
            this.btnObterUsuarios.Size = new System.Drawing.Size(149, 44);
            this.btnObterUsuarios.TabIndex = 16;
            this.btnObterUsuarios.Text = "Retornar Usuarios";
            this.btnObterUsuarios.UseVisualStyleBackColor = false;
            this.btnObterUsuarios.Click += new System.EventHandler(this.btnObterUsuarios_Click);
            // 
            // btnNavegarProduto
            // 
            this.btnNavegarProduto.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnNavegarProduto.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnNavegarProduto.Location = new System.Drawing.Point(10, 6);
            this.btnNavegarProduto.Name = "btnNavegarProduto";
            this.btnNavegarProduto.Size = new System.Drawing.Size(149, 44);
            this.btnNavegarProduto.TabIndex = 20;
            this.btnNavegarProduto.Text = "Listar Produtos";
            this.btnNavegarProduto.UseVisualStyleBackColor = false;
            this.btnNavegarProduto.Click += new System.EventHandler(this.btnNavegarProduto_Click);
            // 
            // FormUsuario
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.ClientSize = new System.Drawing.Size(783, 448);
            this.Controls.Add(this.btnNavegarProduto);
            this.Controls.Add(this.txtURI);
            this.Controls.Add(this.dgvDados);
            this.Controls.Add(this.btnDeletarUsuario);
            this.Controls.Add(this.btnAtualizaUsuario);
            this.Controls.Add(this.btnIncluirUsuario);
            this.Controls.Add(this.btnUsuariosPorId);
            this.Controls.Add(this.btnObterUsuarios);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "FormUsuario";
            this.Text = "FormUsuario";
            ((System.ComponentModel.ISupportInitialize)(this.dgvDados)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtURI;
        private System.Windows.Forms.DataGridView dgvDados;
        private System.Windows.Forms.Button btnDeletarUsuario;
        private System.Windows.Forms.Button btnAtualizaUsuario;
        private System.Windows.Forms.Button btnIncluirUsuario;
        private System.Windows.Forms.Button btnUsuariosPorId;
        private System.Windows.Forms.Button btnObterUsuarios;
        private System.Windows.Forms.Button btnNavegarProduto;
    }
}