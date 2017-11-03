import React from 'react';
import { Link } from 'react-router-dom';

const SimpleHeader = props => (
    <header>
        <h1>{props.title}</h1>
        <div className="actions">
            <Link to="/admin" className="btn">Back</Link>
        </div>
    </header>
);
  

export default SimpleHeader;