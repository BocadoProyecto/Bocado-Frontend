import "./Footer.css";
import logo from "../../assets/logo.png";

export default function Footer({
  onInicio,
  onExplorar,
  onCarrito,
  onFaq,
  onTerminos,
  onNosotros,
}) {
  function manejar(e, accion) {
    e.preventDefault();
    if (accion) accion();
  }

  const columnas = [
    {
      titulo: "Navegación",
      links: [
        { texto: "Inicio", accion: onInicio },
        { texto: "Explorar productos", accion: onExplorar },
        { texto: "Mi carrito", accion: onCarrito },
        { texto: "Sobre nosotros", accion: onNosotros },
      ],
    },
    {
      titulo: "Ayuda",
      links: [
        { texto: "Preguntas frecuentes", accion: onFaq },
        { texto: "Términos y condiciones", accion: onTerminos },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer__contenido">
        <div className="footer__marca">
          <a href="#" onClick={(e) => manejar(e, onInicio)}>
            <img src={logo} alt="Bocado" className="footer__logo" />
          </a>
          <p>
            Panificados del día a mejor precio. Comprá para vos o doná a un
            comedor de tu barrio.
          </p>
          <span className="footer__insignia">Lo que sobra, no se pierde</span>
        </div>

        {columnas.map((columna) => (
          <nav key={columna.titulo} className="footer__columna">
            <h4>{columna.titulo}</h4>
            {columna.links.map((link) => (
              <a
                key={link.texto}
                href="#"
                onClick={(e) => manejar(e, link.accion)}
              >
                {link.texto}
              </a>
            ))}
          </nav>
        ))}
      </div>

      <div className="footer__base">
        <p>© {new Date().getFullYear()} Bocado</p>
        <p>Proyecto académico de Desarrollo Web · ANIMA</p>
      </div>
    </footer>
  );
}
