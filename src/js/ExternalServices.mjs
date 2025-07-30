const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ExternalServices {
  constructor(mockMode = false) {
    this.mockMode = mockMode;
  }
  
  async getData(category) {
    if (this.mockMode) {
      // Use local JSON files in mock mode
      const response = await fetch(`/json/${category}.json`);
      const data = await convertToJson(response);
      return data;
    } else {
      // Use external API
      const response = await fetch(`${baseURL}products/search/${category}`);
      const data = await convertToJson(response);
      return data.Result;
    }
  }
  
  async findProductById(id) {
    if (this.mockMode) {
      // In mock mode, we'll need to search through all categories
      const categories = ['tents', 'sleeping-bags', 'backpacks'];
      for (const category of categories) {
        try {
          const products = await this.getData(category);
          const product = products.find(p => p.Id === id);
          if (product) return product;
        } catch (error) {
          console.warn(`Could not load ${category}.json:`, error);
        }
      }
      return null;
    } else {
      const response = await fetch(`${baseURL}product/${id}`);
      const data = await convertToJson(response);
      return data.Result;
    }
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}