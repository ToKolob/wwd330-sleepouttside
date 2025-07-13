export function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image || "/images/default.jpg";
  productImage.alt = product.NameWithoutBrand || product.Name || "Product Image";
  productImage.onerror = function (){
    this.src = "/images/deafult.jpg";
  }

  const priceElement = document.getElementById("productPrice");
  const originalPrice = product.ListPrice || product.FinalPrice;
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;

  const finalPrice = hasDiscount
    ? (originalPrice * (1 - discount)).toFixed(2)
    : originalPrice.toFixed(2);

  priceElement.innerHTML = hasDiscount
    ? `<del>₹${originalPrice.toFixed(2)}</del> <strong>₹${finalPrice}</strong>`
    : `<strong>₹${finalPrice}</strong>`;

  // Add a discount badge if applicable
  if (hasDiscount) {
    const discountTag = document.createElement("span");
    discountTag.classList.add("discount-flag");
    discountTag.textContent = `${Math.round(discount * 100)}% OFF`;
    priceElement.appendChild(discountTag);
  }

  // Product color (if available)
  document.getElementById("productColor").textContent =
    product.Colors?.[0]?.ColorName || "Color Info Unavailable";

  // Product description
  document.getElementById("productDesc").innerHTML =
    product.DescriptionHtmlSimple || "<p>No description available.</p>";

  // Set product ID on Add to Cart button
  document.getElementById("addToCart").dataset.id = product.Id;
}


//  document.getElementById("productPrice").textContent = product.FinalPrice;

//  if (product.discount) {
//    const discountTag = document.createElement("span");
//    discountTag.classList.add("discount-flag");
//    discountTag.textContent = "Discount Available!";
//    document.getElementById("productPrice").appendChild(discountTag);
//  }

//  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
//  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

//  document.getElementById("addToCart").dataset.id = product.Id;
//}
