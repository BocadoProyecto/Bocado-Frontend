import { useState, useEffect } from "react";
import "./AnimacionIntro.css";
import animacion from "./bocado-animacion.gif";

export default function AnimacionIntro({ onTerminar }) {
  const [cargada, setCargada] = useState(false);
  const [saliendo, setSaliendo] = useState(false);

  useEffect(() => {
    const sinMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (sinMovimiento) {
      onTerminar();
    }
  }, [onTerminar]);

  useEffect(() => {
    if (!cargada) return;

    const salir = setTimeout(() => setSaliendo(true), 3300);
    const terminar = setTimeout(onTerminar, 3800);

    return () => {
      clearTimeout(salir);
      clearTimeout(terminar);
    };
  }, [cargada, onTerminar]);

  function saltar() {
    setSaliendo(true);
    setTimeout(onTerminar, 500);
  }

  return (
    <div
      className={
        saliendo
          ? "animacion-intro animacion-intro--saliendo"
          : "animacion-intro"
      }
      onClick={saltar}
      role="presentation"
    >
      <img
        className="animacion-intro__gif"
        src={animacion}
        alt="Bocado"
        onLoad={() => setCargada(true)}
      />
    </div>
  );
}
