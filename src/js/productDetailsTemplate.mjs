export function productDetailsTemplate(product) {
  document.querySelector("h2").textContent = product.Brand.Name;
  document.querySelector("h3").textContent = product.NameWithoutBrand;

  const productImage = document.getElementById("productImage");
  productImage.src = product.Image;
  productImage.alt = product.NameWithoutBrand;

  document.getElementById("productPrice").textContent = product.FinalPrice;

  if (product.discount) {
    const discountTag = document.createElement("span");
    discountTag.classList.add("discount-flag");
    discountTag.textContent = "Discount Available!";
    document.getElementById("productPrice").appendChild(discountTag);
  }

  document.getElementById("productColor").textContent = product.Colors[0].ColorName;
  document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

  document.getElementById("addToCart").dataset.id = product.Id;
}
