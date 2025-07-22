import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage, setLocalStorage } from './utils.mjs';

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.services = new ExternalServices();
        this.cartItems = [];
        this.subtotal = 0;
        this.tax = 0;
        this.shipping = 0;
        this.orderTotal = 0;
        this.form = document.getElementById('checkout-form');
    }

    init() {
        this.loadCartItems();
        this.calculateSubtotal();
        this.displaySubtotal();
        this.addFormListeners();
    }

    loadCartItems() {
        this.cartItems = getLocalStorage(this.key) || [];
    }

    calculateSubtotal() {
        this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.FinalPrice * item.Quantity), 0);
    }

    displaySubtotal() {
        document.getElementById('subtotal').textContent = `$${this.subtotal.toFixed(2)}`;
    }

    calculateTaxAndShipping() {
        // 6% tax
        this.tax = this.subtotal * 0.06;
        // $10 for first item + $2 for each additional
        this.shipping = 10 + (Math.max(this.cartItems.length - 1, 0) * 2;
        this.orderTotal = this.subtotal + this.tax + this.shipping;
        
        document.getElementById('tax').textContent = `$${this.tax.toFixed(2)}`;
        document.getElementById('shipping').textContent = `$${this.shipping.toFixed(2)}`;
        document.getElementById('order-total').textContent = `$${this.orderTotal.toFixed(2)}`;
    }

    addFormListeners() {
        // Calculate tax/shipping when zip is entered
        document.getElementById('zip').addEventListener('blur', () => {
            this.calculateTaxAndShipping();
        });

        // Handle form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.checkout();
        });
    }

    packageItems() {
        return this.cartItems.map(item => ({
            id: item.Id,
            name: item.Name,
            price: item.FinalPrice,
            quantity: item.Quantity
        }));
    }

    formDataToJSON(formElement) {
        const formData = new FormData(formElement);
        const convertedJSON = {};
        
        formData.forEach((value, key) => {
            convertedJSON[key] = value;
        });

        return convertedJSON;
    }

    async checkout() {
        const formData = this.formDataToJSON(this.form);
        const items = this.packageItems();
        
        const order = {
            orderDate: new Date().toISOString(),
            ...formData,
            items: items,
            orderTotal: this.orderTotal.toFixed(2),
            shipping: this.shipping,
            tax: this.tax.toFixed(2)
        };

        try {
            const response = await this.services.checkout(order);
            console.log('Order successful:', response);
            // Clear cart on successful order
            setLocalStorage(this.key, []);
            // Redirect to confirmation page (to be implemented)
            window.location.href = '/confirmation.html';
        } catch (err) {
            console.error('Checkout error:', err);
            alert('There was an error processing your order. Please try again.');
        }
    }
}