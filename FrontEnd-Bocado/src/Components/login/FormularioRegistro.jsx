import { useState } from "react";
import "./FormularioLogin.css";
import "./FormularioRegistro.css";

function FormularioRegistro({ tipo, onIrALogin, onExito }) {
  const esPanaderia = tipo === "panaderia";

  // Todo lo que escribe el usuario, un casillero por campo
  const [datos, setDatos] = useState({
    email: "",
    password: "",
    repetir: "",
    telefono: "",
    nombre: "",
    localidad: "",
    direccion: "",
    mensaje: "",
  });
  const [error, setError] = useState("");

  // Una sola función para todos los campos: usa el "name" del campo
  function cambiar(e) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
    setError("");
  }

  // Revisa los datos al tocar el botón. Si una regla falla, muestra el error y corta.
  function manejarEnvio(e) {
    e.preventDefault();

    const faltaAlgo =
      datos.email.trim() === "" ||
      datos.password === "" ||
      datos.repetir === "" ||
      datos.telefono.trim() === "" ||
      (esPanaderia &&
        (datos.nombre.trim() === "" ||
          datos.localidad.trim() === "" ||
          datos.direccion.trim() === ""));

    if (faltaAlgo) {
      setError("Completá todos los campos obligatorios.");
      return;
    }
    if (!datos.email.includes("@")) {
      setError("El email tiene que tener un @.");
      return;
    }
    if (datos.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (datos.password !== datos.repetir) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (!/^[0-9 ]+$/.test(datos.telefono)) {
      setError("El teléfono solo puede tener números.");
      return;
    }

    setError("");
    console.log("Registro:", { tipo, ...datos });
    if (onExito) onExito();
  }

  const etiqueta = esPanaderia ? "Panadería solidaria" : "Nueva cuenta";
  const titulo = esPanaderia
    ? "Sumá tu panadería a Bocado"
    : "Sumate como cliente";
  const subtitulo = esPanaderia
    ? "Completá los datos y empezá a publicar tus excedentes del día."
    : "Te lleva menos de un minuto. Después podés comprar o donar.";

  return (
    <section className="login">
      <form className="login-form" onSubmit={manejarEnvio} noValidate>
        <p className="registro-etiqueta">{etiqueta}</p>
        <h1>{titulo}</h1>
        <p className="login-subtitulo">{subtitulo}</p>
        {esPanaderia && <h2 className="registro-seccion">1. Tu cuenta</h2>}
        <label htmlFor={`reg-email-${tipo}`}>Email</label>
        <input
          id={`reg-email-${tipo}`}
          type="email"
          placeholder={esPanaderia ? "contacto@tupanaderia.com" : "tuemail@ejemplo.com"}
          name="email"
          value={datos.email}
          onChange={cambiar}
        />

        <div className="registro-fila">
          <div className="registro-campo">
            <label htmlFor={`reg-pass-${tipo}`}>Contraseña</label>
            <input id={`reg-pass-${tipo}`} type="password" placeholder="••••••••" name="password" value={datos.password} onChange={cambiar} />
          </div>
          <div className="registro-campo">
            <label htmlFor={`reg-pass2-${tipo}`}>Repetir contraseña</label>
            <input id={`reg-pass2-${tipo}`} type="password" placeholder="••••••••" name="repetir" value={datos.repetir} onChange={cambiar} />
          </div>
        </div>
        <p className="registro-ayuda">Usá al menos 8 caracteres.</p>
        {esPanaderia ? (
          <>
            <h2 className="registro-seccion">2. Tu panadería</h2>

            <label htmlFor="reg-nombre">Nombre de la panadería</label>
            <input id="reg-nombre" type="text" placeholder="Ej: Panadería La Espiga" name="nombre" value={datos.nombre} onChange={cambiar} />

            <div className="registro-fila">
              <div className="registro-campo">
                <label htmlFor="reg-localidad">Localidad</label>
                <input id="reg-localidad" type="text" placeholder="Ej: Montevideo" name="localidad" value={datos.localidad} onChange={cambiar} />
              </div>
              <div className="registro-campo">
                <label htmlFor="reg-tel-panaderia">Teléfono</label>
                <input id="reg-tel-panaderia" type="tel" placeholder="09X XXX XXX" name="telefono" value={datos.telefono} onChange={cambiar} />
              </div>
            </div>

            <label htmlFor="reg-direccion">Dirección</label>
            <input id="reg-direccion" type="text" placeholder="Calle, número y esquina" name="direccion" value={datos.direccion} onChange={cambiar} />

            <label htmlFor="reg-mensaje">
              Mensaje <span className="registro-opcional">(opcional)</span>
            </label>
            <textarea id="reg-mensaje" rows="3" placeholder="Contanos algo sobre tu panadería" name="mensaje" value={datos.mensaje} onChange={cambiar} />
          </>
        ) : (
          <>
            <label htmlFor="reg-tel-cliente">Teléfono</label>
            <div className="registro-telefono">
              <span className="registro-prefijo">+598</span>
              <input id="reg-tel-cliente" type="tel" placeholder="9X XXX XXX" name="telefono" value={datos.telefono} onChange={cambiar} />
            </div>
          </>
        )}

        {error && <p className="login-error">{error}</p>}

        <button type="submit">
          {esPanaderia ? "Registrar mi panadería" : "Crear mi cuenta"}
        </button>
      </form>

      <p className="login-pie">
        ¿Tenés una cuenta?{" "}
        <button type="button" className="login-cambiar" onClick={onIrALogin}>
          Ingresá
        </button>
      </p>
    </section>
  );
}

export default FormularioRegistro;