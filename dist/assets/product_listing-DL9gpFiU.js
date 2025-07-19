import"./modulepreload-polyfill-B5Qt9EMX.js";/* empty css              */import{r as d,l,g as u}from"./utils-C1Wb6PcZ.js";const a="https://wdd330-backend.onrender.com/";function n(r){if(r.ok)return r.json();throw new Error("Bad Response")}class h{constructor(){}async getData(t){try{const e=await fetch(`${a}products/search/${t}`);return(await n(e)).Result}catch(e){throw console.error(`Failed to fetch data for category: ${t}`,e),e}}async findProductById(t){try{const e=await fetch(`${a}product/${t}`);return(await n(e)).Result}catch(e){throw console.error(`Failed to fetch product by ID: ${t}`,e),e}}}function m(r){const t=r.discount||0,e=t>0,o=r.ListPrice||r.FinalPrice,s=e?(o*(1-t)).toFixed(2):o.toFixed(2);return`
    <li class="product-card">
      <a href="/product_pages/product-detail.html?id=${r.Id}">
        <img src="${r.PrimaryMedium||"/images/default.jpg"}" alt="${r.Name}">
        <h3 class="card__brand">${r.Brand?.Name||"Unknown Brand"}</h3>
        <h2 class="card__name">${r.Name}</h2>
        ${e?`<p class="discount-flag">${t*100}% OFF</p>`:""}
        <p class="product-card__price">
          ${e?`<del>₹${o.toFixed(2)}</del> <strong>₹${s}</strong>`:`<strong>₹${s}</strong>`}
        </p>
      </a>
    </li>
  `}function p(){return new URLSearchParams(window.location.search).get("category")}const g=p();class y{constructor(t,e,o,s={}){this.category=t,this.dataSource=e,this.listElement=o,this.discounts=s}async init(){try{let t=await this.dataSource.getData();if(console.log("Fetched products:",t),!t||t.length===0){this.listElement.innerHTML="<p>No products found.</p>";return}this.category&&(t=t.filter(e=>e.Category?.toLowerCase()===this.category.toLowerCase())),t=t.map(e=>{const o=Object.keys(this.discounts).find(s=>e.Name.toLowerCase().includes(s.toLowerCase()));return o&&(e.discount=this.discounts[o]),e}),this.renderList(t)}catch(t){console.error("Failed to load product data:",t),this.listElement.innerHTML="<p>Error loading product list.</p>"}}renderList(t){d(m,this.listElement,t,"afterbegin",!0)}}document.querySelector("h2").textContent=`Products: ${g}`;l();const i=u("category");function f(r){return r?r.charAt(0).toUpperCase()+r.slice(1):"All"}const c=document.querySelector(".product-title");c&&(c.textContent=`Top Products: ${f(i)}`);const w=new h,$=document.querySelector(".product-list"),L=new y(i,w,$);L.init();
