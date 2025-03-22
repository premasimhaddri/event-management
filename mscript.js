document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("customerName").value;
    const email = document.getElementById("customerEmail").value;
    sessionStorage.setItem("customerName", name);
    sessionStorage.setItem("customerEmail", email);
    document.getElementById("step1").classList.add("hidden");
    document.getElementById("step2").classList.remove("hidden");
});

const serviceCheckboxes = document.querySelectorAll(".service-checkbox");
const budgetInput = document.getElementById("eventBudget");
const calculatedCost = document.getElementById("calculatedCost");

function updateTotalCost() {
    let baseCost = parseInt(budgetInput.value) || 0;
    let additionalCost = 0;
    serviceCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            additionalCost += parseInt(checkbox.getAttribute("data-price"));
        }
    });
    calculatedCost.textContent = baseCost + additionalCost;
}

serviceCheckboxes.forEach((checkbox) =>
    checkbox.addEventListener("change", updateTotalCost)
);
budgetInput.addEventListener("input", updateTotalCost);

document.getElementById("eventDetailsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const eventDate = document.getElementById("eventDate").value;
    const eventLocation = document.getElementById("eventLocation").value;
    const budget = document.getElementById("eventBudget").value;
    const eventType = document.getElementById("eventType").value;
    const guestCount = document.getElementById("guestCount").value;

    const selectedServices = [];
    let totalCost = parseInt(budget) || 0;
    serviceCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedServices.push(checkbox.value);
            totalCost += parseInt(checkbox.getAttribute("data-price"));
        }
    });

    document.getElementById("displayName").textContent = sessionStorage.getItem("customerName");
    document.getElementById("displayEmail").textContent = sessionStorage.getItem("customerEmail");
    document.getElementById("displayEventType").textContent = eventType;
    document.getElementById("displayEventDate").textContent = eventDate;
    document.getElementById("displayEventLocation").textContent = eventLocation;
    document.getElementById("displayBudget").textContent = budget;
    document.getElementById("displayGuests").textContent = guestCount;
    document.getElementById("displayServices").textContent = selectedServices.length > 0 ? selectedServices.join(", ") : "None";
    document.getElementById("displayTotalCost").textContent = totalCost;

    document.getElementById("step2").classList.add("hidden");
    document.getElementById("final-details").classList.remove("hidden");
});