/**
 * CRAZY FASHION - E-COMMERCE CORE SCRIPT
 * Handles: Product Rendering, Filters, Cart State, Wishlist,
 * Quick View, Coupon Validation, and Checkout Transaction Processing
 */

// ==========================================================================
// 1. PRODUCT CATALOG DATA
// ==========================================================================
const PRODUCTS = [
  {
    id: 1,
    name: "Brown Waves Artisanal Shirt",
    category: "shirts",
    price: 499,
    mrp: 699,
    badge: "50% OFF",
    badgeType: "sale",
    rating: 4.8,
    reviewsCount: 142,
    image: "assets/files/brown shirt 1.png",
    sizes: ["S", "M", "L", "XL"],
    description: "A perfect blend of luxury and versatility. Handcrafted from fine breathable cotton to keep you comfortable while looking effortlessly stylish."
  },
  {
    id: 2,
    name: "Classic Floral Brown Shirt",
    category: "shirts",
    price: 399,
    mrp: 599,
    badge: "Trending",
    badgeType: "new",
    rating: 4.7,
    reviewsCount: 98,
    image: "assets/files/brown shirt 2.png",
    sizes: ["M", "L", "XL"],
    description: "Experience premium craftsmanship with subtle floral elegance. Designed with soft woven fabric and a comfortable tailored fit."
  },
  {
    id: 3,
    name: "Doodle White Cuban Shirt",
    category: "shirts",
    price: 499,
    mrp: 599,
    badge: "Hot Drop",
    badgeType: "sale",
    rating: 4.9,
    reviewsCount: 215,
    image: "assets/files/Shirt 4.jpeg",
    sizes: ["S", "M", "L", "XL"],
    description: "A statement white Cuban-collar resort shirt with eye-catching abstract doodle graphics and lightweight breezy texture."
  },
  {
    id: 4,
    name: "Royal Oxford Premium Shirt",
    category: "shirts",
    price: 599,
    mrp: 899,
    badge: "Bestseller",
    badgeType: "new",
    rating: 4.8,
    reviewsCount: 176,
    image: "assets/files/Shirt 1.jpg",
    sizes: ["M", "L", "XL"],
    description: "Crafted with 100% fine cotton yarn in a classic Oxford weave. Perfect for day-to-night transitions."
  },
  {
    id: 5,
    name: "Urban Relaxed Casual Shirt",
    category: "shirts",
    price: 450,
    mrp: 699,
    badge: "Sale",
    badgeType: "sale",
    rating: 4.6,
    reviewsCount: 84,
    image: "assets/files/shirt 2.jpg",
    sizes: ["S", "M", "L"],
    description: "Minimalist everyday casual button-down shirt made for effortless weekend outings and daily comfort."
  },
  {
    id: 6,
    name: "Vintage Indigo Woven Shirt",
    category: "shirts",
    price: 549,
    mrp: 799,
    badge: "Popular",
    badgeType: "new",
    rating: 4.7,
    reviewsCount: 110,
    image: "assets/files/shirt 3.jpg",
    sizes: ["M", "L", "XL"],
    description: "Rich indigo-dyed fabric featuring contrasting wood-finish buttons and reinforced double stitching."
  },
  {
    id: 7,
    name: "Arctic Blue Wide Denim Jeans",
    category: "jeans",
    price: 799,
    mrp: 1099,
    badge: "Trending",
    badgeType: "sale",
    rating: 4.9,
    reviewsCount: 310,
    image: "assets/files/pant 1.jpeg",
    sizes: ["30", "32", "34", "36"],
    description: "Refresh your street style with loose wide-leg premium jeans crafted from sturdy yet supple authentic denim."
  },
  {
    id: 8,
    name: "Midnight Black Tapered Denim",
    category: "jeans",
    price: 899,
    mrp: 1199,
    badge: "Hot",
    badgeType: "sale",
    rating: 4.8,
    reviewsCount: 260,
    image: "assets/files/pant 2.jpeg",
    sizes: ["30", "32", "34", "36"],
    description: "Deep jet-black stretch denim that holds its shape. Sleek modern silhouette pairing cleanly with sneakers or boots."
  },
  {
    id: 9,
    name: "Luxury Cotton Stretch Trousers",
    category: "jeans",
    price: 799,
    mrp: 1000,
    badge: "Essential",
    badgeType: "new",
    rating: 4.7,
    reviewsCount: 154,
    image: "assets/files/pants.jpeg",
    sizes: ["30", "32", "34", "36"],
    description: "Breathable cotton chinos with a hint of elastane for flexibility. Ideal for smart office wear or weekend events."
  },
  {
    id: 10,
    name: "Essential Heavyweight T-Shirt",
    category: "tshirts",
    price: 499,
    mrp: 699,
    badge: "Streetwear",
    badgeType: "new",
    rating: 4.8,
    reviewsCount: 420,
    image: "assets/files/group tshirt.jpeg",
    sizes: ["S", "M", "L", "XL"],
    description: "240 GSM heavy combed cotton tee with drop shoulders and a clean rib-knit collar that never sags."
  },
  {
    id: 11,
    name: "Exclusive Trio Collection Shirts",
    category: "shirts",
    price: 999,
    mrp: 1999,
    badge: "Bundle Deal",
    badgeType: "sale",
    rating: 5.0,
    reviewsCount: 89,
    image: "assets/files/group shirt.jpeg",
    sizes: ["M", "L", "XL"],
    description: "Limited-edition luxury bundle set featuring our top curated shirt cuts in three seasonal colorways."
  },
  {
    id: 12,
    name: "Autumn Corduroy Casual Shirt",
    category: "shirts",
    price: 649,
    mrp: 999,
    badge: "New Season",
    badgeType: "new",
    rating: 4.8,
    reviewsCount: 132,
    image: "Casual Shirt.jpeg",
    sizes: ["S", "M", "L", "XL"],
    description: "Warm-toned textured overshirt, great as a lightweight jacket over tees or buttoned up solo."
  }
];

