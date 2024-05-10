const SERVER_PREFIX = `http://localhost:3001`;

const API = {
    addCustomer(customer) {
        return fetch(`${SERVER_PREFIX}/customers`, {
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(customer),
            method: "POST",
        });
    },
    editCustomer(id, customer) {
        return fetch(`${SERVER_PREFIX}/customers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        });
    },
    deleteCustomer(id) {
        return fetch(`${SERVER_PREFIX}/customers/${id}`, {
            method: "DELETE"
        });
    },
    getAllCustomers() {
        return fetch(`${SERVER_PREFIX}/customers`);
    },
    getCustomer(id) {
        return fetch(`${SERVER_PREFIX}/customers/${id}`);
    },
};


export default API;