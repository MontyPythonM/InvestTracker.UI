import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './pages/users/users.component';
import { RouterModule } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AccessGuardService } from '../../core/services/access-guard.service';
import { Visibility } from '../../shared/enums/visibility.enum';
import { SpinnerModule } from "../../shared/components/spinner/spinner.module";
import { MaterialModule } from '../../shared/modules/material.module';
import { PropertyGridModule } from '../../shared/components/property-grid/property-grid.module';

@NgModule({
    declarations: [
        UsersComponent,
        UserDetailsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        SpinnerModule,
        PropertyGridModule,
        RouterModule.forChild([
            {
                path: '',
                component: UsersComponent,
                canActivate: [AccessGuardService],
                data: { visibility: Visibility.Administrators }
            },
            {
                path: 'users/:id',
                component: UserDetailsComponent,
                canActivate: [AccessGuardService],
                data: { visibility: Visibility.Administrators }
            }
        ])
    ]
})
export class UsersModule { }