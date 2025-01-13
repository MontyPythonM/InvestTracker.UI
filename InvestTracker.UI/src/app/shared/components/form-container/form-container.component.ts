import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Theme} from "../../../core/enums/theme.enum";
import {ThemeService} from "../../../core/services/theme.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form-container',
  template: `
    <div class="container" [ngStyle]="{ 'background-color': themeService.themeSignal() === Theme.Dark ? '#3b3b3b' : '#e8e8e8' }">
      <div class="title">{{ title }}</div>
      <ng-content></ng-content>
        <div class="buttons">
          <button mat-raised-button class="close-button" (click)="cancel()" color="secondary">Cancel</button>
          <button mat-raised-button class="submit-button" (click)="save.emit()" color="primary" [disabled]="disableSaveButton">Save</button>
        </div>
    </div>
  `,
  styleUrl: './form-container.component.scss'
})
export class FormContainerComponent {
  @Input() title: string = '';
  @Input() disableSaveButton: boolean = false;
  @Output() save = new EventEmitter<void>();
  protected readonly Theme = Theme;

  protected themeService = inject(ThemeService);
  protected router = inject(Router);
  protected route = inject(ActivatedRoute);


  protected cancel(): void {
    this.router.navigate!(["../"], {relativeTo: this.route});
  }
}
