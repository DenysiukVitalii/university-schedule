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
          <ul className="admin-items">
            <li><Link to="/specs" className="btn">Specializations</Link></li>
            <li><Link to="/groups" className="btn">Groups</Link></li>
            <li><Link to="/teachers" className="btn">Teachers</Link></li>
            <li><Link to="/subjects" className="btn">Subjects</Link></li>
            <li><Link to="/semesters" className="btn">Semesters</Link></li>
          </ul>
        </main>
      </div>
    );
  }
}

export default Admin;