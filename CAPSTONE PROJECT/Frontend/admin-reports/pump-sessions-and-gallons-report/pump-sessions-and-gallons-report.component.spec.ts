import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PumpSessionsAndGallonsReportComponent } from './pump-sessions-and-gallons-report.component';

describe('PumpSessionsAndGallonsReportComponent', () => {
  let component: PumpSessionsAndGallonsReportComponent;
  let fixture: ComponentFixture<PumpSessionsAndGallonsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PumpSessionsAndGallonsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PumpSessionsAndGallonsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
