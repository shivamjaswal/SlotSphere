import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import ClientRegister from '../component/ClientRegister';
import ProviderRegister from '../component/ProviderRegister';
import DefaultRegister from '../component/DefaultRegister';

function Register() {

    const [roles, setRoles] = useState(["CLIENT", "PROVIDER"]);
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

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                {selectedRole === "CLIENT" && <ClientRegister />}
                {selectedRole === "PROVIDER" && <ProviderRegister />}
                {!selectedRole && <DefaultRegister />}
            </div>
        </>
    );
}

export default Register