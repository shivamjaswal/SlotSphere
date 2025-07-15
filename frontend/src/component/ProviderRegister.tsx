import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

function ProviderRegister() {

    return (
        <>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            width: '500px'
        }}>
            <InputText keyfilter="alpha" placeholder="Enter your full name" />
            <InputText placeholder="Enter your highest qualification" />
            <InputText placeholder="Enter your username" />
            <InputText type="password" placeholder="Enter your password" />

            <Button label="Submit" />
            </div>
        </>
    )
}

export default ProviderRegister