// ==========================================================================
// 2. APPLICATION STATE
// ==========================================================================
const state = {
  cart: JSON.parse(localStorage.getItem("crazy_cart") || "[]"),
  wishlist: JSON.parse(localStorage.getItem("crazy_wishlist") || "[]"),
  selectedCategory: "all",
  searchQuery: "",
  sortBy: "featured",
  activeCoupon: null,
  coupons: {
    CRAZY50: 0.50, // 50% off
    WELCOME10: 0.10, // 10% off
    FREESHIP: "free_shipping"
  },
  selectedSizes: {} // productId -> size string
};

// ==========================================================================
// 3. DOM ELEMENT REFERENCES (Dynamic & Safe)
// ==========================================================================
let elements = {};

function initElements() {
  elements = {
    productsGrid: document.getElementById("products-grid"),
    searchInput: document.getElementById("search-input"),
    searchClearBtn: document.getElementById("search-clear-btn"),
    searchContainer: document.getElementById("search-container"),
    searchCategorySelect: document.getElementById("search-category-select"),
    searchDropdown: document.getElementById("search-dropdown"),
    searchCategoriesList: document.getElementById("search-categories-list"),
    searchResultsSection: document.getElementById("search-results-section"),
    searchResultsList: document.getElementById("search-results-list"),
    searchResultsCount: document.getElementById("search-results-count"),
    categoryPills: document.querySelectorAll(".pill-btn"),
    sortSelect: document.getElementById("sort-select"),
    cartCountBadge: document.getElementById("cart-count-badge"),
    wishlistCountBadge: document.getElementById("wishlist-count-badge"),

    // Cart Drawer
    cartToggleBtn: document.getElementById("cart-toggle-btn"),
    cartDrawer: document.getElementById("cart-drawer"),
    drawerBackdrop: document.getElementById("drawer-backdrop"),
    cartCloseBtn: document.getElementById("cart-close-btn"),
    cartItemsContainer: document.getElementById("cart-items-container"),
    cartEmptyView: document.getElementById("cart-empty-view"),
    cartSubtotal: document.getElementById("cart-subtotal"),
    cartDiscountRow: document.getElementById("cart-discount-row"),
    cartDiscount: document.getElementById("cart-discount"),
    cartShipping: document.getElementById("cart-shipping"),
    cartTotal: document.getElementById("cart-total"),
    couponInput: document.getElementById("coupon-input"),
    applyCouponBtn: document.getElementById("apply-coupon-btn"),
    checkoutDrawerBtn: document.getElementById("checkout-drawer-btn"),

    // Checkout Modal
    checkoutModal: document.getElementById("checkout-modal"),
    checkoutCloseBtn: document.getElementById("checkout-close-btn"),
    checkoutForm: document.getElementById("checkout-form"),
    checkoutSubtotal: document.getElementById("checkout-subtotal"),
    checkoutTotal: document.getElementById("checkout-total"),
    paymentCards: document.querySelectorAll(".payment-card"),
    selectedPaymentInput: document.getElementById("selected-payment-method"),
    transactionProcessing: document.getElementById("transaction-processing"),
    transactionSuccess: document.getElementById("transaction-success"),
    checkoutFormView: document.getElementById("checkout-form-view"),

    // Quick View Modal
    quickViewModal: document.getElementById("quick-view-modal"),
    quickViewCloseBtn: document.getElementById("quick-view-close-btn"),
    quickViewContent: document.getElementById("quick-view-content"),

    // Wishlist Modal
    wishlistToggleBtn: document.getElementById("wishlist-toggle-btn"),
    wishlistModal: document.getElementById("wishlist-modal"),
    wishlistCloseBtn: document.getElementById("wishlist-close-btn"),
    wishlistContainer: document.getElementById("wishlist-container"),

    // Toast Container
    toastContainer: document.getElementById("toast-container"),

    // Contact Form
    contactForm: document.getElementById("contact-form"),
    headerWrapper: document.querySelector(".header-wrapper"),
    mobileNavToggle: document.getElementById("mobile-nav-toggle"),
    navigation: document.querySelector(".navigation")
  };
}

// ==========================================================================
// 4. STORAGE HELPERS
// ==========================================================================
function saveCart() {
  localStorage.setItem("crazy_cart", JSON.stringify(state.cart));
  updateBadges();
}

function saveWishlist() {
  localStorage.setItem("crazy_wishlist", JSON.stringify(state.wishlist));
  updateBadges();
}

function updateBadges() {
  const totalCartQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
  if (elements.cartCountBadge) {
    elements.cartCountBadge.textContent = totalCartQty;
    elements.cartCountBadge.classList.remove("badge-bounce");
    void elements.cartCountBadge.offsetWidth; // trigger reflow
    elements.cartCountBadge.classList.add("badge-bounce");
  }

  const wishlistCount = state.wishlist.length;
  if (elements.wishlistCountBadge) {
    elements.wishlistCountBadge.textContent = wishlistCount;
  }
}

// ==========================================================================
// 4.1 HAPTIC AUDIO CHIME FEEDBACK (Web Audio API)
// ==========================================================================
function playChime(type = "cart") {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
      osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); // C6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } else {
      // Cart chime
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.08); // A5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    }
  } catch (err) {
    // Audio Context restricted or unavailable, gracefully ignore
  }
}

