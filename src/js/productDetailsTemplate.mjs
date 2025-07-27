export function productDetailsTemplate(product) {
  return `
    <section id="product-info" class="product-detail">
      <h2 class="brand-name">${product.Brand?.Name || "Brand not available"}</h2>
      <h3 class="product-name">${product.NameWithoutBrand || product.Name}</h3>
      
      <img id="productImage" src="${product.Images?.PrimaryExtraLarge || "/images/default.jpg"}"
           alt="${product.NameWithoutBrand || "Product"} by ${product.Brand?.Name || "Unknown Brand"}" />

      <p id="productPrice">${new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(product.FinalPrice)}</p>

      <p id="productColor">${product.Colors?.[0]?.ColorName || "N/A"}</p>
      <div id="productDesc">${product.DescriptionHtmlSimple || "No description available."}</div>

      <div class="product-controls">
        <label for="quantity-${product.Id}">Qty:</label>
        <input type="number" id="quantity-${product.Id}" value="1" min="1" />
        <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

export function renderProductDetailsUI(product) {
  const addToCartButton = document.getElementById("add-to-cart");
  const quantityField = document.getElementById(`quantity-${product.Id}`);

  addToCartButton?.addEventListener("click", () => {
    const quantity = parseInt(quantityField?.value) || 1;

    // Here you'd pass data to your cart handler
    console.log(`Adding ${quantity} of product ${product.Id} to cart.`);
    // For example:
    // cartManager.addItem(product.Id, quantity);

    alert(`${quantity} item(s) added to cart!`);
  });
}