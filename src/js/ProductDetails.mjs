import { productDetailsTemplate } from './productDetailsTemplate.mjs';
import { setLocalStorage, getLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      this.renderProductDetails();
      document.getElementById('add-to-cart') // Match HTML ID
        .addEventListener('click', this.addProductToCart.bind(this));
    } catch (err) {
      console.error('Error loading product details:', err);
      document.querySelector('main').innerHTML = `<p>Failed to load product details. Please try again later.</p>`;
    }
  }

  addProductToCart() {
    const cartContents = getLocalStorage('so-cart') || [];
    const alreadyInCart = cartContents.find(item => item.Id === this.product.Id);
    if (!alreadyInCart) cartContents.push(this.product);
    setLocalStorage('so-cart', cartContents);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product); // Ensured naming consistency
  }
}