// ==========================================================================
// 5. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = "success") {
  if (!elements.toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  const icon = type === "success" ? "fa-circle-check" : type === "danger" ? "fa-circle-exclamation" : "fa-bell";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span class="toast-msg">${message}</span>
  `;

  elements.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hide");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// ==========================================================================
// 6. PRODUCT RENDERING & FILTERING
// ==========================================================================
function getFilteredProducts() {
  return PRODUCTS.filter((product) => {
    // Category match
    const matchesCategory =
      state.selectedCategory === "all" || product.category === state.selectedCategory;

    // Search query match
    const query = state.searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (state.sortBy === "price-asc") return a.price - b.price;
    if (state.sortBy === "price-desc") return b.price - a.price;
    if (state.sortBy === "rating") return b.rating - a.rating;
    return a.id - b.id; // Default featured
  });
}

function renderProducts() {
  const grid = elements.productsGrid || document.getElementById("products-grid");
  if (!grid) return;
  elements.productsGrid = grid;

  const productsToRender = getFilteredProducts();

  if (productsToRender.length === 0) {
    grid.innerHTML = `
      <div class="store-empty">
        <i class="fa-solid fa-box-open"></i>
        <h3>No matching garments found</h3>
        <p>Try searching for shirts, trousers, denim, or reset your filters.</p>
        <button class="btn-primary" style="margin-top: 16px;" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = productsToRender
    .map((product) => {
      const isWishlisted = state.wishlist.includes(product.id);
      const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);
      const selectedSize = state.selectedSizes[product.id] || product.sizes[0];

      return `
      <article class="product-card" data-id="${product.id}">
        <div class="card-img-wrap">
          <span class="card-badge ${product.badgeType === "sale" ? "sale" : "new"}">${product.badge}</span>
          <button class="wishlist-btn ${isWishlisted ? "active" : ""}" 
                  onclick="toggleWishlist(${product.id})" 
                  title="${isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}"
                  aria-label="Wishlist">
            <i class="fa-${isWishlisted ? "solid" : "regular"} fa-heart"></i>
          </button>
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="quick-view-overlay-btn" onclick="openQuickView(${product.id})">
            <i class="fa-regular fa-eye"></i> Quick View
          </button>
        </div>

        <div class="card-content">
          <span class="card-category">${product.category}</span>
          <h3 class="card-title">${product.name}</h3>
          
          <div class="card-rating">
            <i class="fa-solid fa-star"></i>
            <strong>${product.rating}</strong>
            <span>(${product.reviewsCount})</span>
          </div>

          <div class="card-pricing">
            <span class="price-current">₹${product.price}</span>
            <span class="price-mrp">₹${product.mrp}</span>
            <span class="price-discount-tag">${discountPercent}% OFF</span>
          </div>

          <!-- Size Selection -->
          <div class="card-sizes" data-product-id="${product.id}">
            <span style="font-size: 0.75rem; font-weight: 600; color: var(--text-muted); margin-right: 4px;">Size:</span>
            ${product.sizes
              .map(
                (size) => `
              <button class="size-btn ${size === selectedSize ? "active" : ""}" 
                      onclick="selectSize(${product.id}, '${size}', event)">
                ${size}
              </button>
            `
              )
              .join("")}
          </div>

          <!-- Card Actions -->
          <div class="card-actions">
            <button class="btn-card-cart" onclick="addToCart(${product.id})">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
            <button class="btn-card-buy" onclick="buyNow(${product.id})">
              <i class="fa-solid fa-bolt"></i> Buy Now
            </button>
          </div>
        </div>
      </article>
    `;
    })
    .join("");
}

// Window global helper for setting category from anywhere
window.setCategory = function (category) {
  state.selectedCategory = category;

  if (elements.searchCategorySelect) {
    elements.searchCategorySelect.value = category;
  }

  if (elements.categoryPills) {
    elements.categoryPills.forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.category === category);
    });
  }

  const catItems = document.querySelectorAll(".search-cat-item");
  catItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.category === category);
  });

  renderProducts();
};

// Window global helper for resetting filters
window.resetFilters = function () {
  state.selectedCategory = "all";
  state.searchQuery = "";
  if (elements.searchInput) elements.searchInput.value = "";
  if (elements.searchCategorySelect) elements.searchCategorySelect.value = "all";
  if (elements.searchClearBtn) elements.searchClearBtn.classList.remove("visible");
  if (elements.categoryPills) {
    elements.categoryPills.forEach((pill) => {
      pill.classList.toggle("active", pill.dataset.category === "all");
    });
  }
  const catItems = document.querySelectorAll(".search-cat-item");
  catItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.category === "all");
  });
  renderProducts();
};

window.selectSize = function (productId, size, event) {
  event.stopPropagation();
  state.selectedSizes[productId] = size;
  const container = document.querySelector(`.card-sizes[data-product-id="${productId}"]`);
  if (container) {
    container.querySelectorAll(".size-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.textContent.trim() === size);
    });
  }
};

// ==========================================================================
// 7. WISHLIST FUNCTIONALITY
// ==========================================================================
window.toggleWishlist = function (productId) {
  const index = state.wishlist.indexOf(productId);
  const product = PRODUCTS.find((p) => p.id === productId);

  if (index > -1) {
    state.wishlist.splice(index, 1);
    showToast(`Removed "${product ? product.name : "Item"}" from Wishlist`);
  } else {
    state.wishlist.push(productId);
    showToast(`Added "${product ? product.name : "Item"}" to Wishlist ❤️`);
  }

  saveWishlist();
  renderProducts();
  if (elements.wishlistModal && elements.wishlistModal.classList.contains("active")) {
    renderWishlistModal();
  }
};

