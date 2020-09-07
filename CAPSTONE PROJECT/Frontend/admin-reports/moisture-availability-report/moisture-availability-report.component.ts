import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moisture-availability-report',
  templateUrl: './moisture-availability-report.component.html',
  styleUrls: ['./moisture-availability-report.component.scss']
})

export class MoistureAvailabilityReportComponent implements OnInit {
  pumpSessions: any;
  subs = new Subscription()
  durationTotalMin: any;
  gallonsTotal: any;
  totalWaterableAcreage: any;
  waterPerInchMean: any;
  totals: any;
  durationTotalHours: number;
  fieldIdentifier: any;
  selectedStartDate: any;
  selectedEndDate: any;

  constructor(private reportsService: ReportsService) { 
  }

  ngOnInit() {
    this.getMoistureAvailabilityReportData()
  }

  getMoistureAvailabilityReportData(){
    const field_id = this.reportsService.returnStoredCriteriaId()
    this.selectedStartDate = this.reportsService.returnStoredStartDate()  
    this.selectedEndDate = this.reportsService.returnStoredEndDate()  
    this.fieldIdentifier = this.reportsService.returnStoredCriteriaName()  
    const params = {
      start_date: this.selectedStartDate,
      end_date: this.selectedEndDate,
      field_id: field_id
    }
    this.subs.add(this.reportsService.getMoistureAvailabilityData(params).subscribe(data => {
      console.log(data)
      this.pumpSessions = data.sessions
      const totals = data.totals  
      this.gallonsTotal = totals.gallons_total
      this.durationTotalHours = Math.round((totals.duration_total_min)/60)
      this.waterPerInchMean = totals.water_per_inch_mean
      this.totalWaterableAcreage = totals.total_waterable_acreage
    }, error => {
      console.error(error)
    }))
  }

  clearStorage(){
    this.reportsService.clearStorage()
  }
  
}
