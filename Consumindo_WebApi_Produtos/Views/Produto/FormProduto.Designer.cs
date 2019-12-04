namespace Consumindo_WebApi_Produtos.Views.Produto
{
    partial class FormProduto
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
            this.btnDeletarProduto = new System.Windows.Forms.Button();
            this.btnAtualizaProduto = new System.Windows.Forms.Button();
            this.btnIncluirProduto = new System.Windows.Forms.Button();
            this.btnProdutosPorId = new System.Windows.Forms.Button();
            this.btnObterProodutos = new System.Windows.Forms.Button();
            this.btnNavegarUsuario = new System.Windows.Forms.Button();
            this.labelCadastroUsuario = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.dgvDados)).BeginInit();
            this.SuspendLayout();
            // 
            // txtURI
            // 
            this.txtURI.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txtURI.Location = new System.Drawing.Point(242, 21);
            this.txtURI.Name = "txtURI";
            this.txtURI.Size = new System.Drawing.Size(552, 22);
            this.txtURI.TabIndex = 19;
            this.txtURI.Text = "http://localhost:5000/api/Produto";
            this.txtURI.Visible = false;
            // 
            // dgvDados
            // 
            this.dgvDados.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(224)))), ((int)(((byte)(192)))));
            this.dgvDados.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgvDados.Location = new System.Drawing.Point(24, 61);
            this.dgvDados.Name = "dgvDados";
            this.dgvDados.RowHeadersWidth = 51;
            this.dgvDados.Size = new System.Drawing.Size(770, 332);
            this.dgvDados.TabIndex = 17;
            // 
            // btnDeletarProduto
            // 
            this.btnDeletarProduto.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnDeletarProduto.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnDeletarProduto.Location = new System.Drawing.Point(645, 400);
            this.btnDeletarProduto.Name = "btnDeletarProduto";
            this.btnDeletarProduto.Size = new System.Drawing.Size(149, 44);
            this.btnDeletarProduto.TabIndex = 12;
            this.btnDeletarProduto.Text = "Deletar Produto";
            this.btnDeletarProduto.UseVisualStyleBackColor = false;
            this.btnDeletarProduto.Click += new System.EventHandler(this.btnDeletarProduto_Click);
            // 
            // btnAtualizaProduto
            // 
            this.btnAtualizaProduto.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnAtualizaProduto.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnAtualizaProduto.Location = new System.Drawing.Point(490, 400);
            this.btnAtualizaProduto.Name = "btnAtualizaProduto";
            this.btnAtualizaProduto.Size = new System.Drawing.Size(149, 44);
            this.btnAtualizaProduto.TabIndex = 13;
            this.btnAtualizaProduto.Text = "Atualizar Produto";
            this.btnAtualizaProduto.UseVisualStyleBackColor = false;
            this.btnAtualizaProduto.Click += new System.EventHandler(this.btnAtualizaProduto_Click);
            // 
            // btnIncluirProduto
            // 
            this.btnIncluirProduto.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnIncluirProduto.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnIncluirProduto.Location = new System.Drawing.Point(335, 400);
            this.btnIncluirProduto.Name = "btnIncluirProduto";
            this.btnIncluirProduto.Size = new System.Drawing.Size(149, 44);
            this.btnIncluirProduto.TabIndex = 14;
            this.btnIncluirProduto.Text = "Incluir Produto";
            this.btnIncluirProduto.UseVisualStyleBackColor = false;
            this.btnIncluirProduto.Click += new System.EventHandler(this.btnIncluirProduto_Click);
            // 
            // btnProdutosPorId
            // 
            this.btnProdutosPorId.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnProdutosPorId.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnProdutosPorId.Location = new System.Drawing.Point(180, 400);
            this.btnProdutosPorId.Name = "btnProdutosPorId";
            this.btnProdutosPorId.Size = new System.Drawing.Size(149, 44);
            this.btnProdutosPorId.TabIndex = 15;
            this.btnProdutosPorId.Text = "Obter Produto Por ID";
            this.btnProdutosPorId.UseVisualStyleBackColor = false;
            this.btnProdutosPorId.Click += new System.EventHandler(this.btnProdutosPorId_Click);
            // 
            // btnObterProodutos
            // 
            this.btnObterProodutos.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnObterProodutos.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnObterProodutos.Location = new System.Drawing.Point(25, 400);
            this.btnObterProodutos.Name = "btnObterProodutos";
            this.btnObterProodutos.Size = new System.Drawing.Size(149, 44);
            this.btnObterProodutos.TabIndex = 16;
            this.btnObterProodutos.Text = "Retornar Produtos";
            this.btnObterProodutos.UseVisualStyleBackColor = false;
            this.btnObterProodutos.Click += new System.EventHandler(this.btnObterProodutos_Click);
            // 
            // btnNavegarUsuario
            // 
            this.btnNavegarUsuario.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(255)))), ((int)(((byte)(192)))), ((int)(((byte)(128)))));
            this.btnNavegarUsuario.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btnNavegarUsuario.Location = new System.Drawing.Point(25, 11);
            this.btnNavegarUsuario.Name = "btnNavegarUsuario";
            this.btnNavegarUsuario.Size = new System.Drawing.Size(149, 44);
            this.btnNavegarUsuario.TabIndex = 21;
            this.btnNavegarUsuario.Text = "Listar Usuarios";
            this.btnNavegarUsuario.UseVisualStyleBackColor = false;
            this.btnNavegarUsuario.Click += new System.EventHandler(this.btnNavegarUsuario_Click);
            // 
            // labelCadastroUsuario
            // 
            this.labelCadastroUsuario.AutoSize = true;
            this.labelCadastroUsuario.Font = new System.Drawing.Font("Microsoft Sans Serif", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelCadastroUsuario.Location = new System.Drawing.Point(224, 15);
            this.labelCadastroUsuario.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.labelCadastroUsuario.Name = "labelCadastroUsuario";
            this.labelCadastroUsuario.Size = new System.Drawing.Size(118, 29);
            this.labelCadastroUsuario.TabIndex = 53;
            this.labelCadastroUsuario.Text = "Produtos";
            // 
            // FormProduto
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(128)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
            this.ClientSize = new System.Drawing.Size(818, 466);
            this.Controls.Add(this.labelCadastroUsuario);
            this.Controls.Add(this.btnNavegarUsuario);
            this.Controls.Add(this.txtURI);
            this.Controls.Add(this.dgvDados);
            this.Controls.Add(this.btnDeletarProduto);
            this.Controls.Add(this.btnAtualizaProduto);
            this.Controls.Add(this.btnIncluirProduto);
            this.Controls.Add(this.btnProdutosPorId);
            this.Controls.Add(this.btnObterProodutos);
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "FormProduto";
            this.Text = "FormProduto";
            ((System.ComponentModel.ISupportInitialize)(this.dgvDados)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TextBox txtURI;
        private System.Windows.Forms.DataGridView dgvDados;
        private System.Windows.Forms.Button btnDeletarProduto;
        private System.Windows.Forms.Button btnAtualizaProduto;
        private System.Windows.Forms.Button btnIncluirProduto;
        private System.Windows.Forms.Button btnProdutosPorId;
        private System.Windows.Forms.Button btnObterProodutos;
        private System.Windows.Forms.Button btnNavegarUsuario;
        private System.Windows.Forms.Label labelCadastroUsuario;
    }
}