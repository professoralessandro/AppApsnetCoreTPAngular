import { Component, OnInit } from '@angular/core';
import { LocaisAcessoService } from 'src/app/services/locais-acesso.service';
import { LocaisAcesso } from 'src/app/models/LocaisAcesso';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';
import { Sedes } from 'src/app/models/Sedes';
import { isUndefined } from 'util';
import { Exames } from 'src/app/models/Exames';
import { LocaisAcessoTaxas } from 'src/app/models/LocaisAcessoTaxas';
import { LocaisAcessoExames } from 'src/app/models/LocaisAcessoExames';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { InstantiateExpr } from '@angular/compiler';
import { DebugRenderer2 } from '@angular/core/src/view/services';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-editar-local-acesso',
  templateUrl: './editar-local-acesso.component.html',
  styleUrls: ['./editar-local-acesso.component.scss']
})
export class EditarLocalAcessoComponent implements OnInit {
public loading = false;
permissions: Permissions = new Permissions();

  constructor(private locaisAcessoService: LocaisAcessoService,
              private sedesServico: SedeService,
              private router: ActivatedRoute,
              private alertService: AlertService,
              private authService: AuthenticationService,
              private commonService: CommonService
              ) { }

  ngOnInit() {
    this.loading = true;
    this.locaisAcesso.localAcessoId = 0,
    this.locaisAcesso.sedeId,
    this.locaisAcesso.descricao = '',
    this.locaisAcesso.chave = '';
    this.locaisAcesso.valortaxa = '',
    this.locaisAcesso.qtdMaxVisitante = 0,
    this.locaisAcesso.ativo = true;
    this.locaisAcesso.idadeMinima = 0,
    this.locaisAcesso.idadeMaxima = 0,
    this.locaisAcesso.qtdMaxPorColaborador = 0,
    this.isNew = true;

    this.authService.verificarPermissao('Grupos').then(c => { 
    this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null && c.get('id').toString() != `0`) {

        this.locaisAcessoService.getAll(Number(c.get('id')), null, '', true, ).subscribe(x => {
          
          this.locaisAcesso = x[0];
          this.locaisAcesso.localAcessoId = Number(c.get('id'));
          this.isNew = false;
          
          this.carregaSedes();

          this.locaisAcessoService.getLocaisExames(Number(c.get('id'))).subscribe(x => {
            this.locaisAcessoService.getAllExames().subscribe(y => {
              this.lstExames = x;
              this.lstAllExames = y;
              this.intersectExames();
              this.loading = false;
            });
          });

          this.locaisAcessoService.getLocaisTaxas(Number(c.get('id'))).subscribe(x => {
            this.lstTaxas = x;
          });

          let localAcesso: any = this.locaisAcesso;
          if(localAcesso.valorTaxa == 0)
          {
             this.erro = true;
             this.mensagem = `Sem taxa vigente cadastrada para o local de acesso 'Piscina'.`; 
          } 
        });
      }
      else{
        this.isNew = true;
        this.locaisAcesso.ativo = true;
        this.habilitaInsercao();
        this.locaisAcesso = new LocaisAcesso();

        this.locaisAcessoService.getAllExames().subscribe(y => {
          this.lstAllExames = y;
          if(this.lstAllExames.length == 0){
            this.exibirBotaoIncluir = false;
          }
          else{
            this.exibirBotaoIncluir = true;
          }          
        });

        this.carregaSedes();
      }
    });

    if(this.isNew){
      this.locaisAcesso.ativo = true;
    }    

