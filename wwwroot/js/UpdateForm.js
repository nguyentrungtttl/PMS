const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");
const selectedValue = document.querySelector(".selected-value");
const optionsList = document.querySelectorAll(".select-dropdown li");
const selectedValues = [];

function goBack(){
  window.history.back();
}

const firebaseConfig = {
  apiKey: "AIzaSyBTL2NwrzkBLCM07CQcKwOQB6OFWueERUw",
  authDomain: "bluejay-21878.firebaseapp.com",
  projectId: "bluejay-21878",
  storageBucket: "bluejay-21878.appspot.com",
  messagingSenderId: "245314083295",
  appId: "1:245314083295:web:819f166c0bbcdf0697cc6a",
  measurementId: "G-4WSDT2EGKV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Request permission to send notifications
messaging.requestPermission().then(() => {
  console.log('Notification permission granted.');
  return messaging.getToken();
}).then((token) => {
  console.log('FCM Token:', token);
  // Save the token to your database
  database.ref('fcmTokens').push({ token });
}).catch((error) => {
  console.error('Unable to get permission to notify.', error);
});

// Handle incoming messages
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  alert('API Response Received: ' + payload.data.message);
});


selectBtn.addEventListener("click", (event) => {

  
  event.preventDefault();
  customSelect.classList.toggle("active");
  selectBtn.setAttribute(
    "aria-expanded",
    selectBtn.getAttribute("aria-expanded") === "true" ? "false" : "true"
  );
});

optionsList.forEach((option) => {
  const checkbox = option.querySelector("input[type='checkbox']");
  const label = option.querySelector("label");
  const value = label.textContent;

  checkbox.addEventListener("change", (e) => {
    if (e.target.checked) {
      if (!selectedValues.includes(value)) {
        selectedValues.push(value);
      }
    } else {
      const index = selectedValues.indexOf(value);
      if (index > -1) {
        selectedValues.splice(index, 1);
      }
    }
    selectedValue.textContent = selectedValues.join(", ");
    // Hidden dropdown after choosed
    customSelect.classList.remove("active");
    selectBtn.setAttribute("aria-expanded", "false");
  });
});

// ============================= Handle API ===========================



