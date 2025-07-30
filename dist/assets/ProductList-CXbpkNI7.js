import{r}from"./utils-Dn5CXOys.js";function s(t){return`
    <li class="product-card">
      <a href="/product_pages/index.html?product=${t.Id}">
        <img src="${t.Image||t.Images?.PrimaryMedium||"/images/default.jpg"}" alt="${t.Name}">
        <h3>${t.Brand?.Name||"Unknown Brand"}</h3>
        <p>${t.NameWithoutBrand||t.Name}</p>
        <p class="product-card__price">$${t.FinalPrice||t.ListPrice}</p>
      </a>
    </li>
    `}class c{constructor(e,a,i){this.category=e,this.dataSource=a,this.listElement=i}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").textContent=this.category}renderList(e){r(s,this.listElement,e)}}export{c as P};