    this.itemQuantity = Array(99).fill(0).map((x, i) => i + 1);
  }

  private handleError() {
    location.href = '/login';
  }

  public locaisAcesso: LocaisAcesso = new LocaisAcesso();
  public lstExames: LocaisAcessoExames[] = [];
  public lstTaxas: LocaisAcessoTaxas[] = [];
  public lstAllExames: Exames[] = [];
  public sedes: Sedes[] = [];
  public itemQuantity = [];
  public isNew = true;

  public desabilitarCamposInsercao: boolean = true;
  public required: boolean;
  public success: boolean;
  public exibirBotaoIncluir: boolean = true;
  public erro: boolean;
  public mensagem: string;
  public selected: number;
  public taxaCss: string = '';
  public exameCss: string = 'active panevalores';
  public exibirTabExame: boolean = true;
  public exibirTabTaxa: boolean = false;
  public formularioPrincipal: boolean = true;
  public incluirExame: boolean = false;
  public incluirTaxa: boolean = false;
  public deletarExame: boolean = false;
  public confirmarDelecao: boolean = false;
  public taxaIdParaDelecao: number = 0;
  public exameIdParaDelecao: number = 0;
  public valorTaxaMsgDelecao: string = '';
  public dataVigenciaTaxaMsgDelecao: string = '';


  habilitaInsercao()
  {
    this.desabilitarCamposInsercao = false;
  }

  intersectExames()
  {
    for(let i = 0; i < this.lstExames.length; i++)
    {
      for(let j = 0; j < this.lstAllExames.length; j++)
      {
        let e1 : any = this.lstAllExames[j];
        let e2 : any = this.lstExames[i];

         if(e1.exameId == e2.exameId)
         {
            this.lstAllExames.splice(j, 1);
         }
      }
    }
  }

  editarLocalAcesso() {
    if (this.isNew) {
      this.locaisAcessoService.insert(this.locaisAcesso).subscribe(c => {
        this.alertService.success('Registro inserido com sucesso.');
      });
    } else {
      this.locaisAcessoService.edit(this.locaisAcesso).subscribe(c => {
        this.alertService.success('Registro atualizado com sucesso.');
      });
    }
  }

  tabExame()
  {
    this.taxaCss = '';
    this.exameCss = 'active panevalores';

    this.exibirTabExame = true;
    this.exibirTabTaxa = false;
  }

  tabTaxa()
  {
    this.taxaCss = 'active panevalores';
    this.exameCss = '';

    this.exibirTabExame = false;
    this.exibirTabTaxa = true;
  }

  IncluirExame(){
    this.formularioPrincipal = false;
    this.incluirExame = true;
    this.incluirTaxa = false;

    this.required = false;
    this.success = false;
    this.erro = false;
  }

  IncluirTaxa(){
    this.formularioPrincipal = false;
    this.incluirExame = false;
    this.incluirTaxa = true;

    this.required = false;
    this.success = false;
    this.erro = false;
  }

  Voltar(){
    this.formularioPrincipal = true;
    this.incluirExame = false;
    this.incluirTaxa = false;

    this.required = false;
    this.erro = false;

    if(isUndefined(this.lstAllExames) || this.lstAllExames.length == 0){
      this.exibirBotaoIncluir = false;
    }
    else{
      this.exibirBotaoIncluir = true;
    }

    let localAcesso: any = this.locaisAcesso;
    if(localAcesso.valorTaxa == 0 && this.success == false)
    {
       this.erro = true;
       this.mensagem = `Sem taxa vigente cadastrada para o local de acesso 'Piscina'.`; 
    } 
  }

  Mascara(){
    this.commonService.SomenteNumeros(document.getElementById('txtQtdVisitantes'));
    this.commonService.SomenteNumeros(document.getElementById('txtQtdAssociados'));
    this.commonService.MascaraData(document.getElementById('txtDataInicio'));
    this.commonService.MascaraValor(document.getElementById('txtValorTaxa'));
    this.commonService.MascaraValor(document.getElementById('txtNovoValor'));
  }

  carregaSedes() {
    this.sedesServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;

      let selecione: Sedes = new Sedes();
      selecione.ativo = true;
      selecione.sedeId = -1;
      selecione.titulo = "Selecione...";

      this.sedes.splice(0, 0, selecione);
      this.loading = false;
      if(this.isNew) {
        this.locaisAcesso.sedeId = -1;
      }
    });
  }

  Validar()
  {
    this.required = false;
    this.success = false;
    this.erro = false;

    if(isUndefined(this.locaisAcesso.descricao) || this.locaisAcesso.descricao.toString().trim() == '')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Informe uma descrição para o Local de Acesso!\n`;
    }

    if(isUndefined(this.locaisAcesso.qtdMaxVisitante) || this.locaisAcesso.qtdMaxVisitante.toString().trim() == '')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Informa a quantidade máxima de pessoas!\n`;
    }

    if(isUndefined(this.locaisAcesso.qtdMaxPorColaborador) || this.locaisAcesso.qtdMaxPorColaborador.toString().trim() == '')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Informa a quantidade máxima de visitantes por colaborador!\n`;
    }

    if(isUndefined(this.locaisAcesso.sedeId) || this.locaisAcesso.sedeId.toString().trim() == '-1')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Informe a Unidade do Local de Acesso!\n`;
    }

    if(!this.required){
      return true;
    }
    else{
      return false;
    }
  }

  ValidarTaxa()
  {
    this.required = false;
    this.success = false;
    this.erro = false;
    this.mensagem = ``;

    let txtNovoValor: any = document.getElementById('txtNovoValor');
    let txtDataInicio: any = document.getElementById('txtDataInicio');

    var today = new Date();
    var _dataInicio = new Date(txtDataInicio.value.toString().trim());

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    if(txtNovoValor.value.toString().trim() == '')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Informe um valor.\n`;
    }

    if(txtDataInicio.value.toString().trim() == '')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Informe a data de inicio de vigência.\n`;
      return false;
    }

    if(txtDataInicio.value.toString().trim().length < 10)
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Data inválida.\n`;
      return false;
    }

    if((today.getMonth() + 1) > 12 && isNaN(Date.parse(txtDataInicio.value.toString().trim())))
    {
      this.required = true;
      if(isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem += `Data inválida.\n`;
      return false;
    }

    if(txtDataInicio.value.toString().trim().length == 10)
    {
      if(_dataInicio < today)
      {
        this.required = true;
        if(isUndefined(this.mensagem))
          this.mensagem = '';

        this.mensagem += `Não é possível iniciar um valor vigente com uma data retroativa.\n`;
        return false;
      }
    }

    if(!this.required){
      return true;
    }
    else{
      return false;
    }
  }

  cadastrarLocalAcesso()
  {
    this.loading = true;
    this.mensagem = '';

    if(this.Validar()){
      if (this.isNew) {
        this.locaisAcesso.ativo = true;
        this.locaisAcessoService.insert(this.locaisAcesso).subscribe(c => {
          this.mensagem = `Registro inserido com sucesso.`;
          this.isNew = false;
          this.success = true;
          this.loading = false;
          this.locaisAcesso.localAcessoId = c.localAcessoId;

          this.CadastrarExames(this.locaisAcesso.localAcessoId);
          this.CadastrarTaxas(this.locaisAcesso.localAcessoId);
        });
      } else {
        this.locaisAcessoService.edit(this.locaisAcesso).subscribe(c => {
          this.mensagem = `Registro atualizado com sucesso.`;
          this.success = true;
          this.loading = false;

          this.locaisAcesso.localAcessoId = c.localAcessoId;

          this.CadastrarExames(this.locaisAcesso.localAcessoId);
          this.CadastrarTaxas(this.locaisAcesso.localAcessoId);
        });
      }
    }
    else
    {
      this.loading = false;
    }
  }

  CadastrarExames(localAcessoId: number)
  {
    if(this.isNew == false){
      this.locaisAcessoService.deleteLocaisAcessoExames(this.locaisAcesso.localAcessoId).subscribe(c => {
        for(let i = 0; i < this.lstExames.length; i++)
        {
          this.lstExames[i].LocalAcessoId = this.locaisAcesso.localAcessoId;
          this.locaisAcessoService.insertLocaisAcessoExames(this.lstExames[i]).subscribe(c => {
          });      
        }
      });
    }
    else{
      for(let i = 0; i < this.lstExames.length; i++)
      {
        this.locaisAcessoService.insertLocaisAcessoExames(this.lstExames[i]).subscribe(c => {
        });      
      }      
    }
  }

  CadastrarTaxas(localAcessoId: number)
  {
    if(this.isNew == false){
      this.locaisAcessoService.deleteLocaisAcessoTaxas(this.locaisAcesso.localAcessoId).subscribe(c => {
        for(let i = 0; i < this.lstTaxas.length; i++)
        {
          debugger;
          this.lstTaxas[i].localAcessoId = this.locaisAcesso.localAcessoId;
          this.locaisAcessoService.insertLocaisAcessoTaxas(this.lstTaxas[i]).subscribe(c => {
          });      
        }
      });
    }
    else {
      for(let i = 0; i < this.lstTaxas.length; i++)
      {
        debugger;
        this.lstTaxas[i].localAcessoId = this.locaisAcesso.localAcessoId;
        this.locaisAcessoService.insertLocaisAcessoTaxas(this.lstTaxas[i]).subscribe(c => {
        });      
      }
    }
  }

  SalvarExame()
  {
    for(let i = 0; i < this.lstAllExames.length; i++)
    {
      let exame: any = this.lstAllExames[i];
      if(exame.exameLocalAcesso == true)
      {
          debugger;
          let novoExame: any = new LocaisAcessoExames();

          novoExame.exameId = exame.exameId;
          novoExame.impedeEntrada = exame.ImpedeEntrada;
          novoExame.localAcessoId = this.locaisAcesso.localAcessoId;
          novoExame.nomeExame = exame.descricao;
          this.lstExames.push(novoExame);

          this.lstAllExames.splice(i, 1);
          i--;
      }
    }

    this.mensagem = `Exame adicionado com sucesso.`;
    this.success = true;

    this.required = false;
    this.erro = false;

    this.Voltar();
  }

  SalvarTaxa()
  {
    if(this.ValidarTaxa()){
      let txtNovoValor: any = document.getElementById('txtNovoValor');
      let txtDataInicio: any = document.getElementById('txtDataInicio');

      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();

      var ddInicio = txtDataInicio.value.toString().slice(0, 2); //String(txtDataInicio.value).padStart(2, '0');
      var mmInicio = txtDataInicio.value.toString().slice(3, 5); //String(txtDataInicio).padStart(2, '0'); //January is 0!
      var yyyyInicio = txtDataInicio.value.toString().slice(6, 10);

      let lat: LocaisAcessoTaxas = new LocaisAcessoTaxas();

      lat.valorTaxaFormatado = txtNovoValor.value;
      lat.valor = txtNovoValor.value;

      lat.dataInicioFormatado = txtDataInicio.value;

      let user: any = JSON.parse(localStorage.getItem('currentUser'));
      lat.usuarioResponsavel = user.user.nome;

      lat.dataInicio = new Date(yyyyInicio, mmInicio, ddInicio, 0, 0, 0, 0);
      lat.dataInativacao = new Date(mm + '/' + dd + '/' + yyyy);
      lat.dataInclusao = new Date(mm + '/' + dd + '/' + yyyy);
      //lat.usuarioIdInativacao = user.user.usuarioId;
      lat.usuarioIdAlteracao = user.user.usuarioId;
      lat.usuarioIdInclusao = user.user.usuarioId;
      lat.ativo = true;
      this.mensagem = `Valor de taxa para Local de Acesso atualizado com sucesso.`;
      this.success = true;

      this.lstTaxas.push(lat);

      this.required = false;
      this.erro = false;

      this.Voltar();
    }
  }

  DeletarTaxa()
  {
    for(let i = 0; i < this.lstTaxas.length; i++)
    {
      let taxaLocalAcesso: any = this.lstTaxas[i];
      if(taxaLocalAcesso.localAcessoValorId == this.taxaIdParaDelecao){
        debugger;
        let taxa: any = new LocaisAcessoTaxas();

        this.lstTaxas.splice(i, 1);

        this.required = false;        
        this.erro = false;
        this.confirmarDelecao = false;
    
        this.success = true;
        this.formularioPrincipal = true;
        this.mensagem = `Taxa removida com sucesso.`;

        return;
      }
    }
  }

  Deletar(isExame: boolean){
    
    if(!this.deletarExame)
    {
      this.DeletarTaxa();
      return;
    }

    for(let i = 0; i < this.lstExames.length; i++)
    {
      let exameLocalAcesso: any = this.lstExames[i];
      if(exameLocalAcesso.exameId == this.exameIdParaDelecao){
        debugger;
        let exame: any = new Exames();

        exame.exameId = exameLocalAcesso.exameId;
        exame.localAcessoId = exameLocalAcesso.localAcessoId;
        exame.descricao = exameLocalAcesso.nomeExame;
        exame.impedeEntrada = false;
        exame.exameLocalAcesso = false;

        this.lstExames.splice(i, 1);
        this.lstAllExames.push(exame);

        this.required = false;        
        this.erro = false;
        this.confirmarDelecao = false;
    
        this.success = true;
        this.formularioPrincipal = true;

        this.mensagem = `Exame removido com sucesso.`;

        if(isUndefined(this.lstAllExames) || this.lstAllExames.length == 0){
          this.exibirBotaoIncluir = false;
        }
        else{
          this.exibirBotaoIncluir = true;
        }

        return;
      }
    }
  }

  ConfirmarDelecao(Id: number, isExame: boolean, valor: string, dataVigencia: string)
  {
    if(isExame){
      this.exameIdParaDelecao = Id;
      this.mensagem = `Deseja realmente excluir o exame?`;
    }
    else{
      this.taxaIdParaDelecao = Id;
      this.valorTaxaMsgDelecao = valor;
      this.dataVigenciaTaxaMsgDelecao = dataVigencia;
      this.mensagem = `Deseja realmente excluir o valor ` + valor + `\ncom data de vigência em ` + dataVigencia + `?`;
    }
    
    this.deletarExame = isExame;

    this.formularioPrincipal = false;
    this.incluirExame = false;
    this.incluirTaxa = false;
    this.confirmarDelecao = true;

    this.required = false;
    this.success = false;
    this.erro = true;
  }

  NaoDeletar()
  {
    this.formularioPrincipal = true;
    this.incluirExame = false;
    this.incluirTaxa = false;
    this.confirmarDelecao = false;

    let localAcesso: any = this.locaisAcesso;
    if(localAcesso.valorTaxa == 0)
    {
       this.erro = true;
       this.mensagem = `Sem taxa vigente cadastrada para o local de acesso 'Piscina'.`; 
    } 
    else{
      this.erro = false;
    }

    this.required = false;
    this.success = false;
  }

  Novo()
  {
    let txtDataInicio: any = document.getElementById('txtDataInicio');
    let txtNovoValor: any = document.getElementById('txtNovoValor');

    txtDataInicio.value = '';
    txtNovoValor.value = '';

    this.success = false;
    this.required = false;
  }
}
export class Permissions {
  btnCadastrar: boolean;
}