function renderWishlistModal() {
  if (!elements.wishlistContainer) return;

  if (state.wishlist.length === 0) {
    elements.wishlistContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <i class="fa-regular fa-heart" style="font-size: 3rem; color: var(--border-subtle); margin-bottom: 12px; display: block;"></i>
        <h4>Your Wishlist is Empty</h4>
        <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 6px;">Tap the heart on any product to save items you love.</p>
      </div>
    `;
    return;
  }

  const wishlistProducts = PRODUCTS.filter((p) => state.wishlist.includes(p.id));

  elements.wishlistContainer.innerHTML = wishlistProducts
    .map(
      (product) => `
    <div style="display: flex; gap: 14px; align-items: center; padding: 12px 0; border-bottom: 1px solid var(--border-subtle);">
      <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 75px; object-fit: cover; border-radius: var(--radius-sm);">
      <div style="flex: 1;">
        <h5 style="font-size: 0.92rem; margin-bottom: 2px;">${product.name}</h5>
        <div style="font-weight: 800; color: var(--primary);">₹${product.price}</div>
      </div>
      <button class="btn-primary" style="padding: 8px 14px; font-size: 0.8rem;" onclick="addToCart(${product.id}); toggleWishlist(${product.id});">
        Move to Cart
      </button>
      <button onclick="toggleWishlist(${product.id})" style="color: var(--danger); padding: 8px;" title="Remove">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `
    )
    .join("");
}

// ==========================================================================
// 8. CART OPERATIONS
// ==========================================================================
window.addToCart = function (productId, customSize = null) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const size = customSize || state.selectedSizes[productId] || product.sizes[0];
  const existingItem = state.cart.find(
    (item) => item.productId === productId && item.size === size
  );

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    state.cart.push({
      productId: product.id,
      size: size,
      qty: 1
    });
  }

  saveCart();
  renderCartDrawer();
  playChime("cart");
  showToast(`"${product.name}" (${size}) added to Cart 🛒`);
};

window.buyNow = function (productId) {
  addToCart(productId);
  openCartDrawer();
};

window.updateCartQty = function (productId, size, delta) {
  const itemIndex = state.cart.findIndex(
    (item) => item.productId === productId && item.size === size
  );
  if (itemIndex === -1) return;

  state.cart[itemIndex].qty += delta;

  if (state.cart[itemIndex].qty <= 0) {
    state.cart.splice(itemIndex, 1);
  }

  saveCart();
  renderCartDrawer();
};

window.removeFromCart = function (productId, size) {
  state.cart = state.cart.filter(
    (item) => !(item.productId === productId && item.size === size)
  );
  saveCart();
  renderCartDrawer();
  showToast("Item removed from Cart");
};

function getCartCalculations() {
  let subtotal = 0;
  state.cart.forEach((item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    if (product) {
      subtotal += product.price * item.qty;
    }
  });

  let discount = 0;
  if (state.activeCoupon) {
    if (typeof state.activeCoupon.discount === "number") {
      discount = Math.round(subtotal * state.activeCoupon.discount);
    }
  }

  const shipping = subtotal > 999 || state.activeCoupon?.code === "FREESHIP" || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, grandTotal };
}

function renderCartDrawer() {
  if (!elements.cartItemsContainer) return;

  if (state.cart.length === 0) {
    elements.cartItemsContainer.style.display = "none";
    if (elements.cartEmptyView) elements.cartEmptyView.style.display = "block";
    if (elements.checkoutDrawerBtn) elements.checkoutDrawerBtn.disabled = true;
  } else {
    elements.cartItemsContainer.style.display = "block";
    if (elements.cartEmptyView) elements.cartEmptyView.style.display = "none";
    if (elements.checkoutDrawerBtn) elements.checkoutDrawerBtn.disabled = false;

    elements.cartItemsContainer.innerHTML = state.cart
      .map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);
        if (!product) return "";

        return `
        <div class="cart-item">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img">
          <div class="cart-item-details">
            <h4 class="cart-item-title">${product.name}</h4>
            <div class="cart-item-meta">Size: <strong>${item.size}</strong></div>
            
            <div class="cart-item-bottom">
              <span class="cart-item-price">₹${product.price * item.qty}</span>
              <div class="qty-controls">
                <button class="qty-btn" onclick="updateCartQty(${product.id}, '${item.size}', -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="updateCartQty(${product.id}, '${item.size}', 1)">+</button>
              </div>
              <button class="cart-item-remove" onclick="removeFromCart(${product.id}, '${item.size}')" title="Delete">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  const { subtotal, discount, shipping, grandTotal } = getCartCalculations();

  if (elements.cartSubtotal) elements.cartSubtotal.textContent = `₹${subtotal}`;
  if (elements.cartDiscount) elements.cartDiscount.textContent = `-₹${discount}`;
  if (elements.cartDiscountRow) {
    elements.cartDiscountRow.style.display = discount > 0 ? "flex" : "none";
  }
  if (elements.cartShipping) {
    elements.cartShipping.textContent = shipping === 0 ? "FREE" : `₹${shipping}`;
  }
  if (elements.cartTotal) elements.cartTotal.textContent = `₹${grandTotal}`;
}

// Drawer Controls
function openCartDrawer() {
  renderCartDrawer();
  if (elements.cartDrawer) elements.cartDrawer.classList.add("active");
  if (elements.drawerBackdrop) elements.drawerBackdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCartDrawer() {
  if (elements.cartDrawer) elements.cartDrawer.classList.remove("active");
  if (elements.drawerBackdrop) elements.drawerBackdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// ==========================================================================
// 9. COUPON SYSTEM
// ==========================================================================
function applyCoupon() {
  if (!elements.couponInput) return;
  const code = elements.couponInput.value.trim().toUpperCase();

  if (!code) {
    showToast("Please enter a discount code", "danger");
    return;
  }

  if (state.coupons[code]) {
    state.activeCoupon = {
      code: code,
      discount: state.coupons[code]
    };
    renderCartDrawer();
    showToast(`Coupon "${code}" applied successfully! 🎉`);
  } else {
    showToast("Invalid promo code. Try 'CRAZY50' for 50% OFF", "danger");
  }
}

// ==========================================================================
// 10. TRANSACTION & CHECKOUT SIMULATION FLOW
// ==========================================================================
function openCheckoutModal() {
  if (state.cart.length === 0) {
    showToast("Your cart is empty!", "danger");
    return;
  }

  closeCartDrawer();
  const { subtotal, grandTotal } = getCartCalculations();

  if (elements.checkoutSubtotal) elements.checkoutSubtotal.textContent = `₹${subtotal}`;
  if (elements.checkoutTotal) elements.checkoutTotal.textContent = `₹${grandTotal}`;

  // Reset modal screens
  if (elements.checkoutFormView) elements.checkoutFormView.style.display = "block";
  if (elements.transactionProcessing) elements.transactionProcessing.classList.remove("visible");
  if (elements.transactionSuccess) elements.transactionSuccess.classList.remove("visible");

  if (elements.checkoutModal) elements.checkoutModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeCheckoutModal() {
  if (elements.checkoutModal) elements.checkoutModal.classList.remove("active");
  document.body.style.overflow = "";
}

function handleCheckoutSubmission(e) {
  e.preventDefault();

  const fullName = document.getElementById("checkout-name").value.trim();
  const phone = document.getElementById("checkout-phone").value.trim();
  const address = document.getElementById("checkout-address").value.trim();
  const paymentMethod = elements.selectedPaymentInput ? elements.selectedPaymentInput.value : "card";

  if (!fullName || !phone || !address) {
    showToast("Please fill in all delivery details", "danger");
    return;
  }

  // Step 1: Switch to Transaction Processing Screen with smooth animation
  if (elements.checkoutFormView) elements.checkoutFormView.style.display = "none";
  if (elements.transactionProcessing) elements.transactionProcessing.classList.add("visible");

  const orderId = "CF-" + Math.floor(100000 + Math.random() * 900000);
  const now = new Date();
  const orderDate = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const { grandTotal } = getCartCalculations();
  const purchasedItems = [...state.cart];

  // Simulate payment gateway response delay
  setTimeout(() => {
    if (elements.transactionProcessing) elements.transactionProcessing.classList.remove("visible");
    if (elements.transactionSuccess) elements.transactionSuccess.classList.add("visible");

    // Populate Receipt Details
    const receiptBox = document.getElementById("receipt-details");
    if (receiptBox) {
      receiptBox.innerHTML = `
        <div class="receipt-row"><span>Order ID:</span> <strong>#${orderId}</strong></div>
        <div class="receipt-row"><span>Date:</span> <span>${orderDate}</span></div>
        <div class="receipt-row"><span>Customer:</span> <span>${fullName}</span></div>
        <div class="receipt-row"><span>Payment Via:</span> <span style="text-transform: uppercase;">${paymentMethod}</span></div>
        <div class="receipt-row"><span>Items Count:</span> <span>${purchasedItems.length} items</span></div>
        <div class="receipt-row bold"><span>Total Amount Paid:</span> <span style="color: var(--primary);">₹${grandTotal}</span></div>
      `;
    }

    // Clear cart after successful transaction
    state.cart = [];
    state.activeCoupon = null;
    saveCart();
    renderCartDrawer();

    playChime("success");
    showToast(`Payment successful! Order #${orderId} placed 🎉`);
  }, 2200);
}

// ==========================================================================
// 11. QUICK VIEW MODAL
// ==========================================================================
window.openQuickView = function (productId) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product || !elements.quickViewContent) return;

  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  elements.quickViewContent.innerHTML = `
    <div class="quick-view-card">
      <button class="quick-view-close" onclick="closeQuickView()">&times;</button>
      <img src="${product.image}" alt="${product.name}" class="quick-view-img">
      <div class="quick-view-content">
        <span class="card-category">${product.category}</span>
        <h2 style="font-family: 'Cinzel', serif; font-size: 1.6rem; margin-bottom: 8px;">${product.name}</h2>
        
        <div class="card-rating" style="margin-bottom: 14px;">
          <i class="fa-solid fa-star"></i>
          <strong>${product.rating}</strong>
          <span>(${product.reviewsCount} customer reviews)</span>
        </div>

        <div class="card-pricing" style="margin-bottom: 20px;">
          <span class="price-current" style="font-size: 1.6rem;">₹${product.price}</span>
          <span class="price-mrp" style="font-size: 1.1rem;">₹${product.mrp}</span>
          <span class="price-discount-tag" style="font-size: 0.9rem;">${discountPercent}% OFF</span>
        </div>

        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.7; margin-bottom: 20px;">
          ${product.description}
        </p>

        <div style="margin-bottom: 24px;">
          <span style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; display: block; margin-bottom: 8px;">
            Available Sizes:
          </span>
          <div style="display: flex; gap: 8px;" id="quick-view-sizes">
            ${product.sizes
              .map(
                (size, i) => `
              <button class="size-btn ${i === 0 ? "active" : ""}" 
                      onclick="setQuickViewSize('${size}', this)">
                ${size}
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <div style="display: flex; gap: 14px; margin-top: auto;">
          <button class="btn-primary" style="flex: 1; justify-content: center;" id="quick-view-add-btn" 
                  onclick="addToCart(${product.id}, window.currentQuickViewSize || '${product.sizes[0]}'); closeQuickView();">
            <i class="fa-solid fa-cart-shopping"></i> Add To Cart
          </button>
          <button class="wishlist-btn ${state.wishlist.includes(product.id) ? "active" : ""}" 
                  style="position: static; width: 48px; height: 48px;" 
                  onclick="toggleWishlist(${product.id}); this.classList.toggle('active');">
            <i class="fa-${state.wishlist.includes(product.id) ? "solid" : "regular"} fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `;

  window.currentQuickViewSize = product.sizes[0];
  if (elements.quickViewModal) elements.quickViewModal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.setQuickViewSize = function (size, btnElement) {
  window.currentQuickViewSize = size;
  const container = document.getElementById("quick-view-sizes");
  if (container) {
    container.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"));
  }
  btnElement.classList.add("active");
};

window.closeQuickView = function () {
  if (elements.quickViewModal) elements.quickViewModal.classList.remove("active");
  document.body.style.overflow = "";
};

// ==========================================================================
// 11.5 SEARCH CATEGORIES & AUTOCOMPLETE DROPDOWN
// ==========================================================================
function updateSearchDropdown() {
  // Update live category counts
  const countAll = document.getElementById("count-all");
  const countShirts = document.getElementById("count-shirts");
  const countJeans = document.getElementById("count-jeans");
  const countTshirts = document.getElementById("count-tshirts");

  if (countAll) countAll.textContent = `(${PRODUCTS.length})`;
  if (countShirts) countShirts.textContent = `(${PRODUCTS.filter((p) => p.category === "shirts").length})`;
  if (countJeans) countJeans.textContent = `(${PRODUCTS.filter((p) => p.category === "jeans").length})`;
  if (countTshirts) countTshirts.textContent = `(${PRODUCTS.filter((p) => p.category === "tshirts").length})`;

  // Update active category item inside dropdown
  const catItems = document.querySelectorAll(".search-cat-item");
  catItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.category === state.selectedCategory);
  });

  // Handle live matching products
  const query = state.searchQuery.toLowerCase().trim();
  const resultsSection = elements.searchResultsSection || document.getElementById("search-results-section");
  const resultsList = elements.searchResultsList || document.getElementById("search-results-list");
  const resultsCount = elements.searchResultsCount || document.getElementById("search-results-count");

  if (!resultsSection || !resultsList) return;

  if (!query) {
    resultsSection.style.display = "none";
    return;
  }

  const matches = PRODUCTS.filter((p) => {
    const matchesCat = state.selectedCategory === "all" || p.category === state.selectedCategory;
    const matchesQ =
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query);
    return matchesCat && matchesQ;
  });

  resultsSection.style.display = "block";
  if (resultsCount) resultsCount.textContent = `${matches.length} found`;

  if (matches.length === 0) {
    resultsList.innerHTML = `
      <div style="padding: 12px; text-align: center; color: var(--text-light); font-size: 0.82rem;">
        No matches for "${state.searchQuery}". Try selecting another category above.
      </div>
    `;
  } else {
    resultsList.innerHTML = matches
      .slice(0, 5)
      .map(
        (product) => `
        <button type="button" class="search-result-row" onclick="openQuickView(${product.id}); if(elements.searchDropdown) elements.searchDropdown.classList.remove('active');">
          <img src="${product.image}" alt="${product.name}" class="search-result-thumb">
          <div class="search-result-info">
            <span class="search-result-title">${product.name}</span>
            <div class="search-result-meta">
              <span class="search-result-price">₹${product.price}</span>
              <span class="search-result-cat">${product.category}</span>
            </div>
          </div>
          <i class="fa-solid fa-chevron-right" style="font-size: 0.75rem; color: var(--text-light); margin-left: auto;"></i>
        </button>
      `
      )
      .join("");
  }
}

