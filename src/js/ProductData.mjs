const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() {}

  // Fetch product list by category using the API
  async getData(category) {
    try {
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    } catch (err) {
      console.error(`Failed to fetch data for category: ${category}`, err);
      throw err;
    }
  }

  // Fetch product by ID directly from API — more efficient!
  async findProductById(id) {
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