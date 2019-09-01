import { Injectable } from '@angular/core';
import { isUndefined, isNull } from 'util';

@Injectable()

export class CommonService {

    SomenteNumeros(obj: any) {
        if (isNaN(obj.value)) {
            obj.value = '';
        }
    }
    //MASKARA DE CPF E CNPJ
    cpfCnpjMask(value: any)
    {
        var numberLength = 0;
        if (value)
        {
          numberLength = value.join('').length;
        }
        if (value.length <= 11) {
          return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
        } else {
          return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
        }
    }
    

    strIsInvalid(value: any) {
        if (isUndefined(value) || value.trim() === '') { return true; }

        return false;
    }

    MascaraData(obj: any) {
        if (isNull(obj)) {
            return;
        }

        const dataInicio: number = obj.value.toString().replace('/', '').replace('/', '');
        if (isNaN(dataInicio)) {
            obj.value = '';
            return;
        }

        if (dataInicio.toString().length > 2 && dataInicio.toString().length < 5) {
            obj.value = dataInicio.toString().slice(0, 2) + '/' + dataInicio.toString().slice(2, dataInicio.toString().length);
        } else if (dataInicio.toString().length > 4) {
// tslint:disable-next-line: max-line-length
            obj.value = dataInicio.toString().slice(0, 2) + '/' + dataInicio.toString().slice(2, 4) + '/' + dataInicio.toString().slice(4, dataInicio.toString().length);
        } else {
            obj.value = obj.value.toString().replace('/', '');
        }
    }

    MascaraValor(obj: any) {
        const novoValor: number = obj.value.toString().replace(',', '').replace(',', '');

        if (isNaN(novoValor)) {
            obj.value = '';
            return;
        }

        if (novoValor.toString().length > 2) {
            // tslint:disable-next-line: max-line-length
            obj.value = novoValor.toString().slice(0, novoValor.toString().length - 2) + ',' + novoValor.toString().slice(novoValor.toString().length - 2, novoValor.toString().length);
        } else {
            obj.value = obj.value.toString().replace(',', '');
        }
    }

    MascaraHora(obj: any) {
        const novoValor: number = obj.value.toString().replace(',', '').replace(',', '');

        if (isNaN(novoValor)) {
            obj.value = '';
            return;
        }

        if (novoValor.toString().length > 3) {
// tslint:disable-next-line: max-line-length
            obj.value = novoValor.toString().slice(0, novoValor.toString().length - 2) + ':' + novoValor.toString().slice(novoValor.toString().length - 2, novoValor.toString().length);
        } else {
            obj.value = obj.value.toString().replace(',', '');
        }
    }

    MascaraCEP(obj: any) {
        const cep: number = obj.value.toString().replace('-', '');
        if (isNaN(cep)) {
            obj.value = '';
            return;
        }

        if (cep.toString().length > 5) {
            obj.value = cep.toString().slice(0, 5) + '-' + cep.toString().slice(5, cep.toString().length);
        } else {
            obj.value = obj.value.toString().replace('-', '');
        }
    }

    ValidarData(obj: any) {

    }
}
