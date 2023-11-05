import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  public errorMsg!:string;
public profileForm: FormGroup = this.formBuilder.group({
 email:['',[Validators.required,Validators.email]],
 password:['',[Validators.required]],
})
public signIn(){ 
  if(this.profileForm.valid) {
 this.auth.singIn(this.profileForm.value['email'],this.profileForm.value['password']).then((result:any) =>{
 localStorage.setItem('user',JSON.stringify(result.user));
 return this.router.navigateByUrl('/');
 }).catch((err:any)=>{
  if(err) return this.errorMsg = err.message;
 })
}
}
constructor(public auth:AuthService,private formBuilder:FormBuilder,public router:Router) { }

}
