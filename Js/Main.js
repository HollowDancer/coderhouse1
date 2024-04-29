const productos = [
  {
    id: 1,
    nombre: "Huevos",
    precio: 25,
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPyB7IJKK_cPNEfEpRz4x9bPJh8hM9ZbRVg3lpNIS7Q&s",
    cantidad: 1,
  },
  {
    id: 2,
    nombre: "Harina",
    precio: 50,
    img:
      "https://images.ecestaticos.com/WBp24vmd9x9S722ZiqGWgPaf0w0=/0x109:2119x1301/1200x900/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F6be%2F87b%2F448%2F6be87b448c2cf27ea55a994c163556d6.jpg",
    cantidad: 1,
  },
  {
    id: 3,
    nombre: "Leche",
    precio: 100,
    img:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIFTfoNPTrayDyzHMHPuPQGlPhKofQPPWw40zHNyodsA&s",
    cantidad: 1,
  },
  {
    id: 4,
    nombre: "gaseosa",
    precio: 150,
    img:
      "https://mayoristaelgringo.com.ar/wp-content/uploads/2023/01/7798113300010-17.jpg",
    cantidad: 1,
  },
  {
    id: 5,
    nombre: "Pollo",
    precio: 400,
    img:
      "https://masonlineprod.vtexassets.com/arquivos/ids/166612/Pollo-Fresco-X-3-Kg-1-17088.jpg?v=637835138771500000",
    cantidad: 1,
  }, 
  {
    id: 6,
    nombre: "Carne",
    precio: 500,
    img:
      "https://www.cocinista.es/download/bancorecursos/recetas/cocinar-la-carne-de-vacuno.jpg",
    cantidad: 1,
  },
];
const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modal-container");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
  let content = document.createElement("div");
  content.className = "card";
  content.innerHTML = `
    <img src="${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
  `;

  shopContent.append(content);

  let comprar = document.createElement("button");
  comprar.innerText = "comprar";
  comprar.className = "comprar";

  content.append(comprar);

  comprar.addEventListener("click", () => {
    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);

    if (repeat) {
      carrito.map((prod) => {
        if (prod.id === product.id) {
          prod.cantidad++;
        }
      });
    } else {
      carrito.push({
        id: product.id,
        img: product.img,
        nombre: product.nombre,
        precio: product.precio,
        cantidad: product.cantidad,
      });
      console.log(carrito);
      console.log(carrito.length);
      carritoCounter();
      saveLocal();
    }
  });
});

// Elegir producto
const saveLocal = () => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarCarrito = () => {
  modalContainer.innerHTML = "";
  modalContainer.style.display = "flex";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  modalHeader.innerHTML = `
      <h1 class="modal-header-title">Carrito.</h1>
    `;
  modalContainer.append(modalHeader);

  const modalbutton = document.createElement("h1");
  modalbutton.innerText = "x";
  modalbutton.className = "modal-header-button";

  modalbutton.addEventListener("click", () => {
    modalContainer.style.display = "none";
  });

  modalHeader.append(modalbutton);

  carrito.forEach((product) => {
    let carritoContent = document.createElement("div");
    carritoContent.className = "modal-content";
    carritoContent.innerHTML = `
        <img src="${product.img}">
        <h3>${product.nombre}</h3>
        <p>${product.precio} $</p>
        <span class="restar"> - </span>
        <!--recomiendo no escribir la palabra cantidad para que no quede tan largo :)-->
        <p>${product.cantidad}</p>
        <span class="sumar"> + </span>
        <p>Total: ${product.cantidad * product.precio} $</p>
        <span class="delete-product"> ❌ </span>
      `;

    modalContainer.append(carritoContent);

    let restar = carritoContent.querySelector(".restar");

    restar.addEventListener("click", () => {
      if (product.cantidad !== 1) {
        product.cantidad--;
      }
      saveLocal();
      pintarCarrito();
    });

    let sumar = carritoContent.querySelector(".sumar");
    sumar.addEventListener("click", () => {
      product.cantidad++;
      saveLocal();
      pintarCarrito();
    });

    let eliminar = carritoContent.querySelector(".delete-product");

    eliminar.addEventListener("click", () => {
      eliminarProducto(product.id);
    });
  });

  const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

  const totalBuying = document.createElement("div");
  totalBuying.className = "total-content";
  totalBuying.innerHTML = `Total a pagar: ${total} $`;
  modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
  const foundId = carrito.find((element) => element.id === id);

  console.log(foundId);

  carrito = carrito.filter((carritoId) => {
    return carritoId !== foundId;
  });

  carritoCounter();
  saveLocal();
  pintarCarrito();
};

const carritoCounter = () => {
  cantidadCarrito.style.display = "block";

  const carritoLength = carrito.length;

  localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();