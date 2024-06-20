import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { inject } from '@angular/core';
import { Game } from '../models/game';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {}

  addGame(game: Partial<Game>) {
    addDoc(this.getGameRef(), game)
      .then((gameInfo) => {
        console.log("Document written with ID: ", gameInfo.id);
        this.router.navigateByUrl('/game/' + gameInfo.id)
      })
      .catch((err) => {
        console.error("Error adding document: ", err);
      });
  }


  
  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(this.firestore, colId, docId);
  }
}
