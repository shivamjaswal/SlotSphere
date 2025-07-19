import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

function AdminDashboard() {
  const [serviceName, setServiceName] = useState("");
  const [minCharge, setMinCharge] = useState();
  const [maxCharge, setMaxCharge] = useState();
  const [serviceDescription, setServiceDescription] = useState("");

  const handleCreateService = async () => {
    try {
      const response = await fetch(
        "http://localhost:8085/admin/createService",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("authToken"),
          },
          body: JSON.stringify({
            name: serviceName,
            minCharge: minCharge,
            maxCharge: maxCharge,
            description: serviceDescription,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Service created:", result);

      setServiceName("");
      setMinCharge("");
      setMaxCharge("");
      setServiceDescription("");
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  return (
    <>
      <h1 style={{ fontSize: "2.5rem", color: "#007ad9", textAlign: "center" }}>
        Create Service
      </h1>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "500px",
          }}
        >
          <InputText
            placeholder="Enter service name"
            value={serviceName}
            onChange={(e) => {
              setServiceName(e.target.value);
            }}
          />

          <InputText
            placeholder="Minimum charges"
            keyfilter="int"
            value={minCharge}
            onChange={(e) => {
              setMinCharge(e.target.value);
            }}
          />

          <InputText
            placeholder="Maximum charges"
            keyfilter="int"
            value={maxCharge}
            onChange={(e) => {
              setMaxCharge(e.target.value);
            }}
          />

          <InputText
            placeholder="Service description"
            value={serviceDescription}
            onChange={(e) => {
              setServiceDescription(e.target.value);
            }}
          />

          <Button label="Submit" onClick={handleCreateService} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
