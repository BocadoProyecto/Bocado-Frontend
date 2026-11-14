import "./ParallaxBocado.css";
import BtnPanaderias from "../btnPanaderias/BtnPanaderias";

export default function ParallaxBocado({ onVerProductos, onPanaderias }) {
  return (
    <section
      className="parallax-bocado"
      role="img"
      aria-label="Una panadera entrega una bolsa de pan a un cliente"
    >
      <div className="parallax-bocado__contenido">
        <span className="parallax-bocado__etiqueta">
          Lo que sobra, no se pierde
        </span>
        <h2 className="parallax-bocado__titulo">Un clic, dos mesas.</h2>
        <p className="parallax-bocado__texto">
          Comprá el pan del día a mitad de precio y, si querés, doná para que
          llegue a un comedor de tu barrio. Ahorrás, ayudás y cuidás el
          ambiente.
        </p>

        <div className="parallax-bocado__acciones">
          <button className="btn btn--primary" onClick={onVerProductos}>
            Ver productos
          </button>
          <BtnPanaderias claro onClick={onPanaderias} />
        </div>
      </div>
    </section>
  );
}
