import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { useNavigate } from "react-router-dom";

function ClientRegister() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [serviceMap, setServiceMap] = useState({});
  const [showDialog, setShowDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedProviderDetails, setSelectedProviderDetails] = useState(null);

  const navigate = useNavigate();

  const handleCardClick = async (id, name) => {
    try {
      const response = await fetch(
        "http://localhost:8085/provider/getProviderByServiceId/" + id,
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

      setSelectedProviderDetails(services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }

    console.log(`Clicked service: ID=${id}, Name=${name}`);
    setSelectedServiceId(id);
    setShowDetailsDialog(true);
  };

  const handleProviderSelect = async (provider) => {
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
            role: "CLIENT",
          }),
        }
      );

      if (!registerResponse.ok) {
        throw new Error("User registration failed");
      }

      console.log("User registered successfully");

      const providerResponse = await fetch(
        "http://localhost:8085/user/createClient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            providerId: provider.id,
            username: username,
            name: name,
          }),
        }
      );

      if (!providerResponse.ok) {
        throw new Error("Provider registration failed");
      }

      return navigate("/client", { state: { username } });
    } catch (error) {
      console.error("Error during full registration:", error);
    }
  };

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

      console.log("Fetched serviceMap: ", serviceMap);

      setServiceMap(serviceMap);
      setShowDialog(true);
    } catch (error) {
      console.error("Error fetching services:", error);
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
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />

        <InputText
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button label="Submit" onClick={getAllServices} />

        <Dialog
          header="Available Services"
          visible={showDialog}
          style={{ width: "40vw" }}
          onHide={() => setShowDialog(false)}
        >
          <div className="p-grid">
            {Object.entries(serviceMap).map(([id, name]) => (
              <Card key={id} style={{ marginBottom: "1rem" }}>
                <div
                  onClick={() => handleCardClick(id, name)}
                  style={{ cursor: "pointer" }}
                >
                  <h3>{name}</h3>
                  <p>
                    <strong>Service ID:</strong> {id}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </Dialog>

        <Dialog
          header="Select your specialist"
          visible={showDetailsDialog}
          style={{ width: "30vw" }}
          onHide={() => setShowDetailsDialog(false)}
        >
          <p>
            <strong>Selected Service ID:</strong> {selectedServiceId}
          </p>

          {selectedProviderDetails &&
            Array.isArray(selectedProviderDetails) &&
            selectedProviderDetails.map((provider, index) => (
              <Card
                key={index}
                style={{
                  marginTop: "1rem",
                  cursor: "pointer",
                  backgroundColor: "#f9f9f9",
                }}
                onClick={() => handleProviderSelect(provider)}
              >
                <p>
                  <strong>Name:</strong> {provider.name}
                </p>
                <p>
                  <strong>Qualification:</strong> {provider.qualification}
                </p>
                <p>
                  <strong>Charge:</strong> ₹{provider.charge}
                </p>
              </Card>
            ))}
        </Dialog>
      </div>
    </>
  );
}

export default ClientRegister;
