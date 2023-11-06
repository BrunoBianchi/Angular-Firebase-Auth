import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CrudeService } from 'src/app/shared/services/crude.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public errorMsg!: string;
  public user: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!!);
  }
  public profileForm: FormGroup = this.formBuilder.group({
    name: [
      `${JSON.parse(localStorage.getItem('user')!!).name}`,
      [Validators.required],
    ],
  });
  public update() {
    this.user.name = this.profileForm.value['name'];
    this.api
      .updateUser(this.user)
      .then((res: any) => {
        localStorage.setItem('user', JSON.stringify(this.user));
        window.location.reload();
      })
      .catch((err: any) => {
        this.errorMsg = err.message;
      });
  }
  public  deletar() {
    this.afAuth.currentUser.then((user) => { 
      user?.delete();
    })
    this.api.deleteUser(this.user.email);
  }
  constructor(
    private afAuth: AngularFireAuth,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    public router: Router,
    public api: CrudeService
  ) {}
}
