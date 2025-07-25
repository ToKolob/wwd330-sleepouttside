document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.forms['checkout'];
    if (form.checkValidity()) {
        myCheckout.checkout();
    } else {
        form.reportValidity();
    }
});