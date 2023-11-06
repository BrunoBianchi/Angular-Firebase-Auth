import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afs: AngularFirestore, private afAuth: AngularFireAuth) {}

  static logout() {
    localStorage.removeItem('user');
  }
  public singIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  static loggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
  public async setUserData(user: any) {
    const userData: User = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    await this.afs
      .doc(`users/${user.uid}`)
      .set(userData, { merge: true })
      .then((a) => console.log(a))
      .catch((err) => console.log(err));
  }
  public sendVerificationEmail() {
    return this.afAuth.currentUser.then((u: any) => {
      u.sendEmailVerification();
    });
  }

  public signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
  public forgotPassword(email: string) { 
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
