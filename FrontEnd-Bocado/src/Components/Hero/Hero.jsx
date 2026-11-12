import "./Hero.css";
import bocado_bolsa_panaderia from "../../assets/bocado_bolsa_panaderia.jpg";

//  que es? onVerProductos: función que le llega desde App para pasar al catálogo
export default function Hero({ onVerProductos }) {
  return (
    <section className="hero">
      <div className="hero__content">
        

        <h1 className="hero__title">
          Aprovechá más.
          <br />
          Desperdiciá menos.
        </h1>

        <p className="hero__text">
          Descubrí productos de panadería a precios accesibles y ayudá a reducir
          el desperdicio de alimentos. Una forma más inteligente de aprovechar
          lo que cada día tiene para ofrecer.
        </p>

        <p className="hero__tagline">Un nuevo consumo empieza con vos.</p>

        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onVerProductos}
          >
            Ver productos
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          
        </div>
      </div>

      {/*blob son las partes redondeadas*/}
      <div className="hero__visual">
        <svg className="hero__blob" viewBox="0 0 400 480" aria-hidden="true">
          <path d="M60 40C140 -20 300 10 360 90c40 60 30 160 20 230-10 70-60 140-150 150C130 480 40 420 20 330 0 240-20 100 60 40z" />
        </svg>

        <svg
          className="hero__leaves"
          viewBox="0 0 120 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        ></svg>

        {/* La foto está en src/assets/croissants.jpg */}
        <img
          className="hero__img"
          src={bocado_bolsa_panaderia}
                    alt="Bolsa de papel de Bocado con panes y croissants"
        />
      </div>
    </section>
  );
}
