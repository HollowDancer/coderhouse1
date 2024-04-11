const productos = [
  {
    nombre: "harina",
    precio: 50,
  },
  {
    nombre: "leche",
    precio: 100,
  },
  {
    nombre: "gaseosa",
    precio: 150,
  },
  {
    nombre: "pollo",
    precio: 400,
  },
  {
    nombre: "carne",
    precio: 500,
  },
],
carrito = [];

let seleccion = prompt("hola desea comprar algo? (si-no)");

while (seleccion != "si" && seleccion != "no") {
alert("por favor ingrese una de las opciones, si o no");
seleccion = prompt("Hola, desea comprar algo? (si-no) ");
}

if (seleccion == "si") {
alert("Disponemos de los siguientes productos");
let todosLosProductos = productos.map(
  (producto) => producto.nombre + " " + producto.precio + "$"
);
alert(todosLosProductos.join(" - "));
} else if (seleccion == "no") {
alert("gracias por comprar!");
}

while (seleccion != "no") {
let producto = prompt("agregue un producto a su carrito");
let precio = 0;

if (
  producto == "harina" ||
  producto == "leche" ||
  producto == "gaseosa" ||
  producto == "pollo" ||
  producto == "carne"

) 
{
    switch (producto) {
      case "harina":
        precio = 50;
        break;
      case "leche":
        precio = 100;
        break;
      case "gaseosa":
        precio = 150;
        break;
      case "pollo":
        precio = 400;
        break;
      case "carne":
        precio = 500;
        break;
      default:
        break;
    }
  let unidades = parseInt(
    prompt("Cuantas unidades desea llevar?")
  );

  carrito.push({ producto, unidades, precio });
  console.log(carrito);

} else {
  alert("no tenemos ese prodcto");
}

seleccion = prompt("quiere seguir comprando? (si-no)");

while (seleccion == "no") {
  alert("gracias por la compra!");

  carrito.forEach((carritoFinal) => {
    console.log(
      `"producto:" ${carritoFinal.producto}, "unidades:" ${
        carritoFinal.unidades
      }, "total a pagar por producto:" ${carritoFinal.unidades * carritoFinal.precio}`
    );
  });
  break;
}
}

//al final con el metodo reduce se calcula el total de todos los productos con sus unidades!
const total = carrito.reduce((acc, el) => acc + el.precio * el.unidades, 0)
console.log(`el total a pagar por su compra es de:  ${total}`)