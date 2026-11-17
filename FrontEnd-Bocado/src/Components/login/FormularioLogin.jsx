import { useState } from "react";
import "./FormularioLogin.css";

function FormularioLogin({ tipo, aviso, onExito, onIrARegistro }) {
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

    async function manejarEnvio(e) {
    e.preventDefault();
    if (email.trim() === "" || password === "") {
      setError("Completá el email y la contraseña.");
      return;
    }
    if (!email.includes("@")) {
      setError("El email tiene que tener un @.");
      return;
    }

    setError("");

    // cliente -> /auth/usuarios/login (token 1), panadería -> /auth/panaderias/login (token 2)
    const ruta = esPanaderia ? "panaderias" : "usuarios";

    try {
      const respuesta = await fetch(`http://localhost:3000/auth/${ruta}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), contrasena: password }),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        setError(datos.mensaje || "No pudimos iniciar sesión.");
        return;
      }

      // el token y el nombre vuelven al App, que los guarda
      if (onExito) onExito({ token: datos.token, nombre: datos.nombre });
    } catch {
      setError("No pudimos conectar con el servidor.");
    }
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
       {aviso && !error && <p className="login-aviso">{aviso}</p>}
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
