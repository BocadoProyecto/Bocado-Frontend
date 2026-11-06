// Datos de ejemplo. Después se reemplazan por los productos reales.
// Cada producto lleva el nombre de su panadería, así después se puede filtrar.

export const productos = [
  // La Espiga
  { id: 1, nombre: "Croissant de manteca", panaderia: "La Espiga", categoria: "Facturas", precio: 45, precioOriginal: 90, disponibles: 6 },
  { id: 2, nombre: "Pan de campo", panaderia: "La Espiga", categoria: "Panes", precio: 80, precioOriginal: 130, disponibles: 4 },
  { id: 3, nombre: "Medialunas (x6)", panaderia: "La Espiga", categoria: "Facturas", precio: 120, precioOriginal: 210, disponibles: 3},
  { id: 4, nombre: "Pan integral", panaderia: "La Espiga", categoria: "Panes", precio: 70, precioOriginal: 115, disponibles: 5},

  // Horno del Barrio
  { id: 5, nombre: "Bizcochos surtidos", panaderia: "Horno del Barrio", categoria: "Facturas", precio: 95, precioOriginal: 160, disponibles: 8},
  { id: 6, nombre: "Pan francés (x4)", panaderia: "Horno del Barrio", categoria: "Panes", precio: 60, precioOriginal: 100, disponibles: 10},
  { id: 7, nombre: "Alfajor de maicena", panaderia: "Horno del Barrio", categoria: "Dulces", precio: 40, precioOriginal: 75, disponibles: 12 },
  { id: 8, nombre: "Pan dulce", panaderia: "Horno del Barrio", categoria: "Dulces", precio: 150, precioOriginal: 260, disponibles: 2 },

  // Dulce Esquina
  { id: 9, nombre: "Brownie", panaderia: "Dulce Esquina", categoria: "Dulces", precio: 55, precioOriginal: 95, disponibles: 7 },
  { id: 10, nombre: "Tarta de manzana", panaderia: "Dulce Esquina", categoria: "Tortas", precio: 180, precioOriginal: 320, disponibles: 2 },
  { id: 11, nombre: "Muffin de arándanos", panaderia: "Dulce Esquina", categoria: "Dulces", precio: 50, precioOriginal: 85, disponibles: 6},
  { id: 12, nombre: "Torta de zanahoria", panaderia: "Dulce Esquina", categoria: "Tortas", precio: 210, precioOriginal: 380, disponibles: 1 },
];

// Listas para los filtros: se calculan solas a partir de los productos.
// "new Set" saca los repetidos y ".sort()" los ordena alfabéticamente.
export const panaderias = [...new Set(productos.map((p) => p.panaderia))].sort();
export const categorias = [...new Set(productos.map((p) => p.categoria))].sort();