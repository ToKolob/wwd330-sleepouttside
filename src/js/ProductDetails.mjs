import { productDetailsTemplate } from './productDetailsTemplate.mjs';

import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addProductToCart() {
    const cartContents = getLocalStorage('so-cart') || [];
    cartContents.push(this.product);
    setLocalStorage('so-cart', cartContents);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

    function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;
  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}

const products = [
  {
    product:"880RR",
    name: "Marmot Ajax Tent",
    price: 199.99,
    discount: true,
    image: "images/tents/marmot-ajax-tent-3-person-3-seaon-in-pale-pumpkin-terracotta~p~880ee_01~320.jpg"
  },
  {
    product:"985RF",
    name: "Ajax Tent",
    price: 199.99,
    discount: true,
    image: "images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg"
  }
];