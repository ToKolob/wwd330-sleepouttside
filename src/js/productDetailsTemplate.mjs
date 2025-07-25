export function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand?.Name || "Brand not available";
  document.querySelector("h3").textContent = product.NameWithoutBrand || product.Name;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Images?.PrimaryExtraLarge || "/images/default.jpg";
  productImage.alt = product.NameWithoutBrand || "Product image";

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(product.FinalPrice);

  document.getElementById("productPrice").textContent = formattedPrice;
  document.getElementById("productColor").textContent = product.Colors?.[0]?.ColorName || "N/A";
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple || "No description available.";
  document.getElementById("add-to-cart").dataset.id = product.Id;
}