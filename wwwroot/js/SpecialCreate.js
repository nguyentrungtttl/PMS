function goBack(){
  window.history.back();
}


function toggleDropdown() {
  document.getElementById("dropdown-content").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}


//get data
function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the rateId, startDate, and endDate from sessionStorage
    let rateId = sessionStorage.getItem('id');
    console.log('rateId', rateId);

    let startDate = sessionStorage.getItem('startDate');
    console.log("startDate", startDate);

    let endDate = sessionStorage.getItem('endDate');
    console.log("endDate", endDate);

    // Check if elements exist and set their content
    const startDateElement = document.getElementById("date-start-info");
    if (startDateElement) {
        startDateElement.textContent = formatDate(startDate);
    } else {
        console.error("Element with id 'date-start-info' not found.");
    }

    const endDateElement = document.getElementById("date-end-info");
    if (endDateElement) {
        endDateElement.textContent = formatDate(endDate);
    } else {
        console.error("Element with id 'date-end-info' not found.");
    }
});

// const priceElement = document.getElementById("price")
// getPrice().then(price => {
//   priceElement.value = price;
// })

async function getPrice() {
    try {
        const rateId = sessionStorage.getItem('id');
        console.log('Fetching price for rateId:', rateId);
        if (!rateId) {
            throw new Error('rateId is null or undefined');
        }
        
        const response = await fetch(`https://api2-pnv.bluejaypos.vn/api/rate-plan/${rateId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Fetched data:", data);

        if (!data.ratePlans || data.ratePlans.length === 0) {
            throw new Error('No rate plans found in the response');
        }

        let price = data.ratePlans[0].ratePlan.price;
        console.log("Parsed price:", price);
        return price;
    } catch (error) {
        console.error("Error fetching the data:", error);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const priceElement = document.getElementById("price");
    if (!priceElement) {
        console.error("Element with id 'price' not found.");
        return;
    }

    getPrice().then((price) => {
        console.log("Fetched price:", price);
        if (price !== null) {
            priceElement.value = price;
        } else {
            priceElement.value = 'Error fetching price';
        }
    });
});




let validDates = []; 

let show = true;

function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");
    checkboxes.style.display = show ? "block" : "none";
    show = !show;
}

function getDateFromDayInRange(day, startDate, endDate) {
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const start = new Date(startDate);
    const end = new Date(endDate);
    let currentDate = new Date(start);
    let datesInRange = [];

    while (currentDate <= end) {
        if (dayNames[currentDate.getDay()] === day) {
            datesInRange.push(new Date(currentDate)); // Store a copy of the date
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }

    if (datesInRange.length === 0) {
        throw new Error(`Selected day ${day} is out of range!`);
    }

    return datesInRange;
}

function updateSelectedOptions() {
    let checkboxes = document.querySelectorAll('#checkBoxes input[type="checkbox"]');
    let selected = [];
    validDates = []; // Reset the global array

    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            try {
                let dates = getDateFromDayInRange(checkbox.value, startDate, endDate);
                selected.push(checkbox.value);
                validDates = validDates.concat(dates);
            } catch (error) {
                alert(error.message);
                checkbox.checked = false;
            }
        }
    });

    document.getElementById("selectedOptions").options[0].text = selected.length > 0 ? selected.join(", ") : "Select options";
    console.log("Valid Dates:", validDates);
    return validDates;
}

// Adding event listeners to the checkboxes
document.querySelectorAll('#checkBoxes input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateSelectedOptions);
});




document.getElementById('submit').addEventListener('click', function() {
  const url = 'https://api2-pnv.bluejaypos.vn/api/special/rate-plan';
  const data = {
      "RatePlanId": rateId,
      "DayStart": startDate,
      "DayEnd": endDate,
      "Price": priceElement.value,
      "SpecialDay": validDates,
  };
  console.log('Submitting data:', data); 

  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
      Swal.fire({
        title: 'Success!',
        text: data.message + " because you have not made any changes",
        icon: 'success',
        confirmButtonText: 'OK'
    })
    .then(()=> window.location.href = '/home' )
    ;
  })

  .catch((error) => {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error submitting your data.',
        icon: 'error',
        confirmButtonText: 'OK'
    });
  });
});
