import {
  BASE_URL
} from "./api.js";
console.log("products.js yüklendi");

function productRoute() {
  const productLinks = document.querySelectorAll(".product-link");

  productLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const clickedLink = e.currentTarget;
      const id = clickedLink.dataset.id;

      console.log("Detaya giden ürün id:", id);

      if (!id) {
        alert("Ürün id bulunamadı");
        return;
      }

      localStorage.setItem("productId", JSON.stringify(id));
      window.location.href = "single-product.html";
    });
  });
}

function addToCart() {
  document.addEventListener("click", async function (e) {
    const clickedButton = e.target.closest(".add-to-cart");
    if (!clickedButton) return;

    console.log("sepete tıklandı");

    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Önce giriş yapmalısınız");
      return;
    }

    const productId = clickedButton.dataset.id;
    console.log("Tıklanan buton ID:", productId);

    if (!productId) {
      alert("Bu ürün için id bulunamadı");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: user._id,
          productId: productId,
          quantity: 1
        })
      });

      const data = await response.json();
      console.log("Sepet response:", data);

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

function productsFunc(products) {
  const productsContainer = document.getElementById("product-list");
  if (!productsContainer) return;

  let results = "";

  products.forEach((item) => {
    results += `
      <li class="product-item">
        <div class="product-image">
          <a href="#" class="product-link" data-id="${item.id}">
            <img src="${item.img.singleImage}" alt="" class="img1">
            <img src="${item.img.thumbs[1]}" alt="" class="img2">
          </a>
        </div>
        <div class="product-info">
          <a href="#" class="product-title product-link" data-id="${item.id}">${item.name}</a>
          <ul class="product-star">
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-fill"></i></li>
            <li><i class="bi bi-star-half"></i></li>
          </ul>
          <div class="product-prices">
            <strong class="new-price">₺${item.price.newPrice.toFixed(2)}</strong>
            <span class="old-price">₺${item.price.oldPrice.toFixed(2)}</span>
          </div>
          <span class="product-discount">-%${item.discount}</span>
          <div class="product-links">
            <button class="add-to-cart" data-id="${item.id}">
              <i class="bi bi-basket-fill"></i>
            </button>
            <button>
              <i class="bi bi-heart-fill"></i>
            </button>
            <a href="#" class="product-link" data-id="${item.id}">
              <i class="bi bi-eye-fill"></i>
            </a>
            <a href="#">
              <i class="bi bi-share-fill"></i>
            </a>
          </div>
        </div>
      </li>
    `;
  });

  productsContainer.innerHTML = results;

  addToCart();
  productRoute();
}

function attachIdsToStaticCards(products) {
  const basketIcons = document.querySelectorAll(".product-carousel2 .bi-basket-fill");

  basketIcons.forEach((icon, index) => {
    const button = icon.closest("button");

    if (button && products[index]) {
      button.dataset.id = products[index]._id;
      console.log("ID atandı:", products[index]._id);
    }
  });
}

async function getProductsFromAPI() {
  try {
    const response = await fetch(`${BASE_URL}/api/products`);
    const data = await response.json();
    console.log("API’den gelen ürünler:", data);

    attachIdsToStaticCards(data);

    const formattedProducts = data.map((item, index) => {
      const imageNumber = (index % 4) + 1;

      return {
        id: item._id,
        name: item.name,
        price: {
          newPrice: item.price,
          oldPrice: item.price + 200
        },
        img: {
          singleImage: `img/products/product${imageNumber}/1.png`,
          thumbs: [
            `img/products/product${imageNumber}/1.png`,
            `img/products/product${imageNumber}/2.png`
          ]
        },
        discount: 10
      };
    });

    productsFunc(formattedProducts);
  } catch (error) {
    console.error("Ürünleri çekme hatası:", error);
  }
}

getProductsFromAPI();

export default productsFunc;