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

  addToCart() {
    let cartContents = getLocalStorage('so-cart') || [];
    cartContents.push(this.product);
    setLocalStorage('so-cart', cartContents);
  }

  renderProductDetails() {
    document.getElementById('product-name').textContent = this.product.Name;
    document.title = this.product.Name + ' | Sleep Outside';
    document.getElementById('product-image').src = this.product.Image;
    document.getElementById('product-image').alt = this.product.Name;
    document.getElementById('product-price').textContent = `$${this.product.FinalPrice}`;
    document.getElementById('product-description').innerHTML = this.product.Description;
  }
}