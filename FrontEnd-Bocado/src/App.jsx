import { useState } from "react";
import Navbar from "./Components/navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import Catalogo from "./Components/Catalogo/Catalogo";
import Carrito from "./Components/Carrito/Carrito";
import Pago from "./Components/Pago/Pago";
import Donar from "./Components/Donar/Donar";
import { Faq } from "./Components/faq/faq";
import Terminos from "./Components/terminos/Terminos";
import Footer from "./Components/footer/Footer";
import AnimacionIntro from "./Components/animacionIntro/AnimacionIntro";

import "./App.css";

function App() {
  // Q pantalla se muestra
  const [vista, setVista] = useState("caratula");

  //la lista en el carrito
  const [items, setItems] = useState([]);

  const [modoDonar, setModoDonar] = useState(false);

  const [mostrarIntro, setMostrarIntro] = useState(true);

  function irA(nuevaVista) {
    setVista(nuevaVista);
    window.scrollTo(0, 0); // te lleva para arriba
  }

  function agregarAlCarrito(producto, esDonacion = modoDonar) {
    const nuevaLista = items.slice(); // la listita
    nuevaLista.push({ ...producto, donacion: esDonacion }); // le agregamos el producto
    setItems(nuevaLista); // guardamos la lista nueva
  }
    function quitarUnoDelCarrito(id, esDonacion = modoDonar) {
    // busca la última unidad de ese producto, del mismo tipo (compra o donación)
    let indice = -1;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id && items[i].donacion === esDonacion) {
        indice = i;
      }
    }

    // si no estaba en el carrito, no hace nada
    if (indice === -1) {
      return;
    }

    const nuevaLista = items.filter((producto, i) => i !== indice);
    setItems(nuevaLista);
  }

  function quitarDelCarrito(indice) {
    // resta el prod y deja el resto
    const nuevaLista = items.filter((producto, i) => i !== indice);
    setItems(nuevaLista);
  }

  function vaciarCarrito() {
    setItems([]);
  }

  return (
    <>
      {mostrarIntro && (
        <AnimacionIntro onTerminar={() => setMostrarIntro(false)} />
      )}

      <Navbar
        cartCount={items.length}
        modoDonar={modoDonar}
        onCambiarModoDonar={setModoDonar}
        onInicio={() => irA("caratula")}
        onExplorar={() => irA("catalogo")}
        onCarrito={() => irA("carrito")}
      />

      <main>
        {vista === "caratula" && (
          <Hero onVerProductos={() => irA("catalogo")} />
        )}

                {vista === "catalogo" && (
          <Catalogo
            onVolver={() => irA("caratula")}
            onAgregar={agregarAlCarrito}
            onQuitarUno={quitarUnoDelCarrito}
            items={items}
            modoDonar={modoDonar}
          />
        
        )}

        {vista === "carrito" && (
          <Carrito
            items={items}
            onQuitar={quitarDelCarrito}
            onVaciar={vaciarCarrito}
            onSeguir={() => irA("catalogo")}
            onPagar={() => irA("pago")}
          />
        )}

        {vista === "pago" && (
          <Pago
            items={items}
            onVolver={() => irA("carrito")}
            onVaciar={vaciarCarrito}
            onDonar={() => irA("donar")}
            onSeguir={() => irA("catalogo")}
          />
        )}

        {vista === "donar" && (
          <Donar
            onVolver={() => irA("pago")}
            onAgregar={(producto) => agregarAlCarrito(producto, true)}
          />
        )}

        {vista === "faq" && <Faq onVolver={() => irA("caratula")} />}

        {vista === "terminos" && <Terminos onVolver={() => irA("caratula")} />}
      </main>

      <Footer
        onInicio={() => irA("caratula")}
        onExplorar={() => irA("catalogo")}
        onCarrito={() => irA("carrito")}
        onFaq={() => irA("faq")}
        onTerminos={() => irA("terminos")}
      />
    </>
  );
}

export default App;
