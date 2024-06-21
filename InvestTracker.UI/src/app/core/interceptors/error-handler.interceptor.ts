import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { NotifyService } from '../../shared/services/notify.service';
import { ErrorResponse } from '../../shared/models/error-response.model';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  notifyService = inject(NotifyService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          this.handleHttpError(error);
        }
        return throwError(() => error);
      })
    );
  }

  private handleHttpError(error: HttpErrorResponse) {
    try {
      let errors = error.error as ErrorResponse;
      this.notifyService.showError(errors.errors[0].exceptionMessage);
    }
    catch {
      if (error.status === 401) {
        // refresh token should be invoked in jwt interceptor
      }
      else if (error.status === 403) {
        this.notifyService.showError('Access forbidden');
      }
      else if (error.status === 500) {
        this.notifyService.showError('Internal server error');
      }
      else if (error.status === 0) {
        this.notifyService.showError('Server not responding');
      }
      else {
        this.notifyService.showError('An undefined error has occurred');
      }
    }
  }
}

