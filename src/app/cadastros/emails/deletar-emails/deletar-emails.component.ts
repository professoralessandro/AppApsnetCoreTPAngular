import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MailingMails } from 'src/app/models/MailingMails';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-deletar-emails',
  templateUrl: './deletar-emails.component.html',
  styleUrls: ['./deletar-emails.component.scss']
})


export class DeleteMailingMailsComponent implements OnInit {
  public loading = false;
  public emails: MailingMails = new MailingMails();
  public listaMailingMails: MailingMails[] = [];
  permissions: Permissions = new Permissions();
  public bindTable: BindTable[] = [];
  error = false;
  mensagem = "";


  constructor(
    private authService: AuthenticationService,
    private router: ActivatedRoute,
    private emailServico: EmailService,
    private routerNavigate: Router
    ) { }

  ngOnInit() {
    this.loading = true;
    this.emails.ativo  = true;
    
    this.error = false;
    this.mensagem = "";

    this.authService.verificarPermissao('Grupos').then(c => { this.permissions.btnCadastrar = c; });

    this.router.paramMap.subscribe(c => {
      this.loading = false;
      if (c.get('id') != null) {
        this.emailServico.getAll(Number(c.get('id')), null, null, null).subscribe(x => {
          this.mensagem = x[0].descricao;
          //alert(JSON.stringify(x[0]));
        });
      }
    });
  }
  deletar() {
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      this.loading = false;;
      this.emailServico.delete(Number(params.get('id'))).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/emails']).then((e) => {
        });
      });
    });
  }

  
}




export class Permissions {
  btnCadastrar: boolean;
}

export class BindTable {
  codigo: number;
  sede: string;
  descricao: string;
  ativo: boolean;
}