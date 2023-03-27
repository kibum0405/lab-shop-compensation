import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

function CalendarPicker(props) {
  const [selectedDate, setSelectedDate] = useState(props.value ? new Date(props.value) : null);
  const handleDateChange = (date,e) => {
    setSelectedDate(date);
    if (props.onChange) {
      let value = {...props.value,
        "target": {
          "name":props.name,
          "value":moment(date).format('YYYY-MM-DD'),
          [props.name]:moment().format('YYYY-MM-DD')
        }};
        console.log(date, e)
      props.onChange(value);
    }
  };

  return (
    <div>
      <label>{props.label}</label>
      <DatePicker
        name={props.name?props.name:""}
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        disabled={!props.editMode}
      />
    </div>
  );
}

export default CalendarPicker;