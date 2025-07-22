export default class ExternalServices {
    constructor() {
        this.baseUrl = 'https://wdd330-backend.onrender.com';
    }

    async getData(category) {
        const response = await fetch(`${this.baseUrl}/products/${category}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    async getProductById(id) {
        const response = await fetch(`${this.baseUrl}/product/${id}`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }

    async checkout(payload) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        };

        const response = await fetch(`${this.baseUrl}/checkout`, options);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    }
}