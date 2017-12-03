import React from 'react';
import FaTrash from 'react-icons/lib/fa/trash';
import FaPlus from 'react-icons/lib/fa/plus';

const Table = (props) => (
    <div className="table-responsive">
        <table className="table table-bordered text-center" id="schedule-table">
        <THead days={props.params.days} addLesson={(e) => props.params.addLesson(e)} />
        <TBody schedule={props.params.schedule} deleteLesson={(e) => props.params.deleteLesson(e)}/>
        </table>
    </div>
);
  
const TBody = (props) => (
    <tbody>
        <tr className="text-center">
        <LessonNumbers />
        <Schedule schedule={props.schedule} deleteLesson={(e) => props.deleteLesson(e)}/>
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
                <ScheduleDay key={e.number_lesson} e={e} deleteLesson={() => props.deleteLesson(e)}/>
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
        {props.e.subject_name ? <button className="btn btn-danger" onClick={() => props.deleteLesson(props.e)}><FaTrash/></button> : <span></span>}
      </td>
    </tr>
  );
  
  const THead = (props) => (
      <thead className="blue-background bold">
        <tr>
          <td>#</td>
          {props.days.map(e => <td key={e.id}>{e.day} 
              <button className="btn btn-warning" onClick={() => props.addLesson(e)}><FaPlus /></button>
           </td>)}
        </tr>
      </thead>
  );

export default Table;
  