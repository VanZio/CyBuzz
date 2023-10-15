import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from your API using fetch
        fetch('http://localhost:3001/api/reports')
            .then(response => response.json())
            .then(result => {
                setData(result);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Report ID</th>
                        <th>Contract Name</th>
                        <th>Audit Date</th>
                        <th>Number of Vulnerabilities</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.report_id}>
                            <td>{item.report_id}</td>
                            <td>{item.contract_name}</td>
                            <td>{item.audit_date}</td>
                            <td>{item.num_vulnerability} <span><Link to="/Result">More</Link></span> </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
