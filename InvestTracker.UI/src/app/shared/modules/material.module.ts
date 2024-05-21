import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabGroup } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavContainer, MatSidenavModule, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule, MatNavList } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTabGroup ,
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
    BrowserAnimationsModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatTabGroup ,
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
    BrowserAnimationsModule
  ]
})
export class MaterialModule { }
