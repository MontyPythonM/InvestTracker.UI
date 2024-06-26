import { Component, inject } from '@angular/core';
import { SystemRole, systemRoles } from '../../../../core/enums/system-role.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-role',
  template: `
    <app-dialog-container title="Set system role" (save)="save()" (close)="close()">
      <mat-form-field class="field">
        <mat-label>Role</mat-label>
        <mat-select [(value)]="selectedRole">
          <mat-option *ngFor="let role of systemRoles" [value]="role">{{ role }}</mat-option>
        </mat-select>
      </mat-form-field>
    </app-dialog-container>
  `,
  styles: `
    .field {
      width: 400px;
      margin-bottom: 10px;
    }
  `
})
export class SetRoleComponent {
  private readonly dialogRef = inject(MatDialogRef<SetRoleComponent>);
  private readonly data = inject<{ userId: string, role: string }>(MAT_DIALOG_DATA);
  selectedRole: string;
  systemRoles: string[] = systemRoles;

  constructor() {
    this.selectedRole = this.data.role;
  }

  save = () => this.dialogRef.close(this.selectedRole as SystemRole);
  close = () => this.dialogRef.close();
}
