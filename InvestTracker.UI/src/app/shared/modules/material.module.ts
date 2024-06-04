import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenavModule, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabGroup,
    MatSlideToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSidenavContainer,
    MatSidenavContent,
    MatButtonToggleModule,
    MatListModule,
    MatNavList,
    MatSidenav,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabGroup,
    MatSlideToggleModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSidenavContainer,
    MatSidenavContent,
    MatButtonToggleModule,
    MatListModule,
    MatNavList,
    MatSidenav,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
