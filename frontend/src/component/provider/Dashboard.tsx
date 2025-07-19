import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ProviderDashboard() {
  const location = useLocation();
  const username = location.state.username;

  const [providerName, setProviderName] = useState("");
  const [providerQualification, setProviderQualification] = useState("");
  const [providerCharge, setProviderCharge] = useState("");
  const [serviceName, setServiceName] = useState("");

  useEffect(() => {
    const handleProviderSelect = async () => {
      try {
        const providerResponse = await fetch(
          "http://localhost:8085/provider/getProviderByUsername/" + username,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("authToken"),
            },
          }
        );

        if (!providerResponse.ok) {
          throw new Error(`HTTP error! status: ${providerResponse.status}`);
        }

        const provider = await providerResponse.json();
        console.log("Fetched provider name:", provider.name);
        console.log("provider qualification: ", provider.qualification);
        console.log("provider charge: ", provider.charge);

        setProviderName(provider.name);
        setProviderQualification(provider.qualification);
        setProviderCharge(provider.charge);

        const serviceResponse = await fetch(
          "http://localhost:8085/admin/getServiceById/" + provider.serviceId,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("authToken"),
            },
          }
        );

        if (!serviceResponse.ok) {
          throw new Error(`HTTP error! status: ${serviceResponse.status}`);
        }

        const services = await serviceResponse.json();
        console.log("Fetched services:", services.name);

        setServiceName(services.name);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    handleProviderSelect();
  }, []);

  return (
    <>
      <h1>This is Provider Dashboard</h1>
      <p>
        Welcome, {providerName}. You have done {providerQualification} and you
        are giving {serviceName} service for the charge {providerCharge}.
      </p>
    </>
  );
}

export default ProviderDashboard;
