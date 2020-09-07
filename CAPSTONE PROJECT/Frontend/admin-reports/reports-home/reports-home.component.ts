import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountSetupService } from '../../../account-setup/account-setup.service';
import { MatDatepickerInputEvent } from '@angular/material';
import { ReportsService } from '../../reports.service';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.scss']
})
export class ReportsHomeComponent implements OnInit {
  maxDate: Date;
  subs = new Subscription()
  hideDefault = false;
  hideMoistureAvailabilityInput = true;
  hideFuelUsageInput = true;
  hideSessionsAndGallonsInput = true;
  hideUserActivityInput = true;
  fields: any;
  selectedField: any;
  selectedStartDate: any;
  selectedEndDate
  pumpSessions
  moistureAvailabilityTotals
  startDate
  endDate
  headquarters: any;
  selectedHeadquarters: any;
  pumps: any;
  powerUnits: any;
  selectedPump: any;
  selectedPowerUnit: any;
  selectedWeeksNum: any;
  selectedReport: any;
  selectedCriteria: any;
  farmTracts: any;
  selectedTract: any;
  selectedUser: any;
  users: any[];
  public criteriaOptions: Array<string> = ["Headquarters","Field","Pump"];
  public weeks: Array<any> = ["1","2","3","4","5","6","7","8","9","10"]
  hidePump = true;
  hideField = true;
  hideTract = true;
  hideHeadquarters = true;
  totals: any;
  criteriaName: any;
  criteriaId: any;

  constructor( private acmService: AccountSetupService, private reportsService: ReportsService, private router: Router) 
  { 
    this.maxDate = new Date();
  }
    
  getMoistureAvailabilityInput(){
    if (this.hideDefault == false){
      this.hideDefault = true
    }else{
      if(this.hideFuelUsageInput == false){
        this.hideFuelUsageInput = true
      }else{
        if(this.hideSessionsAndGallonsInput == false){
          this.hideSessionsAndGallonsInput = true
        }else{
          if(this.hideUserActivityInput == false){
            this.hideUserActivityInput = true
          }
        }
      }
    }
    this.hideMoistureAvailabilityInput = false
  }

  getFuelUsageInput(){
    if (this.hideDefault == false){
      this.hideDefault = true
    }else{
      if(this.hideMoistureAvailabilityInput == false){
        this.hideMoistureAvailabilityInput = true
      }else{
        if(this.hideSessionsAndGallonsInput == false){
          this.hideSessionsAndGallonsInput = true
        }else{
          if(this.hideUserActivityInput == false){
            this.hideUserActivityInput = true
          }
        }
      }
    }
    this.hideFuelUsageInput = false
  }

  getSessionsAndGallonsInput(){
    if (this.hideDefault == false){
      this.hideDefault = true
    }else{
      if(this.hideMoistureAvailabilityInput == false){
        this.hideMoistureAvailabilityInput = true
      }else{
        if(this.hideFuelUsageInput == false){
          this.hideFuelUsageInput = true
        }else{
          if(this.hideUserActivityInput == false){
            this.hideUserActivityInput = true
          }
        }
      }
    }
    this.hideSessionsAndGallonsInput = false
  }

  getUserActivityInput(){
    if (this.hideDefault == false){
      this.hideDefault = true
    }else{
      if(this.hideMoistureAvailabilityInput == false){
        this.hideMoistureAvailabilityInput = true
      }
      if(this.hideFuelUsageInput == false){
        this.hideFuelUsageInput = true
      }else{
        if(this.hideSessionsAndGallonsInput == false){
          this.hideSessionsAndGallonsInput = true
        }
      }
    }
    this.hideUserActivityInput = false
  }

  ngOnInit() {
    this.getAllUsers()
    this.getAllHeadquarters()
    this.getAllFarmTracts()
    this.getAllFields()
    this.getAllPumps()
  }

  getAllUsers() {
    this.users = []
    this.subs.add(
      this.acmService.getAllUsersOnHeadquarters().subscribe(data => {
        console.log(data)
        this.users = data.users
      }, error => {
        console.error(error)
      })
    )
  }

  getAllHeadquarters() {
    this.subs.add(
      this.acmService.retrieveHeadquarters().subscribe(data => {
        if (data) {
          this.headquarters = data.headquarters
        }
      }, error => {
        console.log(error)
      }))
  }

  getAllFarmTracts() {
    this.subs.add(
      this.acmService.retrieveAllFarmTracts().subscribe( data => {
        console.log(data)
        this.farmTracts = data.farm_tracts
      }, error => {
        console.error(error)
      })
    )
  }

