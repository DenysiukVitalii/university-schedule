import React from 'react';
import Actions from '../shared/Actions';

const Table = props => (
    <table className="table table-hover">
        <Thead />
        <tbody>
        {props.curriculum.map(e => (
                <tr key={e.id} align="center">
                  <td>{e.subject}</td>
                  <td>{e.teacher}</td>
                  <td>
                    <table>
                        <tbody>
                          {e.types_lesson.map((i, index) =>
                            i.amount_hours ? (
                            <tr key={index}>
                              <td>
                               {i.type_lesson}
                              </td>
                            </tr>
                          ): null)}
                         </tbody>
                    </table>
                  </td>
                  <td>
                    <table>
                        <tbody>
                          {e.types_lesson.map((i, index) => 
                            (<tr key={index}>
                              <td>
                                {i.amount_hours}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                    </table>
                  </td>
                  <Actions edit={() => props.openEditModal(e)}
                            delete={() => props.delete(e)}/>
                </tr>
              ))}
        </tbody>
    </table>
  );
  
  const Thead = () => (
      <thead align="center" className="blue-background bold">
        <tr>
            <td>Subject</td>
            <td>Teacher</td>
            <td>Type lesson</td>          
            <td>Amount hours</td>
            <td>Actions</td>
        </tr>
      </thead>
    )
  
  export default Table;