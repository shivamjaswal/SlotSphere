import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import Admin from './Admin';
import Client from './Client';
import Provider from './Provider';

function Register() {

    const [roles, setRoles] = useState(["CLIENT", "PROVIDER", "ADMIN"]);
    const [selectedRole, setSelectedRole] = useState('');

    return (
        <>
            <h1 style={{ fontSize: '2.5rem', color: '#007ad9', textAlign: 'center' }}>
                Register
            </h1>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <Dropdown
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.value)}
                options={roles}
                optionLabel="name" 
                placeholder="Select a Role"
                style={{ width: '300px' }}
            />
            </div>

            <div style={{ marginTop: '2rem' }}>
                {selectedRole === "CLIENT" && <Client />}
                {selectedRole === "PROVIDER" && <Provider />}
                {selectedRole === "ADMIN" && <Admin />}
            </div>
        </>
    );
}

export default Register