document.addEventListener("DOMContentLoaded", async function () {

  var serviceWorkerRegistration;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('js/service-worker.js')
    .then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
      serviceWorkerRegistration = registration;
    }).catch(function(error) {
      console.error('Service Worker registration failed:', error);
    });
  }
  var rateId = sessionStorage.getItem("id");
  console.log("RateId", rateId);

  // ===================== Display data from criteria =====================
  fetch(
    `https://api2-pnv.bluejaypos.vn/api/room-type?hotelId=${sessionStorage.getItem(
      "hotelId"
    )}`
  )
    .then((response) => response.json())
    .then((data) => {
      const roomTypes = data.value;
      const roomTypeSelect = document.getElementById("roomType");

      while (roomTypeSelect.options.length > 1) {
        roomTypeSelect.remove(1);
      }

      roomTypes.forEach((roomType) => {
        const option = document.createElement("option");
        option.value = roomType.id;
        option.textContent = roomType.name;
        roomTypeSelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching room types:", error);
    });

  fetch("https://api2-pnv.bluejaypos.vn/api/cancel-policy")
    .then((response) => response.json())
    .then((data) => {
      const cancelPolicies = data.value;
      const cancelPolicySelect = document.getElementById("cancelPolicy");

      while (cancelPolicySelect.options.length > 1) {
        cancelPolicySelect.remove(1);
      }
      cancelPolicies.forEach((cancelPolicy) => {
        const option = document.createElement("option");
        option.value = cancelPolicy.id;
        option.textContent = cancelPolicy.name;
        cancelPolicySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching cancel policies:", error);
    });
  fetch("https://api2-pnv.bluejaypos.vn/api/payment-constraint")
  
    .then((response) => response.json())
    .then((data) => {
      const payments = data.value;
      const paymentSelected = document.getElementById("paymentConstraint");

      while (paymentSelected.options.length > 1) {
        paymentSelected.remove(1);
      }
      payments.forEach((paymentConstraint) => {
        const option = document.createElement("option");
        option.value = paymentConstraint.id;
        option.textContent = paymentConstraint.name;
        paymentSelected.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching cancel policies:", error);
    });

const previousButton = document.getElementById("previous-button");
previousButton.addEventListener("click", ()=>{
    window.location.href = `/detail?id=${sessionStorage.getItem("id")}`;
})
  // ===================== Display data from RateId =====================

  let additionalNames = [];
console.log("Prefetching");
  if (rateId) {
    fetch(`https://api2-pnv.bluejaypos.vn/api/rate-plan/${rateId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        const additional = data.ratePlans[0].additional;
        const additionalNames = additional.map((item) => item.name);
        console.log('additionalNames',additionalNames);

        fetch("https://api2-pnv.bluejaypos.vn/api/additional")
          .then((response) => response.json())
          .then((data) => {
            const additionals = data.value;
            const ulElement = document.getElementById("addtional");

            ulElement.innerHTML = "";

            additionals.forEach((additional, index) => {
              const li = document.createElement("li");

              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.id = `checkbox-${index}`;

              if (additionalNames.includes(additional.name)) {
                checkbox.checked = true;
              }

              const label = document.createElement("label");
              label.setAttribute("for", checkbox.id);
              label.textContent = additional.name;

              li.appendChild(checkbox);
              li.appendChild(label);

              ulElement.appendChild(li);
            });
          })
          .catch((error) => {
            console.error("Error fetching data from additional API:", error);
          });

        console.log("additional", additional);

        const ratePlan = data.ratePlans[0].ratePlan;

        const channelId = ratePlan.channel.id;
        sessionStorage.setItem("channelId", channelId);

        const storedChannelId = sessionStorage.getItem("channelId");
        console.log("storedChannelId", storedChannelId);

        document.getElementById("name").value = ratePlan.name;
        document.getElementById("price").value = ratePlan.price;
        document.getElementById("dayStart").value =
          ratePlan.daystart.split("T")[0];
        document.getElementById("dayEnd").value = ratePlan.dayEnd.split("T")[0];
        document.getElementById("roomType").value = ratePlan.roomType.name;
        document.getElementById("occupancyLimit").value =
          ratePlan.occupancyLimit;
        document.getElementById("cancelPolicy").value =
          ratePlan.cancelPolicy.name;
        document.getElementById("paymentConstraint").value =
          ratePlan.paymentConstraint.name;
        document.getElementById("status").value = ratePlan.status ? 1 : 2;

        // =========== Display data in room type ===============
        const roomTypeSelect = document.getElementById("roomType");
        const selectedOption = roomTypeSelect.querySelector(
          `option[value='${ratePlan.roomType.id}']`
        );
        if (selectedOption) {
          selectedOption.textContent = ratePlan.roomType.name;
          roomTypeSelect.value = ratePlan.roomType.id;
        }
        // =========== Display data in cancel policy ===============
        const cancelSelect = document.getElementById("cancelPolicy");
        const selectedCancel = cancelSelect.querySelector(
          `option[value='${ratePlan.cancelPolicy.id}']`
        );
        if (selectedCancel) {
          selectedCancel.textContent = ratePlan.cancelPolicy.name;
          cancelSelect.value = ratePlan.cancelPolicy.id;
        }
        // =========== Display data in payment constraint ===============
        const paymentSelect = document.getElementById("paymentConstraint");
        const paymentSelected = paymentSelect.querySelector(
          `option[value='${ratePlan.paymentConstraint.id}']`
        );
        if (paymentSelected) {
          paymentSelected.textContent = ratePlan.paymentConstraint.name;
          paymentSelect.value = ratePlan.paymentConstraint.id;
        }
        // =========== Display data in additional ==============

        const selectedValueSpan = document.querySelector(".selected-value");

        if (selectedValueSpan) {
          if (additional.length === 0) {
            selectedValueSpan.textContent = "No additional";
          } else {
            const additionalNames = additional.map((item) => item.name);
            selectedValueSpan.textContent = additionalNames.join(", ");
          }
        }
      })
      .catch((error) => console.error("Error fetching rate plan:", error));
  }
});



// ================= Handle upadte =============
form.addEventListener("submit", async function (event) {
  console.log("submit click");
  event.preventDefault();
  console.log('successfull click ');

  const formData = new FormData(form);
  
  const rateId = sessionStorage.getItem("id");
  // console.log("Name:", formData.get("name") || "");
  // console.log("Price:", formData.get("price") || "");
  console.log("formGet: ", document.getElementById("dayStart").value);
  console.log("DayStart:", document.getElementById("dayStart").value || "");
  console.log("DayEnd:", document.getElementById("dayEnd").value || "");
  console.log("OccupancyLimit:", formData.get("occupancyLimit") || "");
  console.log("ChannelId:", sessionStorage.getItem("channelId"));
  console.log("PaymentConstraintId:", formData.get("paymentConstraint") || "");
  console.log("CancelPolicyId:", formData.get("cancelPolicy") || "");
  console.log("RoomTypeId:", formData.get("roomType"));
  console.log("AdditionalId:", Array.from(formData.getAll("addtional")));
  var objData = {
    "Id": rateId,
    "Name": formData.get("name") || "",
    "Price": formData.get("price") || "",
    "DayStart": document.getElementById("dayStart").value || "",
    "DayEnd": document.getElementById("dayEnd").value  || "",
    "OccupancyLimit": formData.get("occupancyLimit") || "",
    "ChannelId": sessionStorage.getItem("channelId"),
    "PaymentConstraintId": formData.get("paymentConstraint") || "",
    "CancelPolicyId": formData.get("cancelPolicy") || "",
    "RoomTypeId": formData.get("roomType"),
    "AdditionalId": [1,2],
  };
  console.log('objData', objData);


  console.log('rateId', rateId);
  Swal.fire({
    title: 'Submited!',
    text: "Update information is valid. Synchronization is taking place",
    icon: 'success',
    confirmButtonText: 'OK'
  })
  try {
    let response = await fetch("https://api2-pnv.bluejaypos.vn/api/rate-plan/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objData),
    })
    console.log('response', response);

    if (!response.ok) {
      console.log("Not oke");
      let errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || "Unknown error"}`);
    }
    else{
      let data = await response.json();
      console.log("data: ", data);
      localStorage.setItem('apiResponse', JSON.stringify(data));
      
    }
    
  } catch (error) {
    console.error("Error fetching rate plans:", error);
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
  // window.location.href = `/detail?id=${sessionStorage.getItem("id")}`;

  // sendMessageToServiceWorker({ type: 'CHECK_RESPONSE' });



});


setInterval(() => {
  let response = localStorage.getItem('apiResponse');
  console.log('checking sync');
  if (response) {
    Swal.fire({
      title: 'Success!',
      text: "New info synchronized successfully",
      icon: 'success',
      confirmButtonText: 'OK'
    })
    localStorage.removeItem('apiResponse'); // Clear the response once alerted
  }
}, 1000); 