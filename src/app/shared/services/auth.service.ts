import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) {}

  static logout() {
    localStorage.removeItem('user');
  }
  public singIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  static loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  public setUserData(user:any) {
    const userData:User = {
      uid:user.uid,
      email:user.email,
      name:user.displayName,
      photoURL:user.photoURL,
      emailVerified:user.emailVerified
    }
    const userRef:AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    return userRef.set(userData,{merge:true});
  }
  public sendVerificationEmail() {
    return this.afAuth.currentUser.then((u: any) => {
      u.sendEmailVerification();
    });
  }

  public signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
