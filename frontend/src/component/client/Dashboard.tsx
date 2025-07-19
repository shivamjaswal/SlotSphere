import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ClientDashboard() {
  const location = useLocation();
  const username = location.state.username;

  const [name, setName] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [providerName, setProviderName] = useState("");

  useEffect(() => {
    const handleClientSelect = async () => {
      try {
        const response = await fetch(
          "http://localhost:8085/user/getClient/" + username,
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

        const user = await response.json();
        console.log("Fetched user:", user);

        setName(user.name);

        const providerResponse = await fetch(
          "http://localhost:8085/provider/getProviderById/" + user.providerId,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("authToken"),
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${providerResponse.status}`);
        }

        const provider = await providerResponse.json();
        console.log("Fetched provider name:", provider.name);

        setProviderName(provider.name);

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

    handleClientSelect();
  }, []);

  return (
    <>
      <h1>This is Client Dashboard</h1>
      <p>
        Welcome, {username}. You have the {serviceName} service of{" "}
        {providerName}.
      </p>
    </>
  );
}

export default ClientDashboard;
