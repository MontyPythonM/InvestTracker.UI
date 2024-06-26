import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AccessGuardService } from '../../core/services/access-guard.service';
import { Access } from '../../core/enums/access.enum';
import { SpinnerModule } from "../../shared/components/spinner/spinner.module";
import { MaterialModule } from '../../shared/modules/material.module';
import { PropertyGridModule } from '../../shared/components/property-grid/property-grid.module';
import { SetSubscriptionComponent } from './components/set-subscription/set-subscription.component';
import { SetRoleComponent } from './components/set-role/set-role.component';
import { DialogContainerModule } from '../../shared/components/dialog-container/dialog-container.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        UsersComponent,
        UserDetailsComponent,
        SetSubscriptionComponent,
        SetRoleComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SpinnerModule,
        PropertyGridModule,
        DialogContainerModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: UsersComponent,
                canActivate: [AccessGuardService],
                data: { access: Access.Administrators }
            },
            {
                path: 'users/:id',
                component: UserDetailsComponent,
                canActivate: [AccessGuardService],
                data: { access: Access.Administrators }
            }
        ])
    ]
})
export class UsersModule { }