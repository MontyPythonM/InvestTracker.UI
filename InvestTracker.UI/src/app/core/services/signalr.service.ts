import {inject, Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {HubConnection} from '@microsoft/signalr';
import {Observable} from "rxjs";
import {environment} from "../../shared/environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private authenticationService = inject(AuthenticationService);
  private hubConnection?: HubConnection;

  buildConnection(): void {
    console.log('SignalR connection configuring...');
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${environment.serverUrl}/notification-hub/`, {
        accessTokenFactory: () => {
          return this.authenticationService.getToken() ?? '';
        }
      })
      .build();

    console.log('SignalR connection configured');
  }

  startConnection(): Observable<void> {
    console.log('SignalR connecting...');
    return new Observable<void>((observer) => {
      this.hubConnection!
        .start()
        .then(() => {
          console.log('SignalR connected');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  receiveMessage(): Observable<string> {
    return new Observable<string>((observer) => {
      this.hubConnection!.on('notify', (message: string) => {
        observer.next(message);
      });
    });
  }
}
