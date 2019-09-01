import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
// tslint:disable-next-line: directive-selector
    selector: '[requiredIf]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: RequiredIfDirective, multi: true }
    ]
})
export class RequiredIfDirective implements Validator {
    // tslint:disable-next-line: no-input-rename
    @Input('requiredIf')
    requiredIf: boolean;

    validate(c: AbstractControl) {

        const value = c.value;
        if ((value == null || value === undefined || value === '') && this.requiredIf) {
            return {
                requiredIf: { condition: this.requiredIf }
            };
        }
        return null;
    }

}