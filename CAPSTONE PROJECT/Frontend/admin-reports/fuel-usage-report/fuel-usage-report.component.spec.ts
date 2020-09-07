import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelUsageReportComponent } from './fuel-usage-report.component';

describe('FuelUsageReportComponent', () => {
  let component: FuelUsageReportComponent;
  let fixture: ComponentFixture<FuelUsageReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelUsageReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelUsageReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
