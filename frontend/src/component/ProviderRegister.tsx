import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

function ProviderRegister() {

    const [serviceName, setServiceName] = useState([])
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {

        const getAllServices = async () => {
  try {
    const response = await fetch("http://localhost:8085/admin/getAllService", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("authToken"),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const services = await response.json();
    console.log("Fetched services:", services);

    const serviceNames = services.map(service => ({serviceName: service.name}));
    setServiceName(serviceNames);

    // Optionally store it in state
    // setServices(services);

  } catch (error) {
    console.error("Error fetching services:", error);
  }
};

getAllServices()

    }, [])

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
            <Dropdown
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.value)}
                            options={serviceName}
                            optionLabel="serviceName" 
                            placeholder="Select a Role"
                            // style={{ width: '300px' }}
                        />
            <InputText placeholder="Enter your username" />
            <InputText type="password" placeholder="Enter your password" />

            <Button label="Submit" />
            </div>
        </>
    )
}

export default ProviderRegister