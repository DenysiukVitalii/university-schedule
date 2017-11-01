import React from 'react';
import { Link } from 'react-router-dom';

const Header = props => (
    <header>
      <h1>{props.title}</h1>
      <div className="actions">
        <button className="btn" onClick={props.click}>{props.button}</button>
        <Link to="/admin" className="btn">Back</Link>
      </div>
    </header>
);

export default Header;
