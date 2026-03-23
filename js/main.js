import { BASE_URL } from "./api.js";
import headerFunc from "./header.js";
import "./products.js";
import searchFunc from "./search.js";

// Genel header işlemleri
headerFunc();

// Arama kısmı için localde ürün yoksa boş dizi ver
searchFunc([]);

//! backend'den sepet sayısını getir
async function updateCartCount() {
  const cartItems = document.querySelector(".header-cart-count");
  if (!cartItems) return;

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("main.js user:", user);

  if (!user) {
    cartItems.innerHTML = "0";
    return;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/cart/${user._id}`);
    const cart = await response.json();

    console.log("main.js cart response:", cart);

    cartItems.innerHTML = cart.length;
  } catch (error) {
    console.error("Sepet sayısı alınamadı:", error);
    cartItems.innerHTML = "0";
  }
}

// sayfa açılınca çalıştır
updateCartCount();

//! modal dialog start
const modalDialogDOM = document.querySelector(".modal-dialog");
const modalContentDOM = document.querySelector(".modal-dialog .modal-content");
const btnCloseDialog = document.querySelector(".modal-dialog .modal-close");

if (btnCloseDialog && modalDialogDOM) {
  btnCloseDialog.addEventListener("click", function () {
    modalDialogDOM.classList.remove("show");
  });
}

if (modalDialogDOM && modalContentDOM) {
  document.addEventListener("click", (e) => {
    if (!e.composedPath().includes(modalContentDOM)) {
      modalDialogDOM.classList.remove("show");
    }
  });

  setTimeout(() => {
    modalDialogDOM.classList.add("show");
  }, 3000);
}
//! modal dialog end