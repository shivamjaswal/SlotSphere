import { Button } from "primereact/button"
import { useNavigate } from 'react-router-dom';

function Index() {

    const navigate = useNavigate();

    return(
        <>
            <h1>Welcome to SlotSphere</h1>

            <Button onClick={() => {
                navigate('/login');
            }}>Login</Button>
            <br /><br />
            <Button onClick={() => {
                navigate('/register');
            }}>Register</Button>
        </>
    )
}

export default Index