// ==========================================================================
// 12. EVENT LISTENERS INITIALIZATION
// ==========================================================================
function initEventListeners() {
  // In-search Category Select
  if (elements.searchCategorySelect) {
    elements.searchCategorySelect.addEventListener("change", (e) => {
      window.setCategory(e.target.value);
      if (elements.searchDropdown) elements.searchDropdown.classList.remove("active");
    });
  }

  // Live Search Dropdown helpers
  function openSearchDropdown() {
    if (elements.searchDropdown) {
      elements.searchDropdown.classList.add("active");
      updateSearchDropdown();
    }
  }

  function closeSearchDropdown() {
    if (elements.searchDropdown) {
      elements.searchDropdown.classList.remove("active");
    }
  }

  // Search input with auto-suggestions
  if (elements.searchInput) {
    elements.searchInput.addEventListener("focus", openSearchDropdown);
    elements.searchInput.addEventListener("click", openSearchDropdown);
    elements.searchInput.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (elements.searchClearBtn) {
        elements.searchClearBtn.classList.toggle("visible", !!state.searchQuery);
      }
      openSearchDropdown();
      updateSearchDropdown();
      renderProducts();
    });
  }

  // Search clear
  if (elements.searchClearBtn) {
    elements.searchClearBtn.addEventListener("click", () => {
      elements.searchInput.value = "";
      state.searchQuery = "";
      elements.searchClearBtn.classList.remove("visible");
      updateSearchDropdown();
      renderProducts();
      elements.searchInput.focus();
    });
  }

  // Clickable Category Items inside Search Dropdown
  const catItems = document.querySelectorAll(".search-cat-item");
  catItems.forEach((item) => {
    item.addEventListener("click", () => {
      const cat = item.dataset.category;
      window.setCategory(cat);
      closeSearchDropdown();

      const productsSection = document.getElementById("Products") || document.getElementById("products-grid");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Close search dropdown on click outside
  document.addEventListener("click", (e) => {
    if (elements.searchContainer && !elements.searchContainer.contains(e.target)) {
      closeSearchDropdown();
    }
  });

  // Close search dropdown on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearchDropdown();
  });

  // Category Pills in Storefront
  elements.categoryPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      window.setCategory(pill.dataset.category);
    });
  });

  // Sort Dropdown
  if (elements.sortSelect) {
    elements.sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Cart Drawer toggles
  if (elements.cartToggleBtn) elements.cartToggleBtn.addEventListener("click", openCartDrawer);
  if (elements.cartCloseBtn) elements.cartCloseBtn.addEventListener("click", closeCartDrawer);
  if (elements.drawerBackdrop) elements.drawerBackdrop.addEventListener("click", closeCartDrawer);

  // Coupon
  if (elements.applyCouponBtn) elements.applyCouponBtn.addEventListener("click", applyCoupon);

  // Checkout Modal
  if (elements.checkoutDrawerBtn) elements.checkoutDrawerBtn.addEventListener("click", openCheckoutModal);
  if (elements.checkoutCloseBtn) elements.checkoutCloseBtn.addEventListener("click", closeCheckoutModal);
  if (elements.checkoutForm) elements.checkoutForm.addEventListener("submit", handleCheckoutSubmission);

  // Payment method options
  elements.paymentCards.forEach((card) => {
    card.addEventListener("click", () => {
      elements.paymentCards.forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      const method = card.dataset.method;
      if (elements.selectedPaymentInput) {
        elements.selectedPaymentInput.value = method;
      }

      const cardFields = document.getElementById("payment-card-fields");
      const upiFields = document.getElementById("payment-upi-fields");
      const codFields = document.getElementById("payment-cod-fields");
      if (cardFields) cardFields.style.display = method === "card" ? "block" : "none";
      if (upiFields) upiFields.style.display = method === "upi" ? "block" : "none";
      if (codFields) codFields.style.display = method === "cod" ? "block" : "none";
    });
  });

  // Quick View close backdrop
  if (elements.quickViewModal) {
    elements.quickViewModal.addEventListener("click", (e) => {
      if (e.target === elements.quickViewModal) closeQuickView();
    });
  }

  // Wishlist Modal
  if (elements.wishlistToggleBtn) {
    elements.wishlistToggleBtn.addEventListener("click", () => {
      renderWishlistModal();
      if (elements.wishlistModal) elements.wishlistModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  }

  if (elements.wishlistCloseBtn) {
    elements.wishlistCloseBtn.addEventListener("click", () => {
      if (elements.wishlistModal) elements.wishlistModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (elements.wishlistModal) {
    elements.wishlistModal.addEventListener("click", (e) => {
      if (e.target === elements.wishlistModal) {
        elements.wishlistModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Contact Form
  if (elements.contactForm) {
    elements.contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you for reaching out! Our styling concierge will contact you shortly. ✨");
      elements.contactForm.reset();
    });
  }

  // Scrollspy & Header Scroll Blur
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navigation a[href^='#']");

  window.addEventListener("scroll", () => {
    if (elements.headerWrapper) {
      elements.headerWrapper.classList.toggle("header-scrolled", window.scrollY > 30);
    }

    // Scrollspy active indicator
    let currentId = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 120;
      if (window.scrollY >= top) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });
    }
  });

  // Cross-tab synchronization
  window.addEventListener("storage", (e) => {
    if (e.key === "crazy_cart") {
      state.cart = JSON.parse(e.newValue || "[]");
      updateBadges();
      renderCartDrawer();
    } else if (e.key === "crazy_wishlist") {
      state.wishlist = JSON.parse(e.newValue || "[]");
      updateBadges();
      renderProducts();
    }
  });

  // Mobile Nav Toggle
  if (elements.mobileNavToggle && elements.navigation) {
    elements.mobileNavToggle.addEventListener("click", () => {
      elements.navigation.classList.toggle("mobile-open");
    });
  }

  // Lookbook Video Controls & Autoplay Guarantee
  const lookbookVideo = document.getElementById("lookbook-video");
  const videoTogglePlay = document.getElementById("video-toggle-play");
  const videoToggleSound = document.getElementById("video-toggle-sound");

  if (lookbookVideo) {
    lookbookVideo.muted = true;
    const attemptAutoplay = () => {
      lookbookVideo.play().catch(() => {
        document.addEventListener("click", () => lookbookVideo.play(), { once: true });
      });
    };
    attemptAutoplay();

    if (videoTogglePlay) {
      videoTogglePlay.addEventListener("click", (e) => {
        e.stopPropagation();
        if (lookbookVideo.paused) {
          lookbookVideo.play();
          videoTogglePlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
          lookbookVideo.pause();
          videoTogglePlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
      });
    }

    if (videoToggleSound) {
      videoToggleSound.addEventListener("click", (e) => {
        e.stopPropagation();
        lookbookVideo.muted = !lookbookVideo.muted;
        if (lookbookVideo.muted) {
          videoToggleSound.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
          showToast("Lookbook Audio Muted 🔇");
        } else {
          videoToggleSound.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
          showToast("Lookbook Audio Unmuted 🔊");
        }
      });
    }
  }

  // Escape key closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeCheckoutModal();
      closeQuickView();
      closeDropModal();
      if (elements.wishlistModal) {
        elements.wishlistModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    }
  });
}

// ==========================================================================
// 12.1 COMING SOON COUNTDOWN TIMER & VIP DROP WAITLIST SYSTEM
// ==========================================================================
let countdownInterval = null;

function initCountdownTimer() {
  const daysEl = document.getElementById("timer-days");
  const hoursEl = document.getElementById("timer-hours");
  const minsEl = document.getElementById("timer-minutes");
  const secsEl = document.getElementById("timer-seconds");
  const topTimerEl = document.getElementById("top-timer-clock");

  // Dynamic rolling target date: 4 days, 18 hours, 45 minutes from first load
  let dropTargetTime = localStorage.getItem("crazy_drop_target_time");
  const now = Date.now();

  if (!dropTargetTime || parseInt(dropTargetTime, 10) <= now + 60000) {
    const futureTarget = now + (4 * 24 * 60 * 60 + 18 * 60 * 60 + 45 * 60 + 30) * 1000;
    localStorage.setItem("crazy_drop_target_time", futureTarget.toString());
    dropTargetTime = futureTarget.toString();
  }

  const targetTimestamp = parseInt(dropTargetTime, 10);

  function updateClock() {
    const current = Date.now();
    let diff = targetTimestamp - current;

    if (diff <= 0) {
      // Loop forward to keep live experience exciting
      const newTarget = Date.now() + 3 * 24 * 60 * 60 * 1000;
      localStorage.setItem("crazy_drop_target_time", newTarget.toString());
      diff = newTarget - Date.now();
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");
    const dStr = pad(d);
    const hStr = pad(h);
    const mStr = pad(m);
    const sStr = pad(s);

    if (daysEl) daysEl.textContent = dStr;
    if (hoursEl) hoursEl.textContent = hStr;
    if (minsEl) minsEl.textContent = mStr;
    if (secsEl) secsEl.textContent = sStr;

    if (topTimerEl) {
      topTimerEl.textContent = `${dStr}d ${hStr}h ${mStr}m ${sStr}s`;
    }
  }

  updateClock();
  if (countdownInterval) clearInterval(countdownInterval);
  countdownInterval = setInterval(updateClock, 1000);
}

// VIP Drop Modal Functions (Global)
let currentDropTarget = { title: "Capsule Drop Item", price: "₹1,499" };

window.openDropModal = function (itemTitle, itemPrice) {
  currentDropTarget = { title: itemTitle, price: itemPrice };

  const modal = document.getElementById("drop-modal");
  const titleEl = document.getElementById("drop-modal-item-title");
  const priceEl = document.getElementById("drop-modal-item-price");

  if (titleEl) titleEl.textContent = itemTitle;
  if (priceEl) priceEl.textContent = `Drop Price: ${itemPrice} • Limited Edition`;

  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
};

window.closeDropModal = function () {
  const modal = document.getElementById("drop-modal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

window.handleDropWaitlistSubmit = function (e) {
  if (e) e.preventDefault();

  const nameInput = document.getElementById("drop-input-name");
  const emailInput = document.getElementById("drop-input-email");
  const phoneInput = document.getElementById("drop-input-phone");

  const name = nameInput ? nameInput.value.trim() : "VIP Stylist";
  const email = emailInput ? emailInput.value.trim() : "";
  const phone = phoneInput ? phoneInput.value.trim() : "";

  // Save to localStorage
  try {
    const list = JSON.parse(localStorage.getItem("crazy_drop_waitlist") || "[]");
    list.push({
      item: currentDropTarget.title,
      price: currentDropTarget.price,
      name,
      email,
      phone,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("crazy_drop_waitlist", JSON.stringify(list));
  } catch (err) {}

  // Update button state on the page
  const buttons = document.querySelectorAll(`.btn-drop-notify[data-drop-item="${currentDropTarget.title}"]`);
  buttons.forEach((btn) => {
    btn.classList.add("waitlisted");
    btn.innerHTML = `<i class="fa-solid fa-check"></i> VIP Waitlisted`;
  });

  closeDropModal();
  playChimeSound(680);
  showToast(`🎉 VIP Access Reserved for ${currentDropTarget.title}! Secret Code: SECRET10`, "success");

  if (nameInput) nameInput.value = "";
  if (emailInput) emailInput.value = "";
  if (phoneInput) phoneInput.value = "";
};

window.handleQuickWaitlist = function (e) {
  if (e) e.preventDefault();
  const input = document.getElementById("quick-waitlist-email");
  if (!input || !input.value.trim()) return;

  const email = input.value.trim();
  try {
    const list = JSON.parse(localStorage.getItem("crazy_drop_waitlist") || "[]");
    list.push({
      item: "Full 2026 Vault Collection",
      email,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("crazy_drop_waitlist", JSON.stringify(list));
  } catch (err) {}

  input.value = "";
  playChimeSound(750);
  showToast("🎉 You're on the VIP Drop list! Check your inbox 15 mins before launch.", "success");
};

function restoreDropWaitlistState() {
  try {
    const list = JSON.parse(localStorage.getItem("crazy_drop_waitlist") || "[]");
    const waitlistedItems = new Set(list.map((item) => item.item));

    document.querySelectorAll(".btn-drop-notify").forEach((btn) => {
      const itemTitle = btn.getAttribute("data-drop-item");
      if (waitlistedItems.has(itemTitle)) {
        btn.classList.add("waitlisted");
        btn.innerHTML = `<i class="fa-solid fa-check"></i> VIP Waitlisted`;
      }
    });
  } catch (e) {}
}

// ==========================================================================
// 13. BOOTSTRAP INITIALIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  // Default White & Maroon Luxury Aesthetic
  document.documentElement.removeAttribute("data-theme");
  try {
    localStorage.removeItem("crazy_theme");
  } catch (e) {}

  initElements();

  // Parse URL Parameters (e.g. ?category=shirts or ?q=blue)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("category")) {
    state.selectedCategory = urlParams.get("category");
    if (elements.categoryPills) {
      elements.categoryPills.forEach((pill) => {
        pill.classList.toggle("active", pill.dataset.category === state.selectedCategory);
      });
    }
  }

  if (urlParams.has("q")) {
    state.searchQuery = urlParams.get("q");
    if (elements.searchInput) elements.searchInput.value = state.searchQuery;
    if (elements.searchClearBtn) elements.searchClearBtn.classList.add("visible");
  }

  renderProducts();
  updateBadges();
  renderCartDrawer();
  initEventListeners();
  initCountdownTimer();
  restoreDropWaitlistState();
});
