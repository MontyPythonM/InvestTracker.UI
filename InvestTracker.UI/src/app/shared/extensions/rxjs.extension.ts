import { Observable, Observer, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../abstractions/base.component';

(Observable as any).prototype.safeSubscribe = function<T>(this: Observable<T>, baseComponent: BaseComponent, observer: Partial<Observer<T>>): Subscription {
  return this.pipe(takeUntil(baseComponent.destroy$)).subscribe(observer);
};

declare module 'rxjs' {
  interface Observable<T> {
    safeSubscribe(baseComponent: BaseComponent,observer: Partial<Observer<T>>): Subscription;
  }
}