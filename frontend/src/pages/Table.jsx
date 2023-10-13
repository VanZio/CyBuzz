import React from 'react'
import './Account.css';
import { Link } from "react-router-dom";

const Table = ({data}) => {
    return (
        <table class="audit-table">
          <thead>
        <tr>
          <th>Name</th>
          <th>Result</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
            {data.map(item=>( 
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>{item.result}</td>
          <td>{item.date} <span><Link to="/Result">More</Link></span></td>
        </tr>
            ))}
        </tbody>
      </table>
    );
};

export default Table;