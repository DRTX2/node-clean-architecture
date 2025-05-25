import { useState } from "react";
import { register } from "../api/auth";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { token, user } = await register({ name, email, password });
      localStorage.setItem("token", token);
      console.log("Usuario registrado", user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="flex flex-col justify-center font-italic gap-2"
    >
      <h2 className="font-bold text-2xl">Registro</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex flex-col p-3 gap-2">
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
          required
          className="px-4 py-2 border rounded-md"
        />
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

      <button type="submit">Crear cuenta</button>
      <p>Ya tienes cuenta? <a href="./login">Inicia sesion</a></p>
    </form>
  );
};
