import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  game!: Game;

  constructor(private gameService: GameService, private router: Router
  ){

  }

  newGame(){
    let game = new Game();
    this.gameService.addGame(game.toJSON());
  }
}
