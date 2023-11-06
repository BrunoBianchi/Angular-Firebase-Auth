import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent {
  public user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : null;
  public countdown: number = 10;
  public disable: boolean =  false;
  public msg!: string;
  public btnMsg: string = 'Reenviar email';
  public reenviarEmail() {
    if (!this.disable) {
      this.auth.sendVerificationEmail();
      this.disable = true;
      let i = setInterval(() => {
        if (this.disable) {
          this.countdown--;
          this.btnMsg = `Aguarde ${this.countdown} s`;
        }
      }, 1000);
      setTimeout(() => {
        this.btnMsg = 'Reenviar email';
        this.disable = false;
        this.countdown = 10;
        clearInterval(i);
      }, 10000);
    }
  }
  constructor(public auth: AuthService) {}
}
