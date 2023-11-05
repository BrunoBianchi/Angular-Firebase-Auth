import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afs:AngularFirestore,public afAuth:AngularFireAuth) { }
  public singIn(email:string,password:string) {
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }
  public loggedIn():boolean {
    return !!localStorage.getItem('user');
  }
  public sendVerificationEmail() {
    return this.afAuth.currentUser.then((u:any)=>{
      console.log(u);
      u.sendEmailVerification();
    })
   }

  public signUp(email:string,password:string) {
    this.afAuth.createUserWithEmailAndPassword(email,password).then((result:any)=>{
      localStorage.setItem('user',JSON.stringify(result.user));
      this.sendVerificationEmail();
      return result.user;
    }).catch((err:any)=>{
      if(err) return err.message;
    })
  }
}
