import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITariff } from '../models/tariff.model';
import { tariffData } from '../mock-data/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TariffApiService {
  public getTariffData(): Observable<ITariff[]> {
    return of(tariffData);
  }
}
