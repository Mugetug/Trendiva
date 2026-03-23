import { BASE_URL } from "./api.js";

async function getCartItems() {
  const user = JSON.parse(localStorage.getItem("user"));
  const cartItemsCount = document.querySelector(".header-cart-count");

  if (!user) {
    if (cartItemsCount) cartItemsCount.innerHTML = "0";
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/api/cart/${user._id}`);
    const cartItems = await response.json();

    if (cartItemsCount) cartItemsCount.innerHTML = cartItems.length;
    return cartItems;
  } catch (error) {
    console.error("Sepet verileri alınamadı:", error);
    return [];
  }
}

async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    return await response.json();
  } catch (error) {
    console.error("Ürünler alınamadı:", error);
    return [];
  }
}

function getProductImage(index) {
  const imageNumber = (index % 4) + 1;
  return `img/products/product${imageNumber}/1.png`;
}

async function removeCartItem(cartItemId) {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/item/${cartItemId}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (response.ok) {
      alert("Ürün sepetten kaldırıldı");
      displayCartProduct();
    } else {
      alert(data.message || "Ürün silinemedi");
    }
  } catch (error) {
    console.error("Sepetten silme hatası:", error);
    alert("Sunucu hatası");
  }
}

async function displayCartProduct() {
  const cartWrapper = document.querySelector(".cart-wrapper");
  if (!cartWrapper) return;

  const cart = await getCartItems();
  const products = await getProducts();

  let result = "";

  cart.forEach((item) => {
    const matchedProduct = products.find((p) => p._id === item.productId);
    const productIndex = matchedProduct
      ? products.findIndex((p) => p._id === item.productId)
      : 0;

    const productName = matchedProduct ? matchedProduct.name : "Ürün";
    const productPrice = matchedProduct ? matchedProduct.price : 0;
    const productImage = getProductImage(productIndex);
    const subtotal = productPrice * item.quantity;

    result += `
      <tr class="cart-item">
        <td></td>
        <td class="cart-image">
          <img src="${productImage}" alt="">
          <i class="bi bi-x delete-cart" data-id="${item._id}"></i>
        </td>
        <td>${productName}</td>
        <td>₺${productPrice.toFixed(2)}</td>
        <td class="product-quantity">${item.quantity}</td>
        <td class="product-subtotal">₺${subtotal.toFixed(2)}</td>
      </tr>
    `;
  });

  if (result === "") {
    result = `
      <tr>
        <td colspan="6">Sepetiniz boş.</td>
      </tr>
    `;
  }

  cartWrapper.innerHTML = result;

  const deleteButtons = document.querySelectorAll(".delete-cart");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      removeCartItem(button.dataset.id);
    });
  });

  saveCartValues(cart, products);
}

function saveCartValues(cart, products) {
  const cartTotal = document.getElementById("cart-total");
  const subtotal = document.getElementById("subtotal");
  const fastCargo = document.getElementById("fast-cargo");
  const fastCargoPrice = 15;

  if (!cartTotal || !subtotal) return;

  let itemsTotal = 0;

  cart.forEach((item) => {
    const matchedProduct = products.find((p) => p._id === item.productId);
    const productPrice = matchedProduct ? matchedProduct.price : 0;
    itemsTotal += productPrice * item.quantity;
  });

  subtotal.innerHTML = `₺${itemsTotal.toFixed(2)}`;
  cartTotal.innerHTML = `₺${itemsTotal.toFixed(2)}`;

  if (fastCargo) {
    fastCargo.addEventListener("change", function (e) {
      if (e.target.checked) {
        cartTotal.innerHTML = `₺${(itemsTotal + fastCargoPrice).toFixed(2)}`;
      } else {
        cartTotal.innerHTML = `₺${itemsTotal.toFixed(2)}`;
      }
    });
  }
}

displayCartProduct();