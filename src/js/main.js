// src/js/main.js
import { loadHeaderFooter } from './utils.mjs';
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

console.log("main.js loaded");

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const discounts = {
  'Ajax Tent - 3-Person, 3-Season': 0.2,
  'Talus Tent - 4-Person, 3-Season': 0.2,
  'Alpine Guide Tent - 3-Person, 4-Season': 0.2,
  'Rimrock Tent - 2-Person, 3-Season': 0.2
};

const productList = new ProductList("Tents", dataSource, element, discounts);

console.log("Calling productList.init....");
productList.init();

