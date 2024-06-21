export class Game {
    public players: string[] = [];
    public stack: string[] = [];
    public playedCards: string[] = [];
    public currentPlayer: number = 0;
    public pickCardAnimation = false;
    public currentCard: string = '';



    constructor() {
        for (let i = 1; i < 14; i++) {
            this.stack.push('hearts_' + i),
                this.stack.push('ace_' + i),
                this.stack.push('clubs_' + i),
                this.stack.push('diamonds_' + i)
        }
        this.shuffle(this.stack);
    }


    // Fisher-Yates Shuffle Algorithmus
    private shuffle(array: string[]): void {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    public toJSON() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard
        }
    }
}