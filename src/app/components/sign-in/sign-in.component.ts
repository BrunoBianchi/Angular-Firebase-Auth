import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  public errorMsg!: string;
  public profileForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  public signIn() {
    if (this.profileForm.valid) {
      this.auth
        .singIn(
          this.profileForm.value['email'],
          this.profileForm.value['password']
        )
        .then((result: any) => {
          this.afs
            .doc(`users/${result.user.uid}`)
            .get()
            .subscribe(async (user) => {
              await localStorage.setItem(
                'user',
                JSON.stringify({
                  uid: user.get('uid'),
                  email: user.get('email'),
                  name: user.get('name'),
                  photoURL: user.get('photoURL'),
                  emailVerified: user.get('emailVerified'),
                })
              );
              return this.router.navigate(['dashboard']);
            });
        })
        .catch((err: any) => {
          if (err) return (this.errorMsg = err.message);
        });
    }
  }

  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore
  ) {}
}
