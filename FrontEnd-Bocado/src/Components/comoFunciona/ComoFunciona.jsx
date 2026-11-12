import "./ComoFunciona.css";

const pasos = [
  {
    numero: 1,
    titulo: "Las panaderías publican",
    texto:
      "Al cierre del día suben lo que no vendieron, con precio rebajado y horario de retiro.",
  },
  {
    numero: 2,
    titulo: "Vos elegís",
    texto:
      "Lo comprás para vos o lo donás a un comedor que publicó exactamente qué necesita.",
  },
  {
    numero: 3,
    titulo: "Retirás",
    texto:
      "Lo pasás a buscar al cierre. Si donás, Bocado coordina la entrega al comedor.",
  },
];

function ComoFunciona() {
  return (
    <section className="como-funciona" aria-labelledby="como-funciona-titulo">
      <p className="como-funciona__etiqueta">Cómo funciona</p>
      <h2 id="como-funciona-titulo" className="como-funciona__titulo">
        Ayudar es tan fácil
        <br />
        como hacer una compra
      </h2>

      <ol className="como-funciona__pasos">
        {pasos.map((paso) => (
          <li className="como-funciona__paso" key={paso.numero}>
            <span className="como-funciona__numero">{paso.numero}</span>
            <h3 className="como-funciona__paso-titulo">{paso.titulo}</h3>
            <p className="como-funciona__texto">{paso.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default ComoFunciona;
