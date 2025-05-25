import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
const navigate=useNavigate();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token, user } = await login({ email, password });
      localStorage.setItem("token", token);
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleLogin}
        className="flex flex-col justify-center font-italic gap-2"
      >
        <h2 className="font-bold text-2xl">Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex flex-col p-3 gap-2">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border rounded-md"
          />
        </div>

        <button type="submit">Entrar</button>
        <p>No tienes cuenta? <a href="./register">Registrate</a></p>
      </form>
    </>
  );
};
