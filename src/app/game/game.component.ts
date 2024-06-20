import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, doc, docData, addDoc } from '@angular/fire/firestore';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  firestore: Firestore = inject(Firestore);

  pickCardAnimation = false;
  currentCard: string = '';
  game!: Game;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private gameService: GameService) {}

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.subscribeToGame(params['id']);
    });
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
      console.log(this.game);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }

  async addGame(game: { game: string }) {
    try {
      const docRef = await addDoc(this.gameService.getGameRef(), game);
      console.log("Document written with ID: ", docRef.id);
    } catch (err) {
      console.error("Error adding document: ", err);
    }
  }

  subscribeToGame(gameId: string) {
    const gameDocRef = this.gameService.getSingleDocRef('games', gameId);
    const game$ = docData(gameDocRef) as Observable<Game>;
    game$.subscribe((game: any) => {
      console.log('Game update', game);
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.stack = game.stack;
    });
  }

  
}
