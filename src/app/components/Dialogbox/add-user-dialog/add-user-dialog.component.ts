import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  input,
  signal,
} from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatIconModule } from "@angular/material/icon";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-add-user-dialog",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIcon,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./add-user-dialog.component.html",
  styleUrl: "./add-user-dialog.component.css",
})
export class AddUserDialogComponent {
  hide = signal(true);

  constructor(@Inject(MAT_DIALOG_DATA) public data: { action: string }) {} //@Inject(MAT_DIALOG_DATA) is a decorator that tells Angular to inject MAT_DIALOG_DATA into the data parameter.

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
