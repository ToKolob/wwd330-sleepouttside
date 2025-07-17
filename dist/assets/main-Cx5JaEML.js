function c(e,t,n,s="afterbegin",o=!1){if(o&&Array.isArray(n)&&n.length>0&&(t.innerHTML=""),!n||n.length===0)return;const i=n.map(e).join("");t.insertAdjacentHTML(s,i)}function a(e,t,n,s){t.innerHTML=e}async function r(e){return await(await fetch(e)).text()}async function d(){const e=await r("../partials/header.html"),t=await r("../partials/footer.html");a(e,document.querySelector("#main-header")),a(t,document.querySelector("#main-footer")),a(e,headerElement),a(t,footerElement)}function l(e){if(e.ok)return e.json();throw new Error("Bad Response")}class u{constructor(t){this.category=t,this.path=`../json/${this.category}.json`}getData(){return fetch(this.path).then(l).then(t=>t)}async findProductById(t){return(await this.getData()).find(s=>s.Id===t)}}function h(e){const t=e.discount||0,n=t>0,s=e.ListPrice||e.FinalPrice,o=n?(s*(1-t)).toFixed(2):s.toFixed(2);return`
    <li class="product-card">
      <a href="product-detail.html?id=${e.Id}">
        <img src="${e.Image||"/images/default.jpg"}" alt="${e.Name}">
        <h3 class="card__brand">${e.Brand?.Name||"Unknown Brand"}</h3>
        <h2 class="card__name">${e.Name}</h2>
        ${n?`<p class="discount-flag">${t*100}% OFF</p>`:""}
        <p class="product-card__price">
          ${n?`<del>₹${s.toFixed(2)}</del> <strong>₹${o}</strong>`:`<strong>₹${o}</strong>`}
        </p>
      </a>
    </li>
  `}class m{constructor(t,n,s,o={}){this.category=t,this.dataSource=n,this.listElement=s,this.discounts=o}async init(){try{let t=await this.dataSource.getData();if(console.log("Fetched products:",t),!t||t.length===0){this.listElement.innerHTML="<p>No products found.</p>";return}t=t.map(n=>{const s=Object.keys(this.discounts).find(o=>n.Name.toLowerCase().includes(o.toLowerCase()));return s&&(n.discount=this.discounts[s]),n}),this.renderList(t)}catch(t){console.error("Failed to load product data:",t),this.listElement.innerHTML="<p>Error loading product list.</p>"}}renderList(t){c(h,this.listElement,t,"afterbegin",!0)}}d();console.log("main.js loaded");const p=new u("tents"),f=document.querySelector(".product-list"),g={"Ajax Tent - 3-Person, 3-Season":.2,"Talus Tent - 4-Person, 3-Season":.2,"Alpine Guide Tent - 3-Person, 4-Season":.2,"Rimrock Tent - 2-Person, 3-Season":.2},T=new m("Tents",p,f,g);console.log("Calling productList.init....");T.init();
