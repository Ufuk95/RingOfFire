import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CommonModule
  ],
})
export class DialogAddPlayerComponent {

  name: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogAddPlayerComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
