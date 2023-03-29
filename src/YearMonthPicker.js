import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function YearMonthPicker({parentcallback}) {
  const [selectedDate, handleDateChange] = useState(new Date());

  const changeMonthYear = (event) => {
      handleDateChange(event);
      parentcallback(event);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <DatePicker
        views={["year", "month"]}
        label="Year and Month"
        minDate={new Date("2019-01-01")}
        value={selectedDate}
        onChange={changeMonthYear}
      />
    </MuiPickersUtilsProvider>
    
  );
}

export default YearMonthPicker;