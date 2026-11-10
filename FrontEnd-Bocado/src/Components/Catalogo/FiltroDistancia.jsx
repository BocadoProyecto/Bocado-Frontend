import { useState } from "react";

// radio: el valor elegido ("todos", "1", "2"...)
// ubicacion: la ubicación del usuario (o null si todavía no la tenemos)
// onCambiarRadio: avisa al Catálogo que cambió el radio
// onUbicacion: le pasa al Catálogo la ubicación cuando el navegador la da
export default function FiltroDistancia({ radio, ubicacion, onCambiarRadio, onUbicacion }) {
  const [error, setError] = useState("");

  function cambiar(valor) {
    onCambiarRadio(valor);
    setError("");

    // si eligió "Cualquiera" o ya tenemos la ubicación, no hay que pedir nada
    if (valor === "todos" || ubicacion) {
      return;
    }

    if (!navigator.geolocation) {
      setError("Tu navegador no soporta geolocalización.");
      onCambiarRadio("todos");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        onUbicacion({
          lat: posicion.coords.latitude,
          lng: posicion.coords.longitude,
        });
      },
      () => {
        setError("No pudimos obtener tu ubicación. Revisá los permisos.");
        onCambiarRadio("todos");
      }
    );
  }

  return (
    <label className="filtros__campo">
      <span>Distancia</span>
      <select value={radio} onChange={(e) => cambiar(e.target.value)}>
        <option value="todos">Cualquiera</option>
        <option value="1">A 1 km</option>
        <option value="2">A 2 km</option>
        <option value="5">A 5 km</option>
        <option value="10">A 10 km</option>
        <option value="20">A 20 km</option>
      </select>
      {error && <small className="filtros__error">{error}</small>}
    </label>
  );
}