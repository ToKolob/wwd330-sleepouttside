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

  async findProductById(id) {
    try {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      console.log(data.Result); 
      return data.Result;
    } catch (err) {
      console.error(`Failed to fetch product by ID: ${id}`, err);
      throw err;
    }
  }
}