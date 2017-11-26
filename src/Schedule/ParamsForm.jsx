import React from 'react';
import Select from '../shared/Select';

const ParamsForm = (props) => (
    <section className="params-form">
        <Select title="Specialty" name="selectedSpec" 
                selected={props.params.selectedSpec} 
                change={props.params.change}
                data={props.params.specs.map(e => (<option value={e.id} key={e.id}>{e.spec_name}</option>))}/>  
        <Select title="Groups" name="selectedGroup" 
                selected={props.params.selectedGroup} 
                change={props.params.change}
                data={props.params.groups.map(e => (<option value={e.id} key={e.id}>{e.id}</option>))}/> 
        <Select title="Semester" name="selectedSemester" 
                selected={props.params.selectedSemester} 
                change={props.params.change}
                data={props.params.semesters.map(e => (
                        <option value={e.number_semester} key={e.number_semester}>{e.number_semester}</option>
                        ))}/>
        <Select title="Week" name="selectedWeek" 
                selected={props.params.selectedWeek} 
                change={props.params.change}
                data={[1,2].map(e => (<option value={e} key={e}>{e}</option>))}/>
        <div className="text-center">
            <button className="btn" onClick={props.params.submit}>Get schedule</button>
        </div>   
    </section>
);

export default ParamsForm;