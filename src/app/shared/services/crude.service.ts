import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  QuerySnapshot,
} from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class CrudeService {
  public getUser(email: string): Observable<QuerySnapshot<unknown>> {
    return this.afs
      .collection(`users`, (ref) => ref.where('email', '==', email))
      .get();
  }
  public updateUser(user: User) {
    return this.afs.doc(`users/${user.uid}`).update(user);
  }
  public getUsers() {
    return this.afs.doc('users').get();
  }
  public deleteUser(email: string) {
    this.getUser(email).subscribe((user: any) => {
      user = user.docs[0].data();
      this.afs
        .doc(`users/${user.uid}`)
        .delete()
        .then((a) => {  
          return (window.location.href = '/logout');
        });
    });
  }
  constructor(private afs: AngularFirestore) {}
}
