const API_BASE = "http://localhost:8080/api";

let allFoodItems = []; // Store fetched menu
let cart = [];         // Store added items

document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
});

async function loadMenu() {
    const container = document.getElementById("menu-container");
    container.innerHTML = '<p class="loading-text">Fetching fresh food...</p>';

    try {
        const response = await fetch(`${API_BASE}/menu`);
        const data = await response.json();

        // Auto-seed if empty
        if (data.length === 0) {
            await seedDatabase();
            return;
        }

        allFoodItems = data; // Save global reference
        renderMenu(data);

    } catch (error) {
        console.error("Error:", error);
        container.innerHTML = '<p class="loading-text" style="color:red">Failed to load menu. Is the Backend running?</p>';
    }
}

function renderMenu(items) {
    const container = document.getElementById("menu-container");
    container.innerHTML = "";

    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card";

        // We pass the 'index' to addToCart so we know exactly which object was clicked
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <div class="card-body">
                <div style="display:flex; justify-content:space-between; align-items:center">
                    <h3>${item.name}</h3>
                    <span class="price">$${item.price}</span>
                </div>
                <p style="color:gray; font-size:0.9rem">${item.category}</p>
                <button class="btn-add" onclick="addToCart(${index})">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// --- CART LOGIC ---

function addToCart(index) {
    const item = allFoodItems[index];
    cart.push(item);
    updateCartUI();

    // Optional: Visual feedback
    const btn = document.querySelectorAll('.btn-add')[index];
    const originalText = btn.innerText;
    btn.innerText = "Added!";
    btn.style.background = "#f97316";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "#111827";
    }, 500);
}

function updateCartUI() {
    const fab = document.getElementById("cart-fab");
    const countSpan = document.getElementById("cart-count");

    if (cart.length > 0) {
        fab.style.display = "block"; // Show button
        countSpan.innerText = cart.length;
    } else {
        fab.style.display = "none";
    }
}

// --- CHECKOUT LOGIC ---

function openCheckoutModal() {
    const modal = document.getElementById("checkout-modal");
    const summary = document.getElementById("order-summary");
    const totalEl = document.getElementById("order-total");

    // Calculate Total
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Create string list: "Burger, Pizza"
    const itemNames = cart.map(i => i.name).join(", ");

    summary.innerText = itemNames.length > 50 ? itemNames.substring(0, 50) + "..." : itemNames;
    totalEl.innerText = "$" + total.toFixed(2);

    modal.showModal(); // Native HTML Dialog function
}

function closeCheckoutModal() {
    document.getElementById("checkout-modal").close();
}

async function submitOrder(event) {
    event.preventDefault(); // Stop page reload

    const name = document.getElementById("customer-name").value;
    const address = document.getElementById("customer-address").value;
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    // Prepare the JSON payload matching our Java Order.java class
    const orderData = {
        customerName: name,
        address: address,
        items: cart.map(i => i.name).join(", "), // Simple string list
        totalAmount: total
    };

    try {
        const response = await fetch(`${API_BASE}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert("Order Placed Successfully! Food is on the way 🛵");
            cart = []; // Empty cart
            updateCartUI();
            closeCheckoutModal();
            document.getElementById("order-form").reset();
        } else {
            alert("Failed to place order.");
        }
    } catch (error) {
        console.error("Order Error:", error);
        alert("Server error. Check console.");
    }
}

// --- SEEDING ---
async function seedDatabase() {
    const dummyData = [
        { name: "Cheese Burst Pizza", price: 12.99, category: "Pizza", imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80" },
        { name: "Mega Chicken Burger", price: 8.50, category: "Burger", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80" },
        { name: "Spicy Tacos", price: 6.00, category: "Mexican", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d68c8e1297?auto=format&fit=crop&w=800&q=80" }
    ];

    for (const item of dummyData) {
        await fetch(`${API_BASE}/menu`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item)
        });
    }
    location.reload();
}