import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Admin extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Admin Page</h1>
          <Link to="/" className="btn">Home</Link>
        </header>
        <main>
          <div className="admin-zones">
            <div className="personal-zone text-center">
              <h2>Educational zone</h2>
              <p>Here you can choose one of educational thing.<br/> All items belong to manage educational process.</p>
              <Link to="/specs" className="btn">Specializations</Link>
              <Link to="/groups" className="btn">Groups</Link>
              <Link to="/teachers" className="btn">Teachers</Link>
              <Link to="/subjects" className="btn">Subjects</Link>
            </div>
            <div className="curriculum-zone text-center">
              <h2>Curriculum zone</h2>
              <p>Here you can choose one of curriculum thing.<br/> All items belong to manage curriculum process.</p>
              <Link to="/audiences" className="btn">Audiences</Link>
              <Link to="/semesters" className="btn">Semesters</Link>
              <Link to="/curriculum" className="btn">Curriculum</Link>
              <Link to="/schedule" className="btn">Schedule</Link>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Admin;