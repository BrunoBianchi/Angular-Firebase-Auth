import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public enviado:boolean= false;
  public btnMsg:string = 'Enviar email';
  public errorMsg:string = '';
  public enviarResetPassword(email:string) {
    if(!this.enviado) {
      this.auth.forgotPassword(email).then((res:any)=>{
        this.btnMsg = 'Email enviado!';
        this.enviado = true;
      }).catch((err:any)=>{
        this.errorMsg = err.message;
      })
    }

  }
  constructor(private auth:AuthService) {}
}
