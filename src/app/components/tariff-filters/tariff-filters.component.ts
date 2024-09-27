import { Component, EventEmitter, Output, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tariff-filters',
  templateUrl: './tariff-filters.component.html',
  styleUrls: ['./tariff-filters.component.scss'],
  standalone: true,
  imports: [MatButtonModule],
})
export class TariffFiltersComponent {
  readonly sortChanged = output<{ type: string; direction: 'asc' | 'desc' }>();
  downloadSortDirection: 'asc' | 'desc' = 'asc';
  uploadSortDirection: 'asc' | 'desc' = 'asc';
  priceSortDirection: 'asc' | 'desc' = 'asc';

  readonly sortOptions = [
    { type: 'download', label: 'Download', direction: this.downloadSortDirection },
    { type: 'upload', label: 'Upload', direction: this.uploadSortDirection },
    { type: 'price', label: 'Price', direction: this.priceSortDirection },
  ];

  toggleSort(type: string) {
    switch (type) {
      case 'download':
        this.downloadSortDirection =
          this.downloadSortDirection === 'asc' ? 'desc' : 'asc';
        this.sortChanged.emit({
          type: 'download',
          direction: this.downloadSortDirection,
        });
        break;
      case 'upload':
        this.uploadSortDirection =
          this.uploadSortDirection === 'asc' ? 'desc' : 'asc';
        this.sortChanged.emit({
          type: 'upload',
          direction: this.uploadSortDirection,
        });
        break;
      case 'price':
        this.priceSortDirection =
          this.priceSortDirection === 'asc' ? 'desc' : 'asc';
        this.sortChanged.emit({
          type: 'price',
          direction: this.priceSortDirection,
        });
        break;
    }
  }
}
