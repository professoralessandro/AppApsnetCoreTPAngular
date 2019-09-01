
import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormArray, ValidationErrors } from '@angular/forms';
import { AssociadoService } from 'src/app/services/associados.service';
import { HelperService } from '@app/services/helper.service'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Associado } from '@app/models/Associado';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DeclareFunctionStmt } from '@angular/compiler';
import { rootRenderNodes } from '@angular/core/src/view';
import { AssociadoBloqueio } from '@app/models/AssociadoBloqueio';

declare var $: any;
declare var parent: any;

@Component({
  selector: 'app-cadastro-dependente',
  templateUrl: './dependentes-cadastro.component.html',
  styleUrls: ['./dependentes-cadastro.component.scss']
})
export class DependentesCadastroComponent implements OnInit, AfterViewInit {
  public editMode = false;  
  public imagePath;
  public message: string;
  infoBloqueio: AssociadoBloqueio;
  private _idrecord: number;
  justificativaBloqueio: string
  get idrecord(): number {    
    return this._idrecord;
  }

  
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Apenas imagens são permitidas";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => {       
      this.imgURL = reader.result; 
    }
  }

  OpenFile=function()
  {
   var t= document.getElementById('fileAvatar');
   t.click();
  }  
  
  @Input()
  set idrecord(id: number) {    
    this._idrecord = id;       
    this.LoadData(id); 
    
  }


  private _idpai: number;
  get idpai(): number {    
    return this._idpai;
  }
  
  @Input()
  set idpai(idp: number) {    
    this._idpai = idp;           
  }
  
  SexoChange=function($event)
  {    
   this.sexofm= this.f['sexo'].value;
  }

  @Output() ChangeView = new EventEmitter<string>();

  imgURL: any;  
  titulo: string;  
  submitted: boolean;  
  sexofm='M';
  mensagem=null;  
  loading=false;


  get f() { return this.edithForm.controls; }
  GoList=function()
  {     
    this.ChangeView.emit('cadastro');

  }
  
  
  ngAfterViewInit()
  {
    
   
  }


  edithForm = this.fb.group(
    {    
    associadoId: ['0'],        
    nrFuncional: [''],
    nome: ['', Validators.required],
    email: ['',Validators.email],        
    dataNascimento: [null],
    sexo: ['M'],
    tipoPessoa:[''],
    codTitular:[''],
    sequenciaDependente:[''],
    estadoCivil: [''],
    associadoIdPai:[''],
    dtInicioFeriasLicensa: [null],
    tipoDocumento: [''],
    cpf: ['',Validators.required],
    codDepartamento:[''],
    departamento: [''],    
    localTrabalho: [''],
    poloAdministrativo: [''],
    codEmpresa: [''],
    indFolha: [''],
    banco: [''],
    agencia: [''],
    contaCorrente: [''],
    contaCorrenteDig: [''],
    imagem: [''],
    telefone: [''],
    senha: [''],
    trocaSenha: [''],
    bloqueado: ['false'],
    dataInclusao: [new Date()],
    dataUltimaAlteracao: [new Date()],
    dataUltimaTrocaSenha: [new Date()],
    dataUltimoLogin:[new Date()],
    ativo: ['true'],
    primeiroAcesso: [''],
    statusAprovacaoId: [''],
    faixaSalarial: [''],
    exibeTourInscricao: ['true'],
    tipoDependente: [''],
    exibeTourIngresso: ['true'],
    permiteEmailComunicacoes: ['true'],
    origemBanco: [''],
    associadosDocumentos: [''],
    associadosFluxo: [null],
    bloqueioPrimeiroAcesso: [''],
    eventosInscricoes: [''],
    examesAssociadosVisitantes: [''],
    lancamentos: [''],
    dependentes: [],
    infoBloqueio:null
  });

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private associadoService: AssociadoService,
    private help: HelperService
  ) { 

    parent=this;
  }

  
  getFormValidationErrors() {
    Object.keys(this.edithForm.controls).forEach(key => {  
    const controlErrors: ValidationErrors = this.edithForm.get(key).errors;
    if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
          });
        }
      });
    }


  LoadData=function(idc)
  {  
    
    if (idc>0)
    {              
      this.editMode = true;      
      this.titulo="Alterar registro de dependente";
      this.loading=true;      
      this.associadoService.getId(idc).subscribe(x => {    
        try {
          if (x.infoBloqueio!=null) {
            var dt=new Date(x.infoBloqueio.dataBloqueio);
            var dt2=new Date(x.infoBloqueio.dataDesbloqueio);
            this.bloqueioDe=this.help.ToDateInput(dt);
            this.bloqueioAte=this.help.ToDateInput(dt2);
          
          }
        }
        catch{
          
        }
        var dt=new Date(x.dataNascimento);       
        x.dataNascimento=this.help.ToDateInput(dt);

       this.edithForm.setValue(x);
       this.loading=false;
       
      });
    }
    else
    {      
      this.titulo="Incluir Dependente";
      this.editMode=false;      
    }     
  }

  
  onSubmit() {     
    
    this.loading=true;           
    var jsonx=this.edithForm.value;    
    jsonx.associadoIdPai=this.idpai;
     
    this.submitted=true;    
    
    if (this.edithForm.invalid) {
      this.getFormValidationErrors();
      this.loading=false;
      return;
   }

   delete jsonx.senha;
   delete jsonx.trocaSenha;
   delete jsonx.dataUltimoLogin;

    if (jsonx.associadoId>0)
    {      
      console.log("DEPENDENTE EDITADO:", jsonx);
      this.associadoService.edit(jsonx).subscribe(p=>{       
        this.mensagem="Registro atualizado com sucesso !";

        setTimeout(() => {          
          this.GoList();
        }, 2000);  

      });
    }
    else {      
       this.associadoService.insert(jsonx).subscribe(p=>{
          this.mensagem="Registro incluído com sucesso !";
          setTimeout(() => {          
            this.GoList();
          }, 2000);                       
      },
      error=>
      {
        console.log(error);
        this.mensagem=error.error;
        this.loading=false;
      });
    }
    
  }  


  GetField=function(field: string)
  {    
    return this.f[field].value;
  }
  
   
  ngOnInit() {    

   
    
  }

}

