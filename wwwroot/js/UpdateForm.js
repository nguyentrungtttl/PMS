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

// ============================= Handle API ===========================

document.addEventListener("DOMContentLoaded", function () {
  var rateId = sessionStorage.getItem("id");
  console.log("RateId", rateId);

  // ===================== Display data from criteria =====================
  fetch(
    `http://192.168.1.131:5034/api/room-type?hotelId=${sessionStorage.getItem(
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
  fetch("http://192.168.1.131:5034/api/payment-constraint")
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

  // ===================== Display data from RateId =====================

  let additionalNames = [];

  if (rateId) {
    fetch(`https://api2-pnv.bluejaypos.vn/api/rate-plan/${rateId}`)
      .then((response) => response.json())
      .then((data) => {
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
  event.preventDefault();
  console.log('successfull click ');

  const formData = new FormData(form);
  
  const rateId = sessionStorage.getItem("id");
  console.log(rateId);


  let objData = {
    rateId: sessionStorage.getItem("id"),
    // hotelId: sessionStorage.getItem("hotelId"),
    channelId: sessionStorage.getItem("channelId"),
    name: formData.get("name") || "",
    price: formData.get("price") || "",
    timeApplied: {
      start: moment(formData.get("timeAppliedStart")).format() || "",
      end: moment(formData.get("timeAppliedEnd")).format() || "",
    },
    occupancyLimit: formData.get("occupancyLimit") || "",
    paymentConstraint: formData.get("paymentConstraint") || "",
    roomTypeId: formData.get("roomType"),
    cancelPolicyId: formData.get("cancelPolicy") || "",
    status: formData.get("status") || "",
    addtionalId: Array.from(formData.getAll("addtional")),
  };
  console.log("addtionalId:", objData.addtionalId);

  try {
    let response = await fetch(
      "https://api2-pnv.bluejaypos.vn/api/rate-plan/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objData),
      }
    );

    window.location.href = `/detail${sessionStorage.getItem("id")}`;

    if (!response.ok) {
      let errorData = await response.json();
      throw new Error(`API Error: ${errorData.message || "Unknown error"}`);
    }

    let data = await response.json();
    listRatePlan = data;
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error fetching rate plans:", error);
  }
});