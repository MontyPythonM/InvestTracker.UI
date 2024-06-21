import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { BaseComponent } from '../../../../shared/abstractions/base.component';
import { SystemRole, systemRoles } from '../../../../core/enums/system-role.enum';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-set-role',
  templateUrl: './set-role.component.html',
  styleUrl: './set-role.component.scss'
})
export class SetRoleComponent extends BaseComponent {
  private readonly dialogRef = inject(MatDialogRef<SetRoleComponent>);
  private readonly data = inject<{ userId: string, role: string }>(MAT_DIALOG_DATA);
  private usersService = inject(UsersService);
  selectedRole: string;
  systemRoles: string[] = systemRoles;

  constructor() {
    super();
    this.selectedRole = this.data.role;
  }

  save() {
    this.usersService.setRole(this.data.userId, this.selectedRole as SystemRole).safeSubscribe(this, {
      next: () => {
        this.notifyService.show(`User role changed on ${this.selectedRole}`);
        this.close();
      }
    });
  }

  close = () => this.dialogRef.close();
}
