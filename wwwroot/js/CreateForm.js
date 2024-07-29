let hotelId = sessionStorage.getItem("hotelId") || 1;
console.log("hotelId", hotelId);



document.addEventListener('DOMContentLoaded', async function(){
  await populateOptions();
  console.log('end populate dropdown');
})

const customSelect = document.querySelector(".custom-select");
const selectBtn = document.querySelector(".select-button");
const selectedValue = document.querySelector(".selected-value");
const optionsList = document.querySelectorAll(".select-dropdown li");
const selectedValues = [];

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




const form = document.getElementById("ratePlanForm");

form.addEventListener("submit", async function(event){
  event.preventDefault();
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const dayStart = document.getElementById("dayStart").value;
  const dayEnd = document.getElementById("dayEnd").value;
  const roomType = document.getElementById("roomType").value;
  const occupancyLimit = document.getElementById("occupancyLimit").value;
  // const channel = document.getElementById("channel").value;
  const paymentContraint = document.getElementById("paymentContraint").value;
  const cancelPolicy = document.getElementById("cancelPolicy").value;
  const addtionalCheckboxes = document.querySelectorAll("#additional input[type='checkbox']");
  console.log(addtionalCheckboxes);
  const additionalIds = Array.from(addtionalCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => parseInt(checkbox.value));
  const ratePlanData = {
    "Name": name,
    "Price": parseFloat(price),
    "DayStart": dayStart,
    "DayEnd": dayEnd,
    "OccupancyLimit": parseInt(occupancyLimit),
    "ChannelId":2,
    "PaymentConstraintId":parseInt(paymentContraint),
    "CancelPolicyId": parseInt(cancelPolicy),
    "RoomTypeId": parseInt(roomType),
    "AdditionalId":additionalIds,
  };

  try {
    console.log("POST method: ", ratePlanData);
    const response = await fetch("https://api2-pnv.bluejaypos.vn/api/rate-plan",{
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(ratePlanData)
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Rate plan created successfully:", responseData);
      alert("Rate plan created successfully!");
      window.location.href = "https://api2-pnv.bluejaypos.vn/home";
    }
    else{
      console.error("Error creating rate plan:", response.statusText);
      alert("Error creating rate plan. Please try again.");
    }
  }
  catch (error){
    console.error("Error:", error);
    alert("Error creating rate plan. Please try again.");  
  }
})



async function populateOptions(){
  try{//http://192.168.1.131:5034/api/room-type?hotelId=1
    const roomType = await (await fetch(`https://api2-pnv.bluejaypos.vn/api/room-type?hotelId=${hotelId}`)).json() || "Room type"
    console.log('roomType: ', roomType);
    const cancelPolicy = await (await fetch("https://api2-pnv.bluejaypos.vn/api/cancel-policy")).json() || "Room type"
    console.log('cancelPolicy: ', cancelPolicy);
    const paymentContraint = await (await fetch("https://api2-pnv.bluejaypos.vn/api/payment-constraint")).json()
    console.log('fetch paymentContraint: ', paymentContraint);
    const additional = await (await fetch(`https://api2-pnv.bluejaypos.vn/api/additional?hotelId=${hotelId}`)).json()
    populateDropdown("roomType", roomType);
    populateDropdown("cancelPolicy", cancelPolicy);
    populateDropdown("paymentContraint", paymentContraint);
    populateCheckboxes("additional", additional)
  } catch (error){
    console.log("Error fetching dropdown data:", error);
  }
}
function populateOccupancyLimitDropdown(capacity) {
  const dropdown = document.getElementById("occupancyLimit");
  dropdown.innerHTML = ''; 
  for (let i = 1; i <= capacity; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    dropdown.appendChild(option);
  }
}

// let capacityMemory = [];
// function populateDropdownOccupancy(elementId, capacity){
//   const dropdown = document.getElementById(elementId);
//   dropdown.innerHTML = '<option selected>Choose...</option>';
//   let data = []
//   for (let i=1; i<=capacity; i++){
//     const option = document.createElement("option");
//     option.value = parseInt(i);
//     option.textContent = parseInt(i); 
//     dropdown.appendChild(option);
//   }
// }
function populateDropdown(elementId, data){
  
  const dropdown = document.getElementById(elementId);
  dropdown.innerHTML = '';
  console.log(data);
  data["value"].forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name; 
    option.dataset.capacity = item.capacity; // Store capacity in a data attribute

    dropdown.appendChild(option);
    // if (elementId == "roomType"){
    //   capacityMemory.push({
    //     id: item.id,
    //     capacity: item.capacity
    //   })
    // }
  })
}

document.getElementById("roomType").addEventListener("change", function() {
  const selectedRoomType = this.options[this.selectedIndex];
  const capacity = selectedRoomType.dataset.capacity;
  populateOccupancyLimitDropdown(capacity);
});


async function populateCheckboxes(elementId, data) {
  try {
      const additionalContainer = document.getElementById(elementId);
      additionalContainer.innerHTML = '';
      data["value"].forEach(item => {
          const li = document.createElement("li");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = `additional-${item.id}`;
          checkbox.value = item.id;
          
          const label = document.createElement("label");
          label.htmlFor = `additional-${item.id}`;
          label.textContent = item.name;

          checkbox.addEventListener('change', updateSelectedValues);

          li.appendChild(checkbox);
          li.appendChild(label);
          additionalContainer.appendChild(li);
      });
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}



function updateSelectedValues() {
  const additionalCheckboxes = document.querySelectorAll("#additional input[type='checkbox']");
  const selectedValues = Array.from(additionalCheckboxes)
                              .filter(checkbox => checkbox.checked)
                              .map(checkbox => checkbox.nextSibling.textContent);
  const selectedValueSpan = document.querySelector('.selected-value');
  selectedValueSpan.textContent = selectedValues.join(', ') || 'Open this select menu';
}



// https://api2-pnv.bluejaypos.vn/api/rate-plan


// {
//   "Name":"Du lich Da Nang",
//   "Price":20000,
//   "DayStart":"2027-05-01",
//   "DayEnd":"2027-09-01",
//   "OccupancyLimit":4,
//   "ChannelId":2,
//   "PaymentConstraintId":1,
//   "CancelPolicyId":1,
//   "RoomTypeId":8,
//   "AdditionalId":[1,2]
// }



