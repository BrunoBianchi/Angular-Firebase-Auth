import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudeService } from 'src/app/shared/services/crude.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
})
export class VerifyEmailComponent implements AfterContentInit, OnInit {
  public user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') || '')
    : null;
  public countdown: number = 10;
  public disable: boolean = false;
  public msg!: string;
  public errorMsg!: string;
  public btnMsg: string = 'Reenviar email';
  public reenviarEmail() {
    if (!this.disable) {
      this.auth.sendVerificationEmail();
      this.msg =
        'Email enviado com sucesso! Ele Devera chegar em alguns instantes.';
      this.disable = true;
      this.delay();
    }
  }
  ngAfterContentInit(): void {
    this.disable = true;
    this.delay();
  }
  ngOnInit(): void {
    this.router.queryParams.subscribe((params) => {
      if (params['email']) {
        this.crude.getUser(params['email']).subscribe((user: any) => {
          user = user.docs[0].data();
          this.afAuth.currentUser.then((u: any) => {
            if (u.uid == user.uid && !user.emailVerified) {
              user.emailVerified = true;
              localStorage.setItem('user', JSON.stringify(user));
              this.crude
                .updateUser(user)
                .then((a) => {
                  window.location.href = '/dashboard';
                })
                .catch((err) => {
                  this.errorMsg = err.message;
                });
            } else {
              this.errorMsg = 'Usuario ja verificado ou email invalido!';
            }
          });
        });
      } 
    });
  }
  private delay() {
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

  constructor(
    public auth: AuthService,
    private router: ActivatedRoute,
    private crude: CrudeService,
    private afAuth: AngularFireAuth
  ) {}
}
