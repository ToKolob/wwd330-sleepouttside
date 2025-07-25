import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

// Load site header and footer
loadHeaderFooter();

// Get product ID from URL
const productId = getParam("product");

// Create data source and product detail instance
const dataSource = new ProductData("tents");
const product = new ProductDetails(productId, dataSource);

// Render product details
product.init();