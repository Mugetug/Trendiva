import { BASE_URL } from "./api.js";
import { thumbsActiveFunc } from "./single-product/thumbsActive.js";
import zoomFunc from "./single-product/zoom.js";
import colorsFunc from "./single-product/colors.js";
import valuesFunc from "./single-product/values.js";
import tabsFunc from "./single-product/tabs.js";
import commentsFunc from "./single-product/comments.js";

const productId = localStorage.getItem("productId")
  ? JSON.parse(localStorage.getItem("productId"))
  : null;

function getProductImages(index) {
  const imageNumber = (index % 4) + 1;
  return {
    singleImage: `img/products/product${imageNumber}/1.png`,
    thumbs: [
      `img/products/product${imageNumber}/1.png`,
      `img/products/product${imageNumber}/2.png`,
      `img/products/product${imageNumber}/3.png`,
    ],
  };
}

async function loadSingleProduct() {
  if (!productId) return;

  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const products = await response.json();

    const findProduct = products.find((item) => item._id === productId);

    if (!findProduct) {
      console.error("Ürün bulunamadı");
      return;
    }

    const productIndex = products.findIndex((item) => item._id === productId);
    const productImages = getProductImages(productIndex);

    const productTitle = document.querySelector(".product-title");
    const newPriceDOM = document.querySelector(".new-price");
    const oldPriceDOM = document.querySelector(".old-price");
    const singleImageDOM = document.querySelector("#single-image");
    const galleryThumbs = document.querySelector(".gallery-thumbs");

    if (productTitle) productTitle.innerHTML = findProduct.name;
    if (newPriceDOM) newPriceDOM.innerHTML = `₺${findProduct.price.toFixed(2)}`;
    if (oldPriceDOM) oldPriceDOM.innerHTML = `₺${(findProduct.price + 200).toFixed(2)}`;
    if (singleImageDOM) singleImageDOM.src = productImages.singleImage;

    let result = "";
    productImages.thumbs.forEach((item) => {
      result += `
        <li class="glide__slide">
          <img src="${item}" alt="" class="img-fluid">
        </li>
      `;
    });

    if (galleryThumbs) {
      galleryThumbs.innerHTML = result;
      thumbsActiveFunc();
    }

    const productThumbs = document.querySelectorAll(".product-thumb .glide__slide img");
    if (productThumbs.length > 0) {
      productThumbs[0].classList.add("active");
    }

    const btnAddToCart = document.getElementById("add-to-cart");
    const quantityDOM = document.getElementById("quantity");

    if (btnAddToCart) {
      btnAddToCart.addEventListener("click", async function () {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          alert("Önce giriş yapmalısınız");
          return;
        }

        try {
          const response = await fetch(`${BASE_URL}/api/cart`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user._id,
              productId: findProduct._id,
              quantity: Number(quantityDOM?.value || 1),
            }),
          });

          const data = await response.json();

          if (response.ok) {
            alert("Ürün sepete eklendi");

            const cartCount = document.querySelector(".header-cart-count");
            if (cartCount) {
              const currentCount = Number(cartCount.innerHTML) || 0;
              cartCount.innerHTML = currentCount + 1;
            }
          } else {
            alert(data.message || "Sepete eklenemedi");
          }
        } catch (error) {
          console.error("Sepete ekleme hatası:", error);
          alert("Sunucu hatası");
        }
      });
    }

    zoomFunc();
    colorsFunc();
    valuesFunc();
    tabsFunc();
    commentsFunc();
  } catch (error) {
    console.error("Ürün detayı alınamadı:", error);
  }
}

loadSingleProduct();