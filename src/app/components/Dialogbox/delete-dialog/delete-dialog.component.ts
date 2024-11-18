import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from "@angular/material/dialog";

@Component({
  selector: "app-delete-dialog",
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatDialogTitle,
  ],
  templateUrl: "./delete-dialog.component.html",
  styleUrl: "./delete-dialog.component.css",
})
export class DeleteDialogComponent {}
