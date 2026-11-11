import "./Terminos.css";

const secciones = [
  {
    titulo: "1. Qué es Bocado",
    parrafos: [
      "Bocado es una plataforma que conecta panaderías y comercios de barrio que tienen excedentes del día con personas que quieren comprarlos a menor precio, para sí mismas o para donarlos a comedores y escuelas.",
      "Bocado actúa como intermediario: no elabora ni vende alimentos por cuenta propia. Cada producto es responsabilidad de la panadería que lo publica.",
    ],
  },
  {
    titulo: "2. Cuentas de usuario",
    parrafos: [
      "Para comprar o publicar productos necesitás crear una cuenta con datos reales y mantenerlos actualizados. Sos responsable de cuidar tu contraseña y de lo que se haga desde tu cuenta.",
      "Hay dos tipos de cuenta: cliente y panadería. Las cuentas de panadería deben corresponder a un comercio habilitado.",
    ],
  },
  {
    titulo: "3. Compras y retiro",
    parrafos: [
      "Los productos son excedentes elaborados el día anterior, y cada publicación indica su hora de elaboración. Los precios y el stock los define cada panadería.",
      "El pedido se retira en el local, dentro del horario que indique la panadería. Si no se retira antes del cierre, el pedido se dona automáticamente a un comedor cercano y no corresponde reembolso, ya que el producto fue apartado para vos.",
    ],
  },
  {
    titulo: "4. Pagos",
    parrafos: [
      "Podés pagar online o en efectivo al retirar, según lo que acepte cada panadería. Los precios se muestran en pesos uruguayos e incluyen impuestos.",
    ],
  },
  {
    titulo: "5. Donaciones",
    parrafos: [
      "Al comprar para donar, elegís el comedor o la escuela que recibe el pedido entre las organizaciones que publicaron sus necesidades en Bocado. Te avisamos cuando la donación se entrega.",
      "Las panaderías que participan de las donaciones reciben la insignia «Panadería solidaria», que se muestra en su perfil.",
    ],
  },
  {
    titulo: "6. Obligaciones de las panaderías",
    parrafos: [
      "Las panaderías deben contar con la habilitación bromatológica vigente de su intendencia y publicar solo productos en buen estado, correctamente envasados y, si llevan crema o rellenos frescos, conservados en frío hasta el retiro.",
      "Bocado puede pausar una cuenta que reciba reclamos repetidos mientras revisa el caso.",
    ],
  },
  {
    titulo: "7. Reclamos",
    parrafos: [
      "Si tu pedido no coincide con lo publicado, escribinos desde el formulario de contacto y buscamos una solución junto con la panadería. Esto no afecta los derechos que te reconoce la Ley N.º 17.250 de Defensa del Consumidor.",
    ],
  },
  {
    titulo: "8. Datos personales",
    parrafos: [
      "Usamos tus datos solo para gestionar tu cuenta, tus pedidos y tus donaciones, de acuerdo con la Ley N.º 18.331 de Protección de Datos Personales. Podés pedir acceder a tus datos, corregirlos o eliminarlos cuando quieras.",
    ],
  },
  {
    titulo: "9. Cambios en estos términos",
    parrafos: [
      "Podemos actualizar estos términos. Si hay cambios importantes, te avisamos antes de que empiecen a regir.",
    ],
  },
];

export default function Terminos({ onVolver }) {
  return (
    <section className="terminos">
      {onVolver && (
        <button className="terminos__volver" onClick={onVolver}>
          ← Volver
        </button>
      )}

      <h2 className="terminos__titulo">Términos y condiciones</h2>
      <p className="terminos__aviso">
        Proyecto académico de Desarrollo Web (ANIMA). Bocado es un proyecto
        ficticio: estos términos son un ejemplo y no tienen validez legal.
      </p>

      {secciones.map((seccion) => (
        <article key={seccion.titulo} className="terminos__seccion">
          <h3>{seccion.titulo}</h3>
          {seccion.parrafos.map((texto, i) => (
            <p key={i}>{texto}</p>
          ))}
        </article>
      ))}
    </section>
  );
}
