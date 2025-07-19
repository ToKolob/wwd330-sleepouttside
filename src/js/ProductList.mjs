import { renderListWithTemplate, debounce, highlight } from "./utils.mjs";

// Product card renderer
function productCardTemplate(product) {
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;
  const originalPrice = product.ListPrice || product.FinalPrice || 0;
  const discountedPrice = hasDiscount
    ? (originalPrice * (1 - discount)).toFixed(2)
    : originalPrice.toFixed(2);

  const query = product._searchQuery || "";
  const highlightedName = highlight(product.Name || "", query);
  const highlightedBrand = highlight(product.Brand?.Name || "", query);

  return `
    <li class="product-card">
      <a href="/product_pages/product-detail.html?id=${product.Id}">
        <img src="${product.PrimaryMedium || '/images/default.jpg'}"
             alt="${product.Name}"
             onerror="this.src='/images/default.jpg';" />
        <h3 class="card__brand">${highlightedBrand}</h3>
        <h2 class="card__name">${highlightedName}</h2>
        ${hasDiscount ? `<p class="discount-flag">${discount * 100}% OFF</p>` : ""}
        <p class="product-card__price">
          ${
            hasDiscount
              ? `<del>₹${originalPrice.toFixed(2)}</del> <strong>₹${discountedPrice}</strong>`
              : `<strong>₹${discountedPrice}</strong>`
          }
        </p>
      </a>
    </li>
  `;
}

// Get category from URL if applicable
function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

const category = getCategoryFromURL();

export default class ProductList {
  constructor(category, dataSource, listElement, discounts = {}) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.discounts = discounts;
    this.originalList = [];
  }

  async init() {
    try {
      let list = await this.dataSource.getData(this.category);

      if (!list || list.length === 0) {
        this.listElement.innerHTML = "<p>No products found.</p>";
        return;
      }

      list = list.map(product => {
        const discountKey = Object.keys(this.discounts).find(key =>
          product.Name.toLowerCase().includes(key.toLowerCase())
        );
        if (discountKey) {
          product.discount = this.discounts[discountKey];
        }
        return product;
      });

      this.originalList = [...list];
      this.renderList(list);
      this.setupSearch();

      const heading = document.querySelector("h2");
      if (heading) heading.textContent = `Products: ${this.category || "All"}`;
    } catch (err) {
      console.error("Failed to load product data:", err);
      this.listElement.innerHTML = "<p>Error loading product list.</p>";
    }
  }

  renderList(list) {
    if (!list || list.length === 0) {
      this.listElement.innerHTML = "<p class='no-results'>No products match your search.</p>";
    } else {
      renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
    }
  }

  setupSearch() {
    const input = document.getElementById("searchInput");
    const suggestionBox = document.getElementById("search-suggestions");
    const minInput = document.getElementById("minPrice");
    const maxInput = document.getElementById("maxPrice");
    const tagButtons = document.querySelectorAll(".tag");

    let activeTag = "";

    const triggerSearch = debounce(() => {
      const query = input?.value?.toLowerCase().trim() || "";
      const min = parseFloat(minInput?.value) || 0;
      const max = parseFloat(maxInput?.value) || Infinity;

      const filtered = this.originalList
        .map(product => ({
          ...product,
          _searchQuery: query
        }))
        .filter(product =>
          (product.Name?.toLowerCase().includes(query) ||
           product.Brand?.Name?.toLowerCase().includes(query) ||
           (product.NameWithoutBrand && product.NameWithoutBrand.toLowerCase().includes(query))) &&
          product.FinalPrice >= min &&
          product.FinalPrice <= max &&
          (!activeTag || product.Name.toLowerCase().includes(activeTag))
        );

      this.renderList(filtered);
      this.showSuggestions(query, input, suggestionBox, triggerSearch);
    });

    // Input listeners
    input?.addEventListener("input", triggerSearch);
    minInput?.addEventListener("input", triggerSearch);
    maxInput?.addEventListener("input", triggerSearch);

    // Tag filtering
    tagButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        activeTag = btn.dataset.tag.toLowerCase();
        triggerSearch();
      });
    });
  }

  showSuggestions(query, input, suggestionBox, triggerSearch) {
    if (!query || !suggestionBox) return suggestionBox.innerHTML = "";

    const suggestions = this.originalList
      .filter(product => product.Name.toLowerCase().includes(query))
      .slice(0, 5)
      .map(product => `<li>${product.Name}</li>`);

    suggestionBox.innerHTML = suggestions.join("");

    suggestionBox.querySelectorAll("li").forEach(item => {
      item.addEventListener("click", () => {
        input.value = item.textContent;
        suggestionBox.innerHTML = "";
        triggerSearch();
      });
    });
  }
}