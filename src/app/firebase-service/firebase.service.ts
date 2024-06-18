import { Injectable ,inject } from '@angular/core';
import { Firestore, collectionData, collection, doc, onSnapshot, addDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Game } from '../../models/game';


@Injectable({
  providedIn: 'root'
})

export class FirebaseService {

  firestore: Firestore = inject(Firestore);

  unsubGames;

  constructor() {
    this.unsubGames = onSnapshot(this.getGameRef(), (game) => {
      game.forEach(element => {
        console.log('Game update', element.data())
      })
    });
  }



  ngonDestroy() {
    this.unsubGames();
  }

  async addGame(game: {}){
    await addDoc(this.getGameRef(),game).catch(
      (err) => {console.error(err)}
    ).then(
      (docRef) => {console.log("Document written with ID: ", docRef?.id);}
    )
  }

  // addTestGame() {
  //   const testGameData = { game: 'Testspiel' };
  //   this.addGame(testGameData);
  // } test funktion um zu sehen ob es im firebase auch erscheint.

  

  getGameRef() {
    return collection(this.firestore, 'games');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }

  


}
