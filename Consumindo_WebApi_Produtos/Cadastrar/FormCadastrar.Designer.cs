namespace Consumindo_WebApi_Produtos.Cadastrar
{
    partial class FormCadastrar
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
            this.btnCadastrar = new System.Windows.Forms.Button();
            this.labelId = new System.Windows.Forms.Label();
            this.textBoxId = new System.Windows.Forms.TextBox();
            this.textBoxTitulo = new System.Windows.Forms.TextBox();
            this.labelTítulo = new System.Windows.Forms.Label();
            this.textBoxSubtitulo = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.textBoxResumo = new System.Windows.Forms.TextBox();
            this.labelResumo = new System.Windows.Forms.Label();
            this.textBoxCapa = new System.Windows.Forms.TextBox();
            this.labelCapa = new System.Windows.Forms.Label();
            this.textBoxAutor = new System.Windows.Forms.TextBox();
            this.labelAutor = new System.Windows.Forms.Label();
            this.textBoxQuantidade = new System.Windows.Forms.TextBox();
            this.labelQuantidade = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // btnCadastrar
            // 
            this.btnCadastrar.Location = new System.Drawing.Point(60, 404);
            this.btnCadastrar.Name = "btnCadastrar";
            this.btnCadastrar.Size = new System.Drawing.Size(600, 50);
            this.btnCadastrar.TabIndex = 0;
            this.btnCadastrar.Text = "Cadastrar Livro";
            this.btnCadastrar.UseVisualStyleBackColor = true;
            this.btnCadastrar.Click += new System.EventHandler(this.BtnCadastrar_Click);
            // 
            // labelId
            // 
            this.labelId.AutoSize = true;
            this.labelId.Location = new System.Drawing.Point(57, 39);
            this.labelId.Name = "labelId";
            this.labelId.Size = new System.Drawing.Size(25, 17);
            this.labelId.TabIndex = 2;
            this.labelId.Text = "ID:";
            // 
            // textBoxId
            // 
            this.textBoxId.Location = new System.Drawing.Point(159, 36);
            this.textBoxId.Name = "textBoxId";
            this.textBoxId.Size = new System.Drawing.Size(501, 22);
            this.textBoxId.TabIndex = 3;
            this.textBoxId.TextChanged += new System.EventHandler(this.TextBoxId_TextChanged);
            // 
            // textBoxTitulo
            // 
            this.textBoxTitulo.Location = new System.Drawing.Point(159, 89);
            this.textBoxTitulo.Name = "textBoxTitulo";
            this.textBoxTitulo.Size = new System.Drawing.Size(501, 22);
            this.textBoxTitulo.TabIndex = 5;
            // 
            // labelTítulo
            // 
            this.labelTítulo.AutoSize = true;
            this.labelTítulo.Location = new System.Drawing.Point(57, 92);
            this.labelTítulo.Name = "labelTítulo";
            this.labelTítulo.Size = new System.Drawing.Size(47, 17);
            this.labelTítulo.TabIndex = 4;
            this.labelTítulo.Text = "Título:";
            // 
            // textBoxSubtitulo
            // 
            this.textBoxSubtitulo.Location = new System.Drawing.Point(159, 141);
            this.textBoxSubtitulo.Name = "textBoxSubtitulo";
            this.textBoxSubtitulo.Size = new System.Drawing.Size(501, 22);
            this.textBoxSubtitulo.TabIndex = 7;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(57, 144);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(67, 17);
            this.label1.TabIndex = 6;
            this.label1.Text = "Subtítulo:";
            // 
            // textBoxResumo
            // 
            this.textBoxResumo.Location = new System.Drawing.Point(159, 292);
            this.textBoxResumo.Name = "textBoxResumo";
            this.textBoxResumo.Size = new System.Drawing.Size(501, 22);
            this.textBoxResumo.TabIndex = 13;
            this.textBoxResumo.TextChanged += new System.EventHandler(this.TextBox1_TextChanged);
            // 
            // labelResumo
            // 
            this.labelResumo.AutoSize = true;
            this.labelResumo.Location = new System.Drawing.Point(57, 295);
            this.labelResumo.Name = "labelResumo";
            this.labelResumo.Size = new System.Drawing.Size(64, 17);
            this.labelResumo.TabIndex = 12;
            this.labelResumo.Text = "Resumo:";
            // 
            // textBoxCapa
            // 
            this.textBoxCapa.Location = new System.Drawing.Point(159, 241);
            this.textBoxCapa.Name = "textBoxCapa";
            this.textBoxCapa.Size = new System.Drawing.Size(501, 22);
            this.textBoxCapa.TabIndex = 11;
            // 
            // labelCapa
            // 
            this.labelCapa.AutoSize = true;
            this.labelCapa.Location = new System.Drawing.Point(59, 244);
            this.labelCapa.Name = "labelCapa";
            this.labelCapa.Size = new System.Drawing.Size(45, 17);
            this.labelCapa.TabIndex = 10;
            this.labelCapa.Text = "Capa:";
            // 
            // textBoxAutor
            // 
            this.textBoxAutor.Location = new System.Drawing.Point(159, 193);
            this.textBoxAutor.Name = "textBoxAutor";
            this.textBoxAutor.Size = new System.Drawing.Size(501, 22);
            this.textBoxAutor.TabIndex = 9;
            // 
            // labelAutor
            // 
            this.labelAutor.AutoSize = true;
            this.labelAutor.Location = new System.Drawing.Point(57, 196);
            this.labelAutor.Name = "labelAutor";
            this.labelAutor.Size = new System.Drawing.Size(46, 17);
            this.labelAutor.TabIndex = 8;
            this.labelAutor.Text = "Autor:";
            // 
            // textBoxQuantidade
            // 
            this.textBoxQuantidade.Location = new System.Drawing.Point(159, 347);
            this.textBoxQuantidade.Name = "textBoxQuantidade";
            this.textBoxQuantidade.Size = new System.Drawing.Size(501, 22);
            this.textBoxQuantidade.TabIndex = 15;
            // 
            // labelQuantidade
            // 
            this.labelQuantidade.AutoSize = true;
            this.labelQuantidade.Location = new System.Drawing.Point(57, 350);
            this.labelQuantidade.Name = "labelQuantidade";
            this.labelQuantidade.Size = new System.Drawing.Size(86, 17);
            this.labelQuantidade.TabIndex = 14;
            this.labelQuantidade.Text = "Quantidade:";
            // 
            // FormCadastrar
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(680, 487);
            this.Controls.Add(this.textBoxQuantidade);
            this.Controls.Add(this.labelQuantidade);
            this.Controls.Add(this.textBoxResumo);
            this.Controls.Add(this.labelResumo);
            this.Controls.Add(this.textBoxCapa);
            this.Controls.Add(this.labelCapa);
            this.Controls.Add(this.textBoxAutor);
            this.Controls.Add(this.labelAutor);
            this.Controls.Add(this.textBoxSubtitulo);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxTitulo);
            this.Controls.Add(this.labelTítulo);
            this.Controls.Add(this.textBoxId);
            this.Controls.Add(this.labelId);
            this.Controls.Add(this.btnCadastrar);
            this.Name = "FormCadastrar";
            this.Text = "FormCadastrar";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btnCadastrar;
        private System.Windows.Forms.Label labelId;
        private System.Windows.Forms.TextBox textBoxId;
        private System.Windows.Forms.TextBox textBoxTitulo;
        private System.Windows.Forms.Label labelTítulo;
        private System.Windows.Forms.TextBox textBoxSubtitulo;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBoxResumo;
        private System.Windows.Forms.Label labelResumo;
        private System.Windows.Forms.TextBox textBoxCapa;
        private System.Windows.Forms.Label labelCapa;
        private System.Windows.Forms.TextBox textBoxAutor;
        private System.Windows.Forms.Label labelAutor;
        private System.Windows.Forms.TextBox textBoxQuantidade;
        private System.Windows.Forms.Label labelQuantidade;
    }
}