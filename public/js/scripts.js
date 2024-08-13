// Toggle between search types
function toggleSearch(type) {
  const passengerSearch = document.getElementById('passenger-search');
  const commercialSearch = document.getElementById('commercial-search');
  
  if (type === 'passenger') {
    passengerSearch.style.display = 'block';
    commercialSearch.style.display = 'none';
  } else if (type === 'commercial') {
    passengerSearch.style.display = 'none';
    commercialSearch.style.display = 'block';
  }
}

// Toggle between sub-search types
function toggleSubSearch(type) {
  const tireSizeSearch = document.getElementById('tire-size-search');
  const vehicleSearch = document.getElementById('vehicle-search');
  
  if (type === 'size') {
    tireSizeSearch.style.display = 'block';
    vehicleSearch.style.display = 'none';
  } else if (type === 'vehicle') {
    tireSizeSearch.style.display = 'none';
    vehicleSearch.style.display = 'block';
  }
}

// Flip sign-up form
function openSignup() {
  document.querySelector('.form-container').style.transform = 'rotateY(180deg)';
}

// Flip login form
function openLogin() {
  document.querySelector('.form-container').style.transform = 'rotateY(0deg)';
}

// Handle mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.getElementById('mobile-menu');
  const mobileNav = document.getElementById('mobile-navbar');

  menuIcon.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
  });
});

// Handle dropdown toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.arrow');

  toggles.forEach(toggle => {
    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      const dropdown = this.parentElement.querySelector('.dropdown');
      const arrow = this;
      if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        arrow.classList.add('open');
      } else {
        dropdown.style.display = 'none';
        arrow.classList.remove('open');
      }
    });
  });
});

// Booking Page Functionality
document.addEventListener('DOMContentLoaded', () => {
  const serviceRows = document.querySelectorAll('.booking-container .service-row');
  const serviceList = document.querySelector('.appointment-summary .service-list');

  // Object to keep track of selected services and their details
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || {};

  function updateAppointmentSummary() {
    // Clear the current list
    serviceList.innerHTML = '';

    // Add services to the list
    for (const [serviceName, details] of Object.entries(selectedServices)) {
      if (details.quantity > 0) { // Only display services with quantity > 0
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';

        serviceItem.innerHTML = `
          <span class="service-name">${serviceName}</span>
          <span class="service-quantity">
            <button class="quantity-btn decrease-quantity">-</button>
            <span>${details.quantity}</span>
            <button class="quantity-btn increase-quantity">+</button>
            <button class="quantity-btn remove-service">Remove</button>
          </span>
        `;

        serviceList.appendChild(serviceItem);
      }
    }

    // Add event listeners for quantity buttons and remove buttons
    serviceList.querySelectorAll('.decrease-quantity').forEach(button => {
      button.addEventListener('click', () => {
        const serviceName = button.closest('.service-item').querySelector('.service-name').textContent;
        if (selectedServices[serviceName].quantity > 1) {
          selectedServices[serviceName].quantity--;
        } else {
          selectedServices[serviceName].quantity = 0; // Set quantity to 0 instead of deleting
        }
        updateAppointmentSummary();
      });
    });

    serviceList.querySelectorAll('.increase-quantity').forEach(button => {
      button.addEventListener('click', () => {
        const serviceName = button.closest('.service-item').querySelector('.service-name').textContent;
        selectedServices[serviceName].quantity++;
        updateAppointmentSummary();
      });
    });

    serviceList.querySelectorAll('.remove-service').forEach(button => {
      button.addEventListener('click', () => {
        const serviceName = button.closest('.service-item').querySelector('.service-name').textContent;
        selectedServices[serviceName].quantity = 0; // Set quantity to 0 instead of deleting
        updateAppointmentSummary();
      });
    });

    // Save updated services to localStorage
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
  }

  serviceRows.forEach(row => {
    const heading = row.querySelector('h3');
    const priceText = row.querySelector('p').textContent;
    const priceMatch = priceText.match(/CA\$([\d,.]+)/);
    const price = priceMatch ? parseFloat(priceMatch[1].replace(/,/g, '')) : 0;

    heading.addEventListener('click', () => {
      const serviceName = heading.textContent;

      if (selectedServices[serviceName]) {
        selectedServices[serviceName].quantity++;
      } else {
        selectedServices[serviceName] = {
          quantity: 1,
          price: price
        };
      }

      updateAppointmentSummary();
    });
  });

  updateAppointmentSummary(); // Initialize summary display

  document.getElementById('next-btn').addEventListener('click', function () {
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    window.location.href = '/checkout';
  });
});

