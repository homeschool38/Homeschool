/*
  My Muslim Homeschool shared cart

  Add this file before </body> on pages that need cart behavior:
  <script src="assets/cart.js"></script>

  Add product buttons like:
  <button class="mmh-add-to-cart" data-product-id="bundle">Add Bundle to Cart</button>

  Or:
  <a href="#" class="mmh-add-to-cart" data-product-id="bundle">Add Bundle to Cart</a>
*/

(function () {
  const CART_KEY = "mmh_cart_v1";

  const PRODUCTS = {
    bundle: {
      id: "bundle",
      name: "The Complete Muslim Homeschool Bundle",
      priceCents: 3500,
      priceLabel: "$35.00",
      image: "images/products/complete-bundle.png",
      checkoutName: "The Complete Muslim Homeschool Bundle"
    },
    playbook: {
      id: "playbook",
      name: "Morning Routine Playbook",
      priceCents: 700,
      priceLabel: "$7.00",
      image: "images/products/morning-routine-playbook.png",
      checkoutName: "Morning Routine Playbook"
    },
    workbook: {
      id: "workbook",
      name: "Homeschool Reset Workbook",
      priceCents: 1500,
      priceLabel: "$15.00",
      image: "images/products/homeschool-reset-workbook.png",
      checkoutName: "Homeschool Reset Workbook"
    },
    scripts: {
      id: "scripts",
      name: "Open & Teach: 15 Prophet Story Scripts",
      priceCents: 2000,
      priceLabel: "$20.00",
      image: "images/products/prophet-story-scripts.png",
      checkoutName: "Open & Teach: 15 Prophet Story Scripts"
    },
    screenfree: {
      id: "screenfree",
      name: "100 Screen-Free Challenge Cards",
      priceCents: 999,
      priceLabel: "$9.99",
      image: "images/products/screen-free-challenge-cards.png",
      checkoutName: "100 Screen-Free Challenge Cards"
    }
  };

  function readCart() {
    try {
      const parsed = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function formatMoney(cents) {
    return "$" + (cents / 100).toFixed(2);
  }

  function getCartCount() {
    return readCart().reduce(function (sum, item) {
      return sum + Number(item.quantity || 1);
    }, 0);
  }

  function addToCart(productId, quantity) {
    const product = PRODUCTS[productId];
    if (!product) return false;

    const cart = readCart();

    const existing = cart.find(function (item) {
      return item.id === productId;
    });

    if (existing) {
      existing.quantity = Number(existing.quantity || 1) + Number(quantity || 1);
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        priceCents: product.priceCents,
        image: product.image,
        quantity: Number(quantity || 1)
      });
    }

    writeCart(cart);
    showCartPopup(product);
    return true;
  }

  function removeFromCart(productId) {
    const cart = readCart().filter(function (item) {
      return item.id !== productId;
    });

    writeCart(cart);

    if (typeof window.MMH_RENDER_CART_PAGE === "function") {
      window.MMH_RENDER_CART_PAGE();
    }
  }

  function setQuantity(productId, quantity) {
    const qty = Math.max(1, Number(quantity || 1));

    const cart = readCart().map(function (item) {
      if (item.id === productId) {
        item.quantity = qty;
      }
      return item;
    });

    writeCart(cart);

    if (typeof window.MMH_RENDER_CART_PAGE === "function") {
      window.MMH_RENDER_CART_PAGE();
    }
  }

  function getCartTotalCents() {
    return readCart().reduce(function (sum, item) {
      return sum + Number(item.priceCents || 0) * Number(item.quantity || 1);
    }, 0);
  }

  function injectStyles() {
    if (document.getElementById("mmh-cart-styles")) return;

    const style = document.createElement("style");
    style.id = "mmh-cart-styles";

    style.textContent = `
      .mmh-cart-icon {
        position: fixed;
        right: 18px;
        bottom: 18px;
        z-index: 9998;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-width: 56px;
        height: 56px;
        padding: 0 16px;
        border-radius: 999px;
        background: #e8868a;
        color: #ffffff;
        font-family: 'Nunito', system-ui, sans-serif;
        font-weight: 800;
        text-decoration: none;
        box-shadow: 0 12px 30px rgba(232, 134, 138, 0.35);
        border: 2px solid rgba(255,255,255,0.75);
      }

      .mmh-cart-icon:hover {
        background: #f0a882;
        transform: translateY(-1px);
      }

      .mmh-cart-count {
        min-width: 23px;
        height: 23px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        background: #e8c45a;
        color: #2e2e2e;
        font-size: 0.78rem;
        line-height: 1;
      }

      .mmh-cart-popup-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(46, 46, 46, 0.32);
        z-index: 9999;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .mmh-cart-popup-backdrop.active {
        display: flex;
      }

      .mmh-cart-popup {
        width: min(480px, 100%);
        background: #fffdf8;
        border: 1px solid #edddd8;
        border-radius: 24px;
        padding: 28px;
        box-shadow: 0 24px 80px rgba(46,46,46,0.22);
        text-align: center;
        font-family: 'Nunito', system-ui, sans-serif;
        color: #2e2e2e;
      }

      .mmh-popup-check {
        width: 58px;
        height: 58px;
        margin: 0 auto 14px;
        border-radius: 999px;
        display: grid;
        place-items: center;
        background: #edf6f4;
        color: #85b5a8;
        font-size: 32px;
        font-weight: 900;
      }

      .mmh-cart-popup h2 {
        margin: 0 0 8px;
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.55rem;
        line-height: 1.25;
      }

      .mmh-cart-popup p {
        margin: 0 0 20px;
        color: #5a5252;
        line-height: 1.55;
      }

      .mmh-popup-actions {
        display: grid;
        gap: 10px;
      }

      .mmh-popup-actions a,
      .mmh-popup-actions button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        border-radius: 999px;
        border: none;
        padding: 12px 22px;
        font-weight: 900;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        cursor: pointer;
        text-decoration: none;
        font-family: 'Nunito', system-ui, sans-serif;
        font-size: 0.88rem;
      }

      .mmh-review-cart {
        background: #e8868a;
        color: #ffffff;
      }

      .mmh-continue-shopping {
        background: #ffffff;
        color: #5a5252;
        border: 1px solid #edddd8 !important;
      }

      @media (max-width: 640px) {
        .mmh-cart-icon {
          right: 14px;
          bottom: 14px;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function injectCartIcon() {
    if (document.querySelector(".mmh-cart-icon")) return;

    const icon = document.createElement("a");
    icon.className = "mmh-cart-icon";
    icon.href = "cart.html";
    icon.setAttribute("aria-label", "View cart");
    icon.innerHTML = `<span aria-hidden="true">🛒</span><span class="mmh-cart-count">0</span>`;

    document.body.appendChild(icon);
    updateCartCount();
  }

  function updateCartCount() {
    const counts = document.querySelectorAll(".mmh-cart-count");
    const count = getCartCount();

    counts.forEach(function (el) {
      el.textContent = String(count);
    });
  }

  function injectPopup() {
    if (document.getElementById("mmhCartPopup")) return;

    const popup = document.createElement("div");
    popup.id = "mmhCartPopup";
    popup.className = "mmh-cart-popup-backdrop";

    popup.innerHTML = `
      <div class="mmh-cart-popup" role="dialog" aria-modal="true" aria-labelledby="mmhPopupTitle">
        <div class="mmh-popup-check">✓</div>
        <h2 id="mmhPopupTitle">Added to cart</h2>
        <p id="mmhPopupText">Your item has been added to your cart.</p>

        <div class="mmh-popup-actions">
          <a class="mmh-review-cart" href="cart.html">Review Cart</a>
          <a class="mmh-continue-shopping" href="shop.html">Continue Shopping</a>
          <button type="button" class="mmh-continue-shopping" data-mmh-close-popup>Stay Here</button>
        </div>
      </div>
    `;

    popup.addEventListener("click", function (event) {
      if (event.target === popup || event.target.hasAttribute("data-mmh-close-popup")) {
        closeCartPopup();
      }
    });

    document.body.appendChild(popup);
  }

  function showCartPopup(product) {
    injectPopup();

    const popup = document.getElementById("mmhCartPopup");
    const text = document.getElementById("mmhPopupText");

    if (text && product) {
      text.textContent = product.name + " has been added to your cart.";
    }

    popup.classList.add("active");
  }

  function closeCartPopup() {
    const popup = document.getElementById("mmhCartPopup");

    if (popup) {
      popup.classList.remove("active");
    }
  }

  function bindAddButtons() {
    document.querySelectorAll("[data-product-id]").forEach(function (button) {
      button.addEventListener("click", function (event) {
        const productId = button.getAttribute("data-product-id");

        if (!productId) return;

        event.preventDefault();
        addToCart(productId, 1);
      });
    });
  }

  window.MMH_CART = {
    products: PRODUCTS,
    read: readCart,
    write: writeCart,
    add: addToCart,
    remove: removeFromCart,
    setQuantity: setQuantity,
    totalCents: getCartTotalCents,
    formatMoney: formatMoney,
    updateCount: updateCartCount
  };

  document.addEventListener("DOMContentLoaded", function () {
    injectStyles();
    injectCartIcon();
    injectPopup();
    bindAddButtons();
    updateCartCount();
  });
})();
