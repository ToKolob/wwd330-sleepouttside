import{r as i,l as r}from"./utils-JjHiqjoF.js";import{P as a}from"./ProductData-Dx0C3TkS.js";function c(e){const t=e.discount||0,s=t>0,n=e.ListPrice||e.FinalPrice,o=s?(n*(1-t)).toFixed(2):n.toFixed(2);return`
    <li class="product-card">
      <a href="product-detail.html?id=${e.Id}">
        <img src="${e.Image||"/images/default.jpg"}" alt="${e.Name}">
        <h3 class="card__brand">${e.Brand?.Name||"Unknown Brand"}</h3>
        <h2 class="card__name">${e.Name}</h2>
        ${s?`<p class="discount-flag">${t*100}% OFF</p>`:""}
        <p class="product-card__price">
          ${s?`<del>₹${n.toFixed(2)}</del> <strong>₹${o}</strong>`:`<strong>₹${o}</strong>`}
        </p>
      </a>
    </li>
  `}class d{constructor(t,s,n,o={}){this.category=t,this.dataSource=s,this.listElement=n,this.discounts=o}async init(){try{let t=await this.dataSource.getData();if(console.log("Fetched products:",t),!t||t.length===0){this.listElement.innerHTML="<p>No products found.</p>";return}t=t.map(s=>{const n=Object.keys(this.discounts).find(o=>s.Name.toLowerCase().includes(o.toLowerCase()));return n&&(s.discount=this.discounts[n]),s}),this.renderList(t)}catch(t){console.error("Failed to load product data:",t),this.listElement.innerHTML="<p>Error loading product list.</p>"}}renderList(t){i(c,this.listElement,t,"afterbegin",!0)}}r();console.log("main.js loaded");const l=new a("tents"),u=document.querySelector(".product-list"),m={"Ajax Tent - 3-Person, 3-Season":.2,"Talus Tent - 4-Person, 3-Season":.2,"Alpine Guide Tent - 3-Person, 4-Season":.2,"Rimrock Tent - 2-Person, 3-Season":.2},h=new d("Tents",l,u,m);console.log("Calling productList.init....");h.init();
