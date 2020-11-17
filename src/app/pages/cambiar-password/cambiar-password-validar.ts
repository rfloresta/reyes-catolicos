
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CambiarPasswordValidar {
  static shouldBe1234(control: AbstractControl) : Promise<ValidationErrors | null> {
    return new Promise((resolve,reject) => {
        if(control.value !== '1234')
          resolve({ shouldBe1234: true });
        else 
          resolve(null);
    });    
  }

  static matchPwds(control: AbstractControl) {
    let newPwd2 = control.get('passwordNuevo');
    let confirmPwd2 = control.get('confirmar');
    if(newPwd2.value !== confirmPwd2.value){
      return { pwdsDontMatch: true };
    }
    return null;
  }
}