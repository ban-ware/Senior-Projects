class Api::V1::ReportsController < Api::V1::AuthenticatedController
    
#====================== Moisture Availability Report ======================
def get_moisture_availability_data
    start_time = Date.parse(params[:start_date].to_s).beginning_of_day
    end_time = Date.parse(params[:end_date].to_s).end_of_day
    #Pass params to Report Service to Query Data
    sessions, totals = ReportService.get_pump_sessions_for_date_range(start_time, end_time, params[:field_id])
    #conditional to check if sessions returned anything
    if sessions.blank?    
      # return error and message if sessions is blank      
      render json: { message: "No pumping sessions in that time range!", sessions: sessions}, success: false
      else
      #  render json consisting of sessions and totals if sessions were found  
      render json: {sessions: sessions, totals: totals}, success: true
    end
  end
end

    #========================== Session Logs Report ===========================

    def get_pump_sessions_and_gallons_per_week
        start_time = Date.parse(params[:start_date].to_s).beginning_of_day
        #Adds 6 days to the start date to create a week.
        end_date = (start_date.to_s.beginning_of_day)+6.days
        end_date = end_date.to_s.end_of_day

        sessions, gallons_total = ReportServer.get_pump_sessions_for_date_range(params[:start_date], params[:field_id])
        
        #conditional to check if sessions returned anything
        if sessions.blank?
        #   Error message if sessions is blank
            render json: { message: "No pumping sessions found in the selected week", sessions: nil }, sucess: false
        else
        #   render json showing number of sessions and total amount of gallons pumped
            render json: { sessions: sessions, gallons_total: ReportService.gallons_total, week: week}, success: true
        end
    end

        


end
