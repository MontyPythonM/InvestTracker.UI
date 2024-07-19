import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContainerComponent } from './dialog-container.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    DialogContainerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [
    DialogContainerComponent
  ]
})
export class DialogContainerModule { }
