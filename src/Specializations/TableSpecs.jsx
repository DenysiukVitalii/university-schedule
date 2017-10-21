import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class TableSpecs extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
      console.log("TableSpecs");
    return (
      <div className="container">
        <header>
          <h1>TableSpecs</h1>
          <div className="actions">
            <Link to="/newspec" className="btn">Create Spec</Link>
            <Link to="/admin" className="btn">Back</Link>
          </div>
        </header>
          <main>
              <table className="table table-bordered">
                  <thead>
                    <tr>
                        <td>id</td>
                        <td>Name</td>
                    </tr>
                  </thead>
                  <tbody>
                     <tr>
                         <td>1</td>
                         <td>sdfsd</td>
                     </tr>
                  </tbody>
              </table>
          </main>
      </div>
    );
  }
}



export default TableSpecs;