import { useState } from "react";
import "./FormularioLogin.css";

function FormularioLogin({ tipo, onExito, onIrARegistro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const esPanaderia = tipo === "panaderia";

  const titulo = esPanaderia
    ? "Ingresá como panadería"
    : "Ingresá como cliente";
  const subtitulo = esPanaderia
    ? "Publicá tus excedentes del día y sumate como panadería solidaria."
    : "Comprá excedentes a mitad de precio o doná a un comedor.";

  function manejarEnvio(e) {
    e.preventDefault();
    if (email.trim() === "" || password === "") {
      setError("Completá el email y la contraseña.");
      return;
    }
    if (!email.includes("@")) {
      setError("El email tiene que tener un @.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setError("");
    console.log("Intento de login:", { tipo, email, password });
    if (onExito) onExito();
  }

  return (
    <section className="login">
      <form className="login-form" onSubmit={manejarEnvio} noValidate>
        <h1>{titulo}</h1>
        <p className="login-subtitulo">{subtitulo}</p>

        <label htmlFor={`email-${tipo}`}>Email</label>
        <input
          id={`email-${tipo}`}
          type="email"
          placeholder="tuemail@ejemplo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        <label htmlFor={`password-${tipo}`}>Contraseña</label>
        <input
          id={`password-${tipo}`}
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        {error && <p className="login-error">{error}</p>}

        <button type="submit">Ingresar</button>
      </form>
      <p className="login-pie">
        ¿No tenés cuenta?{" "}
        <button type="button" className="login-cambiar" onClick={onIrARegistro}>
          Creá una acá
        </button>
      </p>
    </section>
  );
}

export default FormularioLogin;
