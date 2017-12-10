import React from 'react';

const Table = (props) => (
    <div className="table-responsive">
        <table className="table table-bordered text-center" id="schedule-table">
        <THead days={props.params.days}/>
        <TBody schedule={props.params.schedule}/>
        </table>
    </div>
);
  
const TBody = (props) => (
    <tbody>
        <tr className="text-center">
        <LessonNumbers />
        <Schedule schedule={props.schedule}/>
        </tr>
    </tbody>
);
  
const LessonNumbers = () => (
    <td>
        <table>
        <tbody>
            {[1,2,3,4,5].map(e => <tr key={e}><td>{e}</td></tr>)} 
        </tbody>
        </table>
    </td>
);
  
const Schedule = (props) => (
    props.schedule.map(day => 
        <td key={day.dayID}>
        <table>
            <tbody>
            {day.schedule.map(e => 
                <ScheduleDay key={e.number_lesson} e={e} />
            )}
            </tbody>
        </table>
        </td>)
);
  
  const ScheduleDay = (props) => (
    <tr key={props.e.number_lesson}>
     <td key={props.e.number_lesson}>
        <div className="lesson">
          <p><strong>{props.e.subject_name}</strong></p>
          <p><i>{props.e.type_lesson}</i> {props.e.place}</p>
          <p>{props.e.teacher}</p>
        </div>
      </td>
    </tr>
  );
  
  const THead = (props) => (
      <thead className="blue-background bold">
        <tr>
          <td>#</td>
          {props.days.map(e => <td key={e.id}>{e.day}</td>)}
        </tr>
      </thead>
  );

export default Table;
  