import { Injectable } from '@angular/core';
import { Visibility } from '../../shared/enums/visibility.enum';
import { AccessToken } from '../models/access-token.model';

@Injectable({
  providedIn: 'root'
})
export class VisibilityService {

  IsVisibleFor(visibility: Visibility, accessToken: AccessToken | null): boolean {
    // TODO
    return true;
  }
}
