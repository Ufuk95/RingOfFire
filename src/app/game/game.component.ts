import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit{
  pickCardAnimation = false;
  game: Game = new Game();


  ngOnInit(): void {
    this.newGame();
  }

  newGame(){
    console.log(this.game)
  }

  takeCard(){
    this.pickCardAnimation = true;
  }
}
