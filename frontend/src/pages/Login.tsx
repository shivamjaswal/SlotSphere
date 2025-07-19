import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    fetch("http://localhost:8085/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
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

        return fetch("http://localhost:8085/auth/getRole/" + token);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch role");
        }
        return response.text();
      })
      .then((role) => {
        console.log("Role:", role);
        setRole(role);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (role === "ADMIN") {
    return navigate("/admin");
  }

  if (role === "CLIENT") {
    return navigate("/client", { state: { username } });
  }

  if (role === "PROVIDER") {
    return navigate("/provider", { state: { username } });
  }

  return (
    <>
      <h1 style={{ fontSize: "2.5rem", color: "#007ad9", textAlign: "center" }}>
        Login
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

          <Button label="Submit" onClick={handleLogin} />
        </div>
      </div>
    </>
  );
}

export default Login;
