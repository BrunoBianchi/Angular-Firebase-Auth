import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public errorMsg!:string;
  public user:any;
public profileForm: FormGroup = this.formBuilder.group({
 email:['',[Validators.required,Validators.email]],
 password:['',[Validators.required]],
})
public signUp(){ 
  if(this.profileForm.valid) {
 this.user = this.auth.signUp(this.profileForm.value['email'],this.profileForm.value['password']);
 console.log(this.user);
 this.router.navigateByUrl('/');
}
}
constructor(public auth:AuthService,private formBuilder:FormBuilder,public router:Router) { }
}
