import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { Observable } from 'rxjs';
import { AdvisorDetails } from '../models/advisor-details.model';
import { apiUrl } from '../../shared/environments/api-urls';
import { UpdateAdvisor } from '../models/update-advisor.model';

@Injectable({
  providedIn: 'root'
})
export class AdvisorsService {
  private httpService = inject(HttpService);

  get(id: string) : Observable<AdvisorDetails> {
    return this.httpService.get<AdvisorDetails>(`${apiUrl.module.offers}/advisors/${id}`);
  }

  upadte(model: UpdateAdvisor) : Observable<void> {
    return this.httpService.patch<void>(`${apiUrl.module.offers}/advisors`, model);
  }
}
