
import { useState } from "react";
import Navbar from "./Components/navbar/Navbar";
import FormProducto from "./Components/formProducto/FormProducto";
import Hero from "./Components/Hero/Hero";
import Carrusel from "./Components/Carrusel/Carrusel";
import Catalogo from "./Components/Catalogo/Catalogo";
import Panaderia from "./Components/Panaderias/Panaderia";
import Carrito from "./Components/Carrito/Carrito";
import Pago from "./Components/Pago/Pago";
import Donar from "./Components/Donar/Donar";
import { Faq } from "./Components/faq/faq";
import Terminos from "./Components/terminos/Terminos";
import Footer from "./Components/footer/Footer";
import AnimacionIntro from "./Components/animacionIntro/AnimacionIntro";
import AboutUs from "./Components/aboutUs/AboutUs";
import ParallaxBocado from "./Components/parallaxBocado/ParallaxBocado";
import Panaderias from "./pages/panaderias/Panaderias";
import ModalDonacion from "./Components/modalDonacion/ModalDonacion";

import "./App.css";

// La sesión (token + nombre) se guarda en el navegador para que no se pierda al recargar.
// token 1 = cliente, token 2 = panadería
function leerSesion() {
  try {
    return JSON.parse(localStorage.getItem("bocado_sesion"));
  } catch {
    return null;
  }
}

function App() {
  // Q pantalla se muestra
  const [vista, setVista] = useState("caratula");

  //la lista en el carrito
  const [items, setItems] = useState([]);

  const [modoDonar, setModoDonar] = useState(false);

  const [mostrarDonacion, setMostrarDonacion] = useState(false);

  const [mostrarIntro, setMostrarIntro] = useState(true);

  // id de la panadería que se está viendo
  const [panaderiaId, setPanaderiaId] = useState(null);
    // { token, nombre } si hay alguien logueado, o null
  const [sesion, setSesion] = useState(leerSesion);
  const [loginAbierto, setLoginAbierto] = useState(false);
  // true si lo mandamos a loguearse desde el carrito: al entrar lo llevamos a pagar
  const [pagarAlLoguear, setPagarAlLoguear] = useState(false);

  const token = sesion ? sesion.token : 0;

  function iniciarSesion(datos) {
    localStorage.setItem("bocado_sesion", JSON.stringify(datos));
    setSesion(datos);
    setLoginAbierto(false);
    if (pagarAlLoguear) {
      setPagarAlLoguear(false);
      irA("pago");
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("bocado_sesion");
    setSesion(null);
    setPagarAlLoguear(false);
    // si estaba en una pantalla que ya no le corresponde, lo sacamos de ahí
    if (vista === "subirProducto" || vista === "pago") irA("caratula");
  }

  function cerrarLogin() {
    setLoginAbierto(false);
    setPagarAlLoguear(false);
  }

  // Botón "Finalizar compra": con token 1 o más sigue, sin token abre el login
  function irAPagar() {
    if (token >= 1) {
      irA("pago");
      return;
    }
    setPagarAlLoguear(true);
    setLoginAbierto(true);
  }

  function irA(nuevaVista) {
    setVista(nuevaVista);
    window.scrollTo(0, 0); // te lleva para arriba
  }

  function irAPanaderia(id) {
    setPanaderiaId(id); // guardamos cuál panadería
    irA("panaderia"); // y cambiamos de pantalla
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
        onNosotros={() => irA("nosotros")}
        sesion={sesion}
        loginAbierto={loginAbierto}
        onAbrirLogin={() => setLoginAbierto(true)}
        onCerrarLogin={cerrarLogin}
        onLogin={iniciarSesion}
        onSalir={cerrarSesion}
        onSubirProductos={() => irA("subirProducto")}
      />

      <main>
        {vista === "caratula" && (
          <>
            <Hero onVerProductos={() => irA("catalogo")} />
            <Carrusel onVerPanaderia={irAPanaderia} />
            <ParallaxBocado
              onVerProductos={() => irA("catalogo")}
              onPanaderias={() => irA("panaderias")}
            />
            <AboutUs compacto onVerMas={() => irA("nosotros")} />
          </>
        )}

        {vista === "catalogo" && (
          <Catalogo
            onVolver={() => irA("caratula")}
            onAgregar={agregarAlCarrito}
            onQuitarUno={quitarUnoDelCarrito}
            onVerPanaderia={irAPanaderia}
            items={items}
            modoDonar={modoDonar}
          />
        )}

        {vista === "panaderias" && (
          <Panaderias
            onVolver={() => irA("caratula")}
            onVerPanaderia={irAPanaderia}
          />
        )}

        {vista === "panaderia" && (
          <Panaderia
            panaderiaId={panaderiaId}
            onVolver={() => irA("catalogo")}
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
            onPagar={() => setMostrarDonacion(true)}
          />
        )}

                {/* Solo para panaderías (token 2) */}
        {vista === "subirProducto" && token === 2 && (
          <FormProducto
            panaderia={sesion.nombre}
            onVolver={() => irA("caratula")}
          />
        )}

        {vista === "pago" && token >= 1 && (
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

        {vista === "nosotros" && (
          <AboutUs
            onVolver={() => irA("caratula")}
            onExplorar={() => irA("catalogo")}
            onFaq={() => irA("faq")}
          />
        )}
      </main>

      {mostrarDonacion && (
        <ModalDonacion
          items={items}
          onAgregar={(producto) => agregarAlCarrito(producto, true)}
          onQuitarUno={(id) => quitarUnoDelCarrito(id, true)}
          onCerrar={() => setMostrarDonacion(false)}
          onSeguir={() => {
            setMostrarDonacion(false);
            irAPagar();
          }}
        />
      )}







      <Footer
        onInicio={() => irA("caratula")}
        onExplorar={() => irA("catalogo")}
        onCarrito={() => irA("carrito")}
        onFaq={() => irA("faq")}
        onTerminos={() => irA("terminos")}
        onNosotros={() => irA("nosotros")}
      />
    </>
  );
}

export default App;