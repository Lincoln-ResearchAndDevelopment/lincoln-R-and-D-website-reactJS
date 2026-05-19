import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_ENDPOINT } from './Config';

const AdminSupervisors = () => {
    const [supervisors, setSupervisors] = useState([]);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchSupervisors();
    }, []);

    const fetchSupervisors = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}get_supervisors.php`);
            if (response.data.status === 'success') {
                setSupervisors(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching supervisors", error);
        }
    };

    const handleAddSupervisor = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_ENDPOINT}admin_add_supervisor.php`, { name });
            if (response.data.status === 'success') {
                setMessage(response.data.message);
                setName('');
                fetchSupervisors();
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("An error occurred");
        }
    };

    return (
        <div className="admin-content">
            <h2>Manage Supervisors</h2>
            {message && <p>{message}</p>}

            <form onSubmit={handleAddSupervisor} style={{ marginBottom: '20px' }}>
                <div>
                    <label>Supervisor Name: </label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <button type="submit" className="button">Add Supervisor</button>
            </form>

            <h3>Existing Supervisors</h3>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {supervisors.length > 0 ? (
                        supervisors.map(sup => (
                            <tr key={sup.id}>
                                <td>{sup.id}</td>
                                <td>{sup.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr><td colSpan="2">No supervisors found</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminSupervisors;
