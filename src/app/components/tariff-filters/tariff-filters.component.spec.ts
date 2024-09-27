import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffFiltersComponent } from './tariff-filters.component';

describe('TariffFiltersComponent', () => {
  let component: TariffFiltersComponent;
  let fixture: ComponentFixture<TariffFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TariffFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
