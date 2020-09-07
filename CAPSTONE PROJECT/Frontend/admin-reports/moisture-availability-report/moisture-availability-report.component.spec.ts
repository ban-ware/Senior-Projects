import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoistureAvailabilityReportComponent } from './moisture-availability-report.component';

describe('MoistureAvailabilityReportComponent', () => {
  let component: MoistureAvailabilityReportComponent;
  let fixture: ComponentFixture<MoistureAvailabilityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoistureAvailabilityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoistureAvailabilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
