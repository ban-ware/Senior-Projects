 # method to get the sessions in a date range for a certain field 
 def self.get_pump_sessions_for_date_range(start_time, end_time, field_id)
  #find and return pumping sessions that start on or after the given dates on the field given
  pump_sessions = PumpSession.where(start_time: start_time..end_time).where(field_id: field_id)
  #initialize variables to keep totals
  gallons_total = 0
  duration_total = 0
  water_per_inch_mean = 0
  total_waterable_acreage = 0
  gallons_per_acre_inch = 27154.284714
  #initialize sessions array
  sessions = []
  #for each session construct an object with the data for the report, keeping track of totals
  pump_sessions.each do |pump_session|
  #for each section find the waterable acreage
  irrigation_section_id = pump_session.irrigation_section_id
  section_acreage = IrrigationSection.find_by(id: pump_session.irrigation_section_id).waterable_acreage
  #create sessions object containing data neede for the report
  sessions << { 
    session_id:              pump_session.id,
    session_start_date:      pump_session.start_time,
    session_field_id:        pump_session.field_id,
    session_duration_in_min: ((pump_session.actual_end_time - pump_session.start_time).to_f/60.0).round(2),
    field_identifier:        pump_session.field_identifier,
    gallons_per_minute:      pump_session.gallons_per_minute,
    waterable_acreage:       section_acreage,
    water_per_inch:          (pump_session.total_gallons_used / gallons_per_acre_inch).round(4),
    total_session_gallons:   (pump_session.total_gallons_used).round(4),
    }  
  #add to the variables keeping track of totals  
  gallons_total  = gallons_total + pump_session.total_gallons_used
  duration_total = duration_total + (pump_session.actual_end_time - pump_session.start_time)
  total_waterable_acreage = total_waterable_acreage + section_acreage
end
#calculate final amounts
sessions_count = sessions.size
water_per_inch_mean = (water_per_inch_mean / gallons_per_acre_inch) / sessions_count
duration_total_in_hours = duration_total / 60
water_per_inch_mean = (gallons_total / gallons_per_acre_inch) / sessions_count
#create totals object
totals = {
  gallons_total:          gallons_total.round(2),
  duration_total_min:     (duration_total_in_hours).round(2),
  water_per_inch_mean:   (water_per_inch_mean).round(4),
  total_waterable_acreage:  total_waterable_acreage,
    

#convert sessions and totals to json
  sessions.to_json
  totals.to_json
  #return sessions and totals
  return sessions, totals
  end
end