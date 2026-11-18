# Bocado · Frontend

E-commerce de excedentes de panadería: "Come rico, paga poco, dona más". Hecho con React 19 y Vite.

Sitio publicado: https://bocadoproyecto.github.io/Bocado-Frontend/
(necesita el backend corriendo en local para mostrar productos y panaderías)

## Cómo correrlo

1. Instalar dependencias:

```bash
npm install
```

2. Crear un archivo `.env.local` en esta carpeta con la clave pública de Stripe de prueba:

```
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

3. Tener el backend corriendo en `http://localhost:3000` (ver el README del backend).

4. Arrancar el front:

```bash
npm run dev
```

## Qué incluye

- Inicio, catálogo con filtros (panadería, categoría, distancia) y una página por cada panadería.
- Registro e inicio de sesión de clientes y panaderías.
- Carrito separado en "Para vos" y "Para donar".
- Modo donar: botón en la barra de navegación y una opción de donar antes de pagar.
- Pago con tarjeta con Stripe en modo de prueba (tarjeta `4242 4242 4242 4242`); los otros métodos son simulados.
- Las panaderías pueden cargar productos con un formulario.
- Navegación con React Router (`HashRouter`).

## Cuentas de prueba

- Cliente: `usuario1@bocado.com` / `1234`
- Panadería: `ClubDelPan@bocado.com` / `1234`

## Publicar en GitHub Pages

```bash
npm run deploy
```

## Equipo

Grupo 3 · Clase C: Camila Vera, Jonathan Fontes, Tomás Casas, Leonela Viera y Rodrigo Maina.