  getAllFields() {
    this.subs.add(
      this.acmService.retrieveAllFields().subscribe( data => {
        this.fields = data.fields
      }, error => {
        console.log(error)
      })
    )
  }

  getAllPumps() {
    this.subs.add(
      this.acmService.retrieveAllPumps().subscribe(data => {
        if (data) {
          this.pumps = data.pumps
        }
      }, error => {
        console.error(error)
      })
    )
  }

  selectCriteria(criteria: any){
    if (criteria == "Headquarters"){
      this.selectedCriteria = criteria
      this.hideHeadquarters = false
      this.hideTract = true
      this.hideField = true
      this.hidePump = true
    }else{ 
      if (criteria == "Field"){ 
        this.selectedCriteria = criteria
        this.hideHeadquarters = true
        this.hideTract = true
        this.hideField = false
        this.hidePump = true
      }else{ 
        if (criteria == "Pump"){
          this.selectedCriteria = criteria
          this.hideHeadquarters = true
          this.hideTract = true
          this.hideField = true
          this.hidePump = false
        }
      }
    }
  }

  selectUser(id: any){
    this.selectedUser = id
  }

  selectReport(report: any){
    this.selectedReport = report
  }

  selectFuelCriteria(criteria: any){
    this.selectedCriteria = criteria
  }

  selectWeeksNumber(weeks: any){
    this.selectedWeeksNum = weeks
  }

  selectHeadquartersById(id: any){
    this.selectedHeadquarters = id
  }

  selectFieldById(id: any) {
    this.selectedField = id
  }

  selectPumpById(id: any) {
    this.selectedPump = id
  }

  selectStartDate(){
    this.selectedStartDate = this.startDate.toISOString().split('T')[0]
  }

  selectEndDate(){
    this.selectedEndDate = this.endDate.toISOString().split('T')[0]
  }

  generateMoistureAvailabilityReport(){
    const field_id = this.selectedField.id
    const criteriaName = this.selectedField.field_identifier
    this.reportsService.setStoredCriteriaId(field_id)
    this.reportsService.setStoredCriteriaName(criteriaName)
    this.reportsService.setStoredStartDate(this.selectedStartDate)
    this.reportsService.setStoredEndDate(this.selectedEndDate)
    this.router.navigateByUrl('/reports/moisture-availability-report')
  }

  generateFuelUsageReport(){
    if (this.selectedCriteria == "Headquarters") {
      this.criteriaId = this.selectedHeadquarters.id
      this.criteriaName = this.selectedHeadquarters.name     
    }else{
      if (this.selectedCriteria == "Field") {
        this.criteriaId = this.selectedField.id
        this.criteriaName = this.selectedField.field_identifier
      }else{
        if(this.selectedCriteria == "Pump"){
          this.criteriaId = this.selectedPump.id
          this.criteriaName = this.selectedPump.name
        } 
      }
    }
    this.reportsService.setStoredCriteriaId(this.criteriaId)
    this.reportsService.setStoredCriteriaName(this.criteriaName)
    this.reportsService.setStoredCriteriaType(this.selectedCriteria)
    this.reportsService.setStoredStartDate(this.selectedStartDate)
    this.reportsService.setStoredEndDate(this.selectedEndDate) 
    this.router.navigateByUrl('/reports/fuel-usage-report')
  }

  generatePumpSessionsAndGallonsReport(){
    const selectedHeadquartersId = this.selectedHeadquarters.id
    const criteriaName = this.selectedHeadquarters.name
    this.reportsService.setStoredCriteriaId(selectedHeadquartersId)
    this.reportsService.setStoredCriteriaName(criteriaName)
    this.reportsService.setStoredStartDate(this.selectedStartDate)
    this.reportsService.setStoredEndDate(this.selectedWeeksNum)
    this.router.navigateByUrl('/reports/pump-sessions-and-gallons-report')
  }

  generateUserActivityReport(){
    const selectedUserId = this.selectedUser.id
    const criteriaName = this.selectedUser.name
    this.reportsService.setStoredCriteriaId(selectedUserId)
    this.reportsService.setStoredCriteriaName(criteriaName)
    this.reportsService.setStoredStartDate(this.selectedStartDate)
    this.reportsService.setStoredEndDate(this.selectedEndDate)
    this.router.navigateByUrl('/reports/user-activity-report')
  }

}
