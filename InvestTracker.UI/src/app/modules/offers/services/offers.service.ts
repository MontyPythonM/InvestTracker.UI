import { Injectable, inject } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';
import { PagedRequest } from '../../../core/models/paged-request.model';
import { Observable } from 'rxjs';
import { PagedResponse } from '../../../core/models/paged-response.model';
import { OfferDetails } from '../models/offer-details.model';
import { Offer } from '../models/offer.model';
import { apiUrl } from '../../../shared/environments/api-urls';
import { CreateOffer } from '../models/create-offer.model';
import { UpdateOffer } from '../models/update-offer.model';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  private httpService = inject(HttpService);

  getOffer(id: string) : Observable<OfferDetails> {
    return this.httpService.get<OfferDetails>(`${apiUrl.module.offers}/offers/${id}`);
  }

  getOffers(request: PagedRequest) : Observable<PagedResponse<Offer>> {
    return this.httpService.get<PagedResponse<Offer>>(`${apiUrl.module.offers}/offers?page=${request.page}&results=${request.results}`);
  }

  createOffer(model: CreateOffer) : Observable<void> {
    return this.httpService.post<void>(`${apiUrl.module.offers}/offers/`, model);
  }

  updateOffer(model: UpdateOffer) : Observable<void> {
    return this.httpService.put<void>(`${apiUrl.module.offers}/offers/`, model);
  }

  deleteOffer(id: string) : Observable<void> {
    return this.httpService.delete<void>(`${apiUrl.module.offers}/offers/${id}`);
  }
}
