
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { AssociadoService } from 'src/app/services/associados.service';
import { Associado } from 'src/app/models/Associado';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { PagerService } from '@app/services/pager.service';
import { FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AlertService } from '@app/_resources/_components/alert/alert.service';
import { ModalService } from '@app/services/modal.service';
/* import { $ } from 'jquery'; */
declare var $: any;

@Component({
  selector: 'app-associados',
  templateUrl: './associados.component.html',
  styleUrls: ['./associados.component.scss'],    
})
export class AssociadosComponent implements OnInit, AfterViewInit {
  testeModalRef: BsModalRef;     
  @ViewChild('testeModal') testeModal;  

  public loading = false;
  public listaAssociados: Associado[] = [];
  public associado: Associado = new Associado();
  editing=false;  
  view = 'main';
  permissions: Permissions = new Permissions();
  pg: number = 0;
  deleteId: number = 0;

  searchForm = this.fb.group({    
    nome: [''],
    funcional: [''],
    cpf:[''],
    atividade:['true']
  });

  constructor(
    private associadoServico: AssociadoService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private pagerService: PagerService,
    private fb: FormBuilder,
    private modalService: ModalService,
   
    ) {       
  }
  required: boolean = false;
  //PAGINAÇÃO
  pager: any = {};  
  pagedItems: any[];
  id:0;
  idpai:0;
  iddependente=0;

  Edit=function(id)
  {       
    this.editing=true;   
    this.view='cadastro';         
    this.id=id;
    
  }
  
  EditDependente=function(iddep)
  {
    
    this.iddependente=iddep;
    this.editing=true;  
    
    this.idpai=this.id;
    this.view='novo_dependente'; 
    
  }

  ChangeView=function($event)
  {       
    if ($event=='list') {
      this.editing=false;
      this.view='main';
      this.setPage(this.pg);
    }
    else if ($event=='cadastro')
    {
      this.editing=true;
      this.view='cadastro';
    }
    else if ($event=='IncluirDependente')
    {
      
      this.editing=true;
      this.idpai=this.id;
      this.view='novo_dependente';
    }
  }


  Delete=function(id)
  {
    this.deleteId = id;
    $('#deleteModal').modal('show');
  }

  ConfirmDelete=function()
  {    
    this.associadoServico.delete(this.deleteId).subscribe(p=>
    {
      this.setPage(this.pg);
    });
  }  
  ngOnInit() {     
    this.loading = true;
    this.associado.ativo = true;       
    this.authService.verificarPermissao('Grupos').then(c => {      
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);

  }
  ngAfterViewInit()
  {
   
  }

  private handleError() {
    location.href = '/login';
  }

 

  setPage(page: number) {
  
    this.loading = true;
    this.loading = true;
    this.pg = page;
    this.listaAssociados = [];  
    
    var nome = this.searchForm.controls["nome"].value;
    var funcional = this.searchForm.controls["funcional"].value;
    var cpf = this.searchForm.controls["cpf"].value;
    var ativo = this.searchForm.controls["atividade"].value;

    this.associadoServico.getAll(funcional,nome, ativo,cpf, page).subscribe(c => {            
        this.loading = false;
        this.listaAssociados = c.items; 
        const totalRecords = c.totalItems;

        if(c.items.length > 0) {
          this.required = false;
        } 
        else {
            this.required = true;
        }   
        
      // get pager object from service
      this.pager = this.pagerService.getPager(totalRecords, page , 10);
      // get current page of items
      this.pagedItems = c.items.sort();
      console.log(this.pagedItems)
      });
    }

  onSubmit() {     
    this.setPage(1);
  }

  openModal() {
    this.modalService.modalPagamentos(
      'Pagamento Churrasqueira', 
      'Teste Corpo');
  }
}

export class Permissions {
  btnCadastrar: boolean;
}
