import{l as p,s,a as l}from"./utils-Dn5CXOys.js";/* empty css              */p();const f=new URLSearchParams(window.location.search);f.get("cleared")==="true"&&(localStorage.removeItem("so-cart"),s("so-cart",[]));function d(){const t=l("so-cart")||[],e=document.querySelector(".product-list"),o=document.querySelector(".list-footer"),r=document.getElementById("cart-count"),a=document.querySelector(".list-total");if(t.length===0){e.innerHTML="<p>Your cart is empty.</p>",o?.classList.add("hide"),r&&(r.textContent="0"),a&&(a.textContent="Total: ₹0.00");return}const i=t.map(h);e.innerHTML=i.join(""),g();const u=t.reduce((n,c)=>n+c.FinalPrice*(c.quantity||1),0);if(a&&(a.textContent=`Total: ₹${u.toFixed(2)}`),o?.classList.remove("hide"),r){const n=t.reduce((c,m)=>c+(m.quantity||1),0);r.textContent=n.toString()}}function g(){document.querySelectorAll(".remove-item-btn").forEach(e=>{e.addEventListener("click",o=>{o.preventDefault();const r=e.dataset.productId;C(r)})})}function C(t){let e=l("so-cart")||[];e=e.filter(o=>o.Id!==t),s("so-cart",e),d()}function h(t){const e=t.quantity||1,o=(t.FinalPrice*e).toFixed(2);return`<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${t.Image}" alt="${t.Name}">
    </a>
    <a href="#">
      <h2 class="card__name">${t.Name}</h2>
    </a>
    <p class="cart-card__color">${t.Colors&&t.Colors.length>0?t.Colors[0].ColorName:"Color not specified"}</p>
    <p class="cart-card__quantity">qty: ${e}</p>
    <p class="cart-card__price">₹${o}</p>
    <button class="remove-item-btn" data-product-id="${t.Id}" title="Remove item from cart">✕</button>
  </li>`}d();
