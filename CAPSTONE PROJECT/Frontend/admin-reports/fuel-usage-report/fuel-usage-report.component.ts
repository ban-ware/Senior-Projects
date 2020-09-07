import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../reports.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fuel-usage-report',
  templateUrl: './fuel-usage-report.component.html',
  styleUrls: ['./fuel-usage-report.component.scss']
})
export class FuelUsageReportComponent implements OnInit {
  subs = new Subscription()
  fuelUsageTotals: any;
  pumpSessions: any;
  totalFuelUsed: any;
  criteriaName: any;
  criteriaType: any;
  criteriaId: any;
  selectedCriteria: any;
  startDate: any;
  endDate: any;
  selectedEndDate: any;
  selectedStartDate: any;

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.getFuelUsageReportData()
  }

  getFuelUsageReportData(){
    this.criteriaId = this.reportsService.returnStoredCriteriaId()
    this.criteriaName = this.reportsService.returnStoredCriteriaName()
    this.selectedCriteria = this.reportsService.returnStoredCriteriaType()
    this.selectedStartDate = this.reportsService.returnStoredStartDate()
    this.selectedEndDate = this.reportsService.returnStoredEndDate()
    let params = {}
    if (this.selectedCriteria == "Headquarters") {
      params = {
        start_date: this.selectedStartDate,
        end_date: this.selectedEndDate,
        headquarter_id: this.criteriaId
      }
    }else{
      if (this.selectedCriteria == "Field") {
        params = {
          start_date: this.selectedStartDate,
          end_date: this.selectedEndDate,
          field_id: this.criteriaId
        }
      }else{
        if(this.selectedCriteria == "Pump"){
          params = {
            start_date: this.selectedStartDate,
            end_date: this.selectedEndDate,
            pump_id: this.criteriaId
          }
        }   
      }
    }
    this.subs.add(this.reportsService.getFuelUsageData(params).subscribe(data => {
      console.log(data)
      this.pumpSessions = data.sessions
      this.totalFuelUsed = data.total_fuel_used
    }, error => {
      console.error(error)
    }))
  }
  
  clearStorage(){
    this.reportsService.clearStorage()
  }

}
