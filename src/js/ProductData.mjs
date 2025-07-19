const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(`Bad Response: ${res.status} ${res.statusText}`);
  }
}

// Mock Product List (Tents only for now)
export const mockProducts = [
  {
    Id: "880RR",
    Name: "Ajax Tent - 3-Person, 3-Season",
    NameWithoutBrand: "Ajax Tent",
    Brand: { Name: "Marmot" },
    ListPrice: 199.99,
    FinalPrice: 199.99,
    Category: "Tents",
    PrimaryMedium: "images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg"
  },
  {
    Id: "985RF",
    Name: "Talus Tent - 4-Person, 3-Season",
    NameWithoutBrand: "Talus Tent",
    Brand: { Name: "The North Face" },
    ListPrice: 199.99,
    FinalPrice: 199.99,
    Category: "Tents",
    PrimaryMedium: "images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg"
  },
  {
    Id: "985PR",
    Name: "Alpine Guide Tent - 3-Person, 4-Season",
    NameWithoutBrand: "Alpine Guide Tent",
    Brand: { Name: "The North Face" },
    ListPrice: 349.99,
    FinalPrice: 349.99,
    Category: "Tents",
    PrimaryMedium: "images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg"
  },
  {
    Id: "344YJ",
    Name: "Rimrock Tent - 2-Person, 3-Season",
    NameWithoutBrand: "Rimrock Tent",
    Brand: { Name: "Cedar Ridge" },
    ListPrice: 69.99,
    FinalPrice: 69.99,
    Category: "Tents",
    PrimaryMedium: "images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg"
  }
];

export default class ProductData {
  constructor(useMock = false) {
    this.useMock = useMock;
  }

  /**
   * Get a list of products — all or by category
   * @param {string} category optional
   */
  async getData(category = null) {
    if (this.useMock) {
      if (category) {
        return mockProducts.filter(p =>
          p.Category?.toLowerCase() === category.toLowerCase()
        );
      } else {
        return mockProducts; // Show all mock products
      }
    }

    try {
      const endpoint = category
        ? `${baseURL}products/search/${category}`
        : `${baseURL}products`; // fallback if no category

      const response = await fetch(endpoint);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error(`Failed to fetch product list${category ? ` for category: ${category}` : ''}`, err);
      throw err;
    }
  }

  /**
   * Get product details by ID
   */
  async findProductById(id) {
    if (this.useMock) {
      return mockProducts.find((product) => product.Id === id) || null;
    }

    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error(`Failed to fetch product by ID: ${id}`, err);
      throw err;
    }
  }
}