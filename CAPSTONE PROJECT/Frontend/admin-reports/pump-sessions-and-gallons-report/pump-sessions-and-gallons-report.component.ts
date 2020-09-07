import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pump-sessions-and-gallons-report',
  templateUrl: './pump-sessions-and-gallons-report.component.html',
  styleUrls: ['./pump-sessions-and-gallons-report.component.scss']
})
export class PumpSessionsAndGallonsReportComponent implements OnInit {
  subs = new Subscription()
  pumpSessions: any;
  gallonsTotals: any;
  criteriaName: any;
  weeksNum: any;
  selectedStartDate: any;
  criteriaId: any;
  selectedWeeksNum: any;

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.getPumpSessionsAndGallonsReportData()
  }

  getPumpSessionsAndGallonsReportData(){
    this.criteriaId = this.reportsService.returnStoredCriteriaId()
    this.criteriaName = this.reportsService.returnStoredCriteriaName()
    this.selectedStartDate = this.reportsService.returnStoredStartDate()
    this.selectedWeeksNum = this.reportsService.returnStoredEndDate()
    const params = {
      start_date:     this.selectedStartDate,
      num_weeks:      this.selectedWeeksNum,
      headquarter_id: this.criteriaId
    }
    this.subs.add(this.reportsService.getPumpSessionsAndGallonsData(params).subscribe(data => {
      console.log(data)
      this.pumpSessions = data.pump_sessions
      this.gallonsTotals = data.gallons_total
    }, error => {
      console.error(error)
    }))
  }

  clearStorage(){
    this.reportsService.clearStorage()
  }

}
