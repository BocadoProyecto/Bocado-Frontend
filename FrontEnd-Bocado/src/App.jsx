import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
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

// cada "vista" de antes ahora es una dirección (URL)
const rutas = {
  caratula: "/",
  catalogo: "/productos",
  panaderias: "/panaderias",
  carrito: "/carrito",
  subirProducto: "/subir-producto",
  pago: "/pago",
  donar: "/donar",
  faq: "/faq",
  terminos: "/terminos",
  nosotros: "/nosotros",
};

function App() {
  // Q pantalla se muestra
  const navigate = useNavigate();
  //la lista en el carrito
  const [items, setItems] = useState([]);

  const [modoDonar, setModoDonar] = useState(false);

  const [mostrarDonacion, setMostrarDonacion] = useState(false);

  const [mostrarIntro, setMostrarIntro] = useState(true);

  // id de la panadería que se está viendo
  const location = useLocation();
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
    if (location.pathname === "/subir-producto" || location.pathname === "/pago") {
  irA("caratula");
}
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
  navigate(rutas[nuevaVista]);
  window.scrollTo(0, 0);
}

function irAPanaderia(id) {
  navigate("/panaderias/" + id);
  window.scrollTo(0, 0);
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
        <Routes>
    <Route
      path="/"
      element={
        <>
          <Hero onVerProductos={() => irA("catalogo")} />
          <Carrusel onVerPanaderia={irAPanaderia} />
          <ParallaxBocado
            onVerProductos={() => irA("catalogo")}
            onPanaderias={() => irA("panaderias")}
          />
          <AboutUs compacto onVerMas={() => irA("nosotros")} />
        </>
      }
    />
    <Route
      path="/productos"
      element={
        <Catalogo
          onVolver={() => irA("caratula")}
          onAgregar={agregarAlCarrito}
          onQuitarUno={quitarUnoDelCarrito}
          onVerPanaderia={irAPanaderia}
          items={items}
          modoDonar={modoDonar}
        />
      }
    />
    <Route
      path="/panaderias"
      element={
        <Panaderias
          onVolver={() => irA("caratula")}
          onVerPanaderia={irAPanaderia}
        />
      }
    />
    <Route
      path="/panaderias/:id"
      element={
        <Panaderia
          onVolver={() => irA("catalogo")}
          onAgregar={agregarAlCarrito}
          onQuitarUno={quitarUnoDelCarrito}
          items={items}
          modoDonar={modoDonar}
        />
      }
    />
    <Route
      path="/carrito"
      element={
        <Carrito
          items={items}
          onQuitar={quitarDelCarrito}
          onVaciar={vaciarCarrito}
          onSeguir={() => irA("catalogo")}
          onPagar={() => setMostrarDonacion(true)}
        />
      }
    />
    <Route
      path="/subir-producto"
      element={
        token === 2 ? (
          <FormProducto
            panaderia={sesion.nombre}
            onVolver={() => irA("caratula")}
          />
        ) : (
          <Navigate to="/" />
        )
      }
    />
    <Route
      path="/pago"
      element={
        token >= 1 ? (
          <Pago
            items={items}
            onVolver={() => irA("carrito")}
            onVaciar={vaciarCarrito}
            onDonar={() => irA("donar")}
            onSeguir={() => irA("catalogo")}
          />
        ) : (
          <Navigate to="/carrito" />
        )
      }
    />
    <Route
      path="/donar"
      element={
        <Donar
          onVolver={() => irA("pago")}
          onAgregar={(producto) => agregarAlCarrito(producto, true)}
        />
      }
    />
    <Route path="/faq" element={<Faq onVolver={() => irA("caratula")} />} />
    <Route
      path="/terminos"
      element={<Terminos onVolver={() => irA("caratula")} />}
    />
    <Route
      path="/nosotros"
      element={
        <AboutUs
          onVolver={() => irA("caratula")}
          onExplorar={() => irA("catalogo")}
          onFaq={() => irA("faq")}
        />
      }
    />
    <Route path="*" element={<h2>Página no encontrada</h2>} />
  </Routes>

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