// Checkout Page Functionality
document.addEventListener('DOMContentLoaded', () => {
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || {};
  const selectedServicesList = document.getElementById('selected-services');

  let totalCost = 0;

  for (const [serviceName, details] of Object.entries(selectedServices)) {
    if (details.quantity > 0) { // Only display services with quantity > 0
      const serviceItem = document.createElement('div');
      serviceItem.className = 'service-item';
      const serviceTotal = details.price * details.quantity;

      serviceItem.innerHTML = `
        <div class="service-details">
          <span class="service-name">${serviceName}</span>
          <span class="service-quantity">Quantity: ${details.quantity}</span>
          <span class="service-price">Price per unit: CA$${details.price.toFixed(2)}</span>
          <span class="service-total">Total: CA$${serviceTotal.toFixed(2)}</span>
        </div>
      `;

      selectedServicesList.appendChild(serviceItem);

      totalCost += serviceTotal;
    }
  }

  // Display total cost at the end of the list
  const totalCostElement = document.createElement('div');
  totalCostElement.className = 'total-cost';
  totalCostElement.innerHTML = `<h4>Total Cost: CA$${totalCost.toFixed(2)}</h4>`;

  selectedServicesList.appendChild(totalCostElement);

  // Handle form submission
  document.getElementById('checkout-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Save customer details to localStorage
    const customerDetails = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      address: document.getElementById('address').value
    };
    localStorage.setItem('customerDetails', JSON.stringify(customerDetails));

    // Redirect to confirmation page
    window.location.href = '/confirmation';
  });
});

// Confirmation Page Functionality
document.addEventListener('DOMContentLoaded', () => {
  const customerDetails = JSON.parse(localStorage.getItem('customerDetails')) || {};
  const selectedServices = JSON.parse(localStorage.getItem('selectedServices')) || {};

  const customerDetailsDiv = document.getElementById('customer-details');
  const bookingSummaryDiv = document.getElementById('booking-summary');

  // Display customer details
  customerDetailsDiv.innerHTML = `
    <h3>Customer Details</h3>
    <p><strong>Name:</strong> ${customerDetails.name}</p>
    <p><strong>Email:</strong> ${customerDetails.email}</p>
    <p><strong>Phone:</strong> ${customerDetails.phone}</p>
    <p><strong>Address:</strong> ${customerDetails.address}</p>
  `;

  // Display booking summary
  let totalCost = 0;
  bookingSummaryDiv.innerHTML = '<h3>Your Selected Services</h3>';
  
  for (const [serviceName, details] of Object.entries(selectedServices)) {
    if (details.quantity > 0) { // Only display services with quantity > 0
      const serviceTotal = details.price * details.quantity;
      bookingSummaryDiv.innerHTML += `
        <div class="service-item">
          <div class="service-details">
            <span class="service-name">${serviceName}</span>
            <span class="service-quantity">Quantity: ${details.quantity}</span>
            <span class="service-price">Price per unit: CA$${details.price.toFixed(2)}</span>
            <span class="service-total">Total: CA$${serviceTotal.toFixed(2)}</span>
          </div>
        </div>
      `;
      totalCost += serviceTotal;
    }
  }

  bookingSummaryDiv.innerHTML += `
    <div class="total-cost">
      <h4>Total Cost: CA$${totalCost.toFixed(2)}</h4>
    </div>
  `;

  // Add event listener to the "Finish" button to clear localStorage and redirect
  document.getElementById('back-to-home').addEventListener('click', function () {
    // Clear selected services and customer details
    localStorage.removeItem('selectedServices');
    localStorage.removeItem('customerDetails');
    
    // Redirect to the homepage or another page
    window.location.href = '/';
  });
});
