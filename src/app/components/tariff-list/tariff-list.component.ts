import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ITariff } from '../../models/tariff.model';
import { TariffApiService } from '../../services/tariff-api.service';
import { Observable, takeUntil } from 'rxjs';
import { TariffFiltersComponent } from '../tariff-filters/tariff-filters.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tariff-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    TariffFiltersComponent,
  ],
  templateUrl: './tariff-list.component.html',
  styleUrls: ['./tariff-list.component.scss'],
})
export class TariffListComponent implements OnInit {
  private _tariffApi = inject(TariffApiService);
  private _breakpointObserver = inject(BreakpointObserver);

  tariffList$: Observable<ITariff[]>;

  dataSource = new MatTableDataSource<ITariff>();
  displayedColumns: string[] = [
    'id',
    'name',
    'downloadUpload',
    'benefits',
    'tariffFeatures',
  ];
  isMobile = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this._tariffApi.getTariffData().subscribe((tariffs) => {
      if (tariffs) {
        this.dataSource.data = tariffs;
      }
    });

    //considering tablet screen <1100px and mobile <768px
    this._breakpointObserver
      .observe(['(max-width: 768px)', '(max-width: 1100px)'])
      .subscribe((result) => {
        if (result.breakpoints['(max-width: 768px)']) { //for mobiles
          this.isMobile = true;
          this.displayedColumns = [
            'id',
            'name',
            'downloadUpload',
            'tariffFeatures',
          ];
        } else if (result.breakpoints['(max-width: 1100px)']) { //for tablets
          this.isMobile = false;
          this.displayedColumns = [
            'id',
            'name',
            'downloadUpload',
            'tariffFeatures',
          ];
        } else { //for large screens
          this.isMobile = false;
          this.displayedColumns = [
            'id',
            'name',
            'downloadUpload',
            'benefits',
            'tariffFeatures',
          ];
        }
      });
  }

  showTariffDetails(tariff: ITariff): void {
    alert(`More details for ${tariff.name}`);
  }

  // handler method for sort
  onSortChange(sortEvent: { type: string; direction: 'asc' | 'desc' }): void {
    const data = [...this.dataSource.data];
    const direction = sortEvent.direction === 'asc' ? 1 : -1;

    switch (sortEvent.type) {
      case 'download':
        data.sort((a, b) => (a.download - b.download) * direction);
        break;
      case 'upload':
        data.sort((a, b) => (a.upload - b.upload) * direction);
        break;
      case 'price':
        data.sort(
          (a, b) => (parseFloat(a.price) - parseFloat(b.price)) * direction
        );
        break;
    }

    this.dataSource.data = data;
  }

  private _screenSizeObserver() {
    this._breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .subscribe((result) => {
        this.isMobile = result.matches;

        if (result.breakpoints[Breakpoints.Handset]) {
          // If it's a mobile device, hide the benefits and only show download speed
          this.displayedColumns = [
            'id',
            'name',
            'downloadUpload',
            'tariffFeatures',
          ];
        } else if (result.breakpoints[Breakpoints.Tablet]) {
          // If it's a tablet, show all columns except benefits
          this.displayedColumns = [
            'id',
            'name',
            'downloadUpload',
            'tariffFeatures',
          ];
        } else {
          // For larger screens, show all columns including upload and benefits
          this.displayedColumns = [
            'id',
            'name',
            'downloadUpload',
            'benefits',
            'tariffFeatures',
          ];
        }
      });
  }
}
