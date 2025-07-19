import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";

function ProviderRegister() {
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [serviceMap, setServiceMap] = useState({});
  const [serviceName, setServiceName] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [charge, setCharge] = useState(null);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:8085/admin/getAllService",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("authToken"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const services = await response.json();
        console.log("Fetched services:", services);

        const serviceMap = {};
        services.forEach((service) => {
          serviceMap[service.id] = service.name;
        });

        setServiceMap(serviceMap);

        const serviceNames = services.map((service) => ({
          serviceName: service.name,
        }));
        setServiceName(serviceNames);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    getAllServices();
  }, []);

  const handleFullProviderRegister = async () => {
    try {
      const registerResponse = await fetch(
        "http://localhost:8085/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            role: "PROVIDER",
          }),
        }
      );

      if (!registerResponse.ok) {
        throw new Error("User registration failed");
      }

      console.log("User registered successfully");

      const selectedId = Object.keys(serviceMap).find(
        (key) => serviceMap[key] === selectedService.serviceName
      );

      if (!selectedId) {
        throw new Error("Selected service ID not found");
      }

      setSelectedServiceId(selectedId);
      console.log("Selected Service ID:", selectedId);

      const providerResponse = await fetch(
        "http://localhost:8085/provider/createProvider",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            serviceId: selectedId,
            username: username,
            name: name,
            qualification: qualification,
            charge: charge,
          }),
        }
      );

      if (!providerResponse.ok) {
        throw new Error("Provider registration failed");
      }

      const result = await providerResponse.json();
      console.log("Provider created:", result);

      return navigate("/provider", { state: { username } });
    } catch (error) {
      console.error("Error during full registration:", error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "500px",
        }}
      >
        <InputText
          keyfilter="alpha"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <InputText
          placeholder="Enter your highest qualification"
          value={qualification}
          onChange={(e) => {
            setQualification(e.target.value);
          }}
        />
        <Dropdown
          value={selectedService}
          onChange={(e) => setSelectedService(e.value)}
          options={serviceName}
          optionLabel="serviceName"
          placeholder="Select a Role"
        />
        <InputText
          placeholder="Enter your Charge"
          value={charge}
          onChange={(e) => {
            setCharge(e.target.value);
          }}
        />
        <InputText
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputText
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button label="Submit" onClick={handleFullProviderRegister} />
      </div>
    </>
  );
}

export default ProviderRegister;
