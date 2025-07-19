import { Dropdown } from "primereact/dropdown";
import { useEffect, useState } from "react";
import ClientRegister from "../component/ClientRegister";
import ProviderRegister from "../component/ProviderRegister";
import DefaultRegister from "../component/DefaultRegister";

function Register() {
  const [roles, setRoles] = useState(["CLIENT", "PROVIDER"]);
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    const handleLogin = async () => {
      fetch("http://localhost:8085/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Guest",
          password: "g@123",
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Login failed");
          }
          return response.text();
        })
        .then((token) => {
          sessionStorage.setItem("authToken", token);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    handleLogin();
  }, []);

  return (
    <>
      <h1 style={{ fontSize: "2.5rem", color: "#007ad9", textAlign: "center" }}>
        Register
      </h1>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Dropdown
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.value)}
          options={roles}
          optionLabel="name"
          placeholder="Select a Role"
          style={{ width: "300px" }}
        />
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        {selectedRole === "CLIENT" && <ClientRegister />}
        {selectedRole === "PROVIDER" && <ProviderRegister />}
        {!selectedRole && <DefaultRegister />}
      </div>
    </>
  );
}

export default Register;
