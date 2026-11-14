import "./AboutUs.css";

const cifras = [
  {
    numero: "1 millón",
    unidad: "de toneladas",
    texto:
      "de alimentos se pierden o desperdician por año en Uruguay, cerca del 10 % de lo disponible para consumo.",
    fuente: "FAO Uruguay",
  },
  {
    numero: "14,6 %",
    unidad: "de los hogares",
    texto: "tiene inseguridad alimentaria moderada o grave.",
    fuente: "INE",
  },
  {
    numero: "33,4 %",
    unidad: "de los hogares",
    texto: "con menores ingresos vive esa misma situación.",
    fuente: "INE",
  },
];

const pilares = [
  {
    icono: "🥐",
    titulo: "Comprás a mitad de precio",
    texto:
      "Los panificados del día de las panaderías de tu barrio, a mejor precio y en buen estado.",
  },
  {
    icono: "💛",
    titulo: "Donás con un clic",
    texto:
      "Activás el modo donar y tu compra llega a un comedor. Sin elegir a quién ni pasar a retirar.",
  },
  {
    icono: "♻️",
    titulo: "Nada se tira",
    texto:
      "Las panaderías recuperan parte del costo y lo que sobra termina en una mesa, no en la basura.",
  },
];

const historia = [
  "Bocado nació como proyecto final de Desarrollo Web en ANIMA, a partir de una consigna: trabajar sobre la vida digna. Elegimos una necesidad básica, la alimentación, y una contradicción que nos hizo ruido: en Uruguay se tira comida mientras hay hogares que no llegan a comer bien.",
  "Investigamos datos de FAO, la normativa de donación y aplicaciones como Buen Provecho y Too Good To Go. Tomamos ideas de ellas, pero quisimos sumar algo propio: que donar sea tan fácil como comprar.",
  "Probamos varios nombres. «Donnar» casi gana, pero se confundía con las donas y queríamos abarcar más que un solo alimento. Elegimos Bocado: simple, cálido y fácil de recordar. A los cinco colores de la paleta, inspirados en el pan, se sumó un sexto durante el desarrollo: el amarillo dorado de la donación.",
];

const equipo = [
  "Camila Vera",
  "Jonathan Fontes",
  "Tomás Casas",
  "Leonela Viera",
  "Rodrigo Maina",
];

function iniciales(nombre) {
  return nombre
    .split(" ")
    .map((palabra) => palabra[0])
    .join("");
}

export default function AboutUs({
  onVolver,
  onExplorar,
  onFaq,
  onVerMas,
  compacto = false,
}) {
  return (
    <section
      id="sobre-nosotros"
      className={compacto ? "about about--compacto" : "about"}
    >
      {onVolver && !compacto && (
        <button className="about__volver" onClick={onVolver}>
          ← Volver
        </button>
      )}

      <header className="about__encabezado">
        <span className="chip">Sobre nosotros</span>
        <h2 className="about__titulo">
          {compacto ? "Por qué existe Bocado" : "Un clic, dos mesas."}
        </h2>
        <p className="about__bajada">
          {compacto
            ? "En Uruguay se tira comida mientras hay hogares que no llegan a comer bien. Bocado nace para unir esas dos realidades."
            : "Bocado conecta a las panaderías que tienen excedentes con quienes los aprovechan: personas que compran más barato y comedores que reciben donaciones."}
        </p>
      </header>

      <div className="about__bloque">
        <h3 className="about__subtitulo">El problema, en tres números</h3>
        <div className="about__cifras">
          {cifras.map((cifra) => (
            <article key={cifra.numero} className="about__cifra">
              <p className="about__numero">{cifra.numero}</p>
              <p className="about__unidad">{cifra.unidad}</p>
              <p className="about__cifra-texto">{cifra.texto}</p>
              <p className="about__fuente">Fuente: {cifra.fuente}</p>
            </article>
          ))}
        </div>
      </div>

      {!compacto && (
        <>
          <div className="about__bloque">
            <h3 className="about__subtitulo">Qué hacemos</h3>
            <div className="about__pilares">
              {pilares.map((pilar) => (
                <article key={pilar.titulo} className="about__pilar">
                  <span className="about__icono" aria-hidden="true">
                    {pilar.icono}
                  </span>
                  <h4>{pilar.titulo}</h4>
                  <p>{pilar.texto}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="about__diferencia">
            <h3>Qué nos hace distintos</h3>
            <p>
              Otras plataformas venden excedentes. Bocado además te deja{" "}
              <strong>donar mientras comprás</strong>, o usar la plataforma{" "}
              <strong>solo para donar</strong>. Porque una vida digna empieza
              por poder sentarse a comer.
            </p>
          </div>

          <div className="about__bloque about__historia">
            <h3 className="about__subtitulo">Nuestra historia</h3>
            {historia.map((parrafo, i) => (
              <p key={i}>{parrafo}</p>
            ))}
          </div>
        </>
      )}

      <div className="about__bloque">
        <h3 className="about__subtitulo">El equipo</h3>
        <ul className="about__equipo">
          {equipo.map((nombre) => (
            <li key={nombre} className="about__persona">
              <span className="about__avatar" aria-hidden="true">
                {iniciales(nombre)}
              </span>
              <p>{nombre}</p>
            </li>
          ))}
        </ul>
      </div>

      {compacto ? (
        <div className="about__acciones">
          <button className="btn btn--outline" onClick={onVerMas}>
            Conocé nuestra historia
          </button>
        </div>
      ) : (
        <>
          <p className="about__ley">
            Desde 2025, la <strong>Ley N.º 20.177</strong>, reglamentada por el
            Decreto 179/025, fomenta la donación de alimentos y da beneficios
            fiscales a los comercios que donan.
          </p>

          <div className="about__acciones">
            <button className="btn btn--primary" onClick={onExplorar}>
              Ver productos
            </button>
            <button className="btn btn--outline" onClick={onFaq}>
              Preguntas frecuentes
            </button>
          </div>
        </>
      )}
    </section>
  );
}
