import{g as r,r as s,l as c}from"./utils-DLQRCcCx.js";/* empty css              */function n(t){return`
    <li class="cart-item">
      <img src="${t.image}" alt="${t.name}" class="cart-thumb" />
      <div class="cart-details">
        <h3>${t.name}</h3>
        <p>Quantity: ${t.quantity}</p>
        <p>Price: $${t.price}</p>
      </div>
    </li>
  `}class i{constructor(e,a){this.listElement=document.querySelector(e),this.storageKey=a,console.log("Cart.js is now wired up and ready         !"),console.log(`ShoppingCart initialized with storage key: ${this.storageKey}`),console.log(`List element found: ${this.listElement} `)}async init(){const e=r(this.storageKey)||[];if(e.length===0){this.listElement.innerHTML="<p>Your cart is empty.</p>";return}s(n,this.listElement,e,"afterbegin",!0)}}c();const o=new i("#cart-list","so-cart");o.init();function l(){const e=r("so-cart").map(a=>m(a));document.querySelector(".product-list").innerHTML=e.join("")}function m(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}l();
