import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-activity-report',
  templateUrl: './user-activity-report.component.html',
  styleUrls: ['./user-activity-report.component.scss']
})
export class UserActivityReportComponent implements OnInit {
  subs = new Subscription()
  pumpSessions: any;
  maintenanceConcerns: any;
  criteriaName: any;
  criteriaId: any;
  selectedStartDate: any;
  selectedEndDate: any;

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.getUserActivityReportData()
  }

  getUserActivityReportData(){
    this.criteriaId = this.reportsService.returnStoredCriteriaId()
    this.criteriaName = this.reportsService.returnStoredCriteriaName()
    this.selectedStartDate = this.reportsService.returnStoredStartDate()
    this.selectedEndDate = this.reportsService.returnStoredEndDate()
    
    const params = {
      start_date: this.selectedStartDate,
      end_date: this.selectedEndDate,
      user_id: this.criteriaId
    }
    this.subs.add(this.reportsService.getUserActivityData(params).subscribe(data => {
      console.log(data)
      this.maintenanceConcerns = data.maintenance_concerns
      this.pumpSessions = data.pump_sessions
    }, error => {
      console.error(error)
    }))
  }

  clearStorage(){
    this.reportsService.clearStorage()
  }

}
