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
  
  
  
  
  //get data
  var data = [
    {
      "day":  "2024-07-31",
      "price": 100,
    },
    {
      "day":  "2024-08-01",
      "price": 200,
    },
  ]
  function formatDate(date) {
      if (!date) return '';
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
  }
  
  
//   var rateId;
//   var startDate;
//   var endDate;


  document.addEventListener("DOMContentLoaded", function() {
        var startDate = sessionStorage.getItem('startDate');
        console.log("startDate", startDate);


        var endDate = sessionStorage.getItem('endDate');
        console.log("endDate", endDate);
  
  
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
  
  
  // console.log("startDate.textContent", startDate.textContent);
  // async function getPrice() {
  //   try {
  //       const response = await fetch(`https://api2-pnv.bluejaypos.vn/api/rate-plan/${rateId}`);
  //       const data = await response.json();
  //       console.log('data', data);
  //       let price =  data.ratePlans[0].ratePlan.price
  //       console.log('price', price);
  //       return price;
       
  //   } catch (error) {
  //       console.error('Error fetching the data:', error);
  //   }
  // }
  
  
  // const priceElement = document.getElementById("price")
  // getPrice().then(price => {
  //   priceElement.value = price;
  // })
  const rateId = sessionStorage.getItem('id');

  
  async function getPrice() {
      try {
          console.log('Fetching price for rateId:', rateId);
          if (!rateId) {
              throw new Error('rateId is null or undefined');
          }
         
          const response = await fetch(
              `https://api2-pnv.bluejaypos.vn/api/rate-plan/${rateId}`
          );
          const data = await response.json();
          console.log("data", data);
  
  
          if (!data.ratePlans || data.ratePlans.length === 0) {
              throw new Error('No rate plans found in the response');
          }
  
  
          let price = data.ratePlans[0].ratePlan.price;
          console.log("price", price);
          return price;
      } catch (error) {
          console.error("Error fetching the data:", error);
          return null;
      }
  }
  

var priceElement = document.getElementById("price");


getPrice().then((price) => {
    console.log("Fetched price:", price);
    if (price !== null) {
        priceElement.value = price;
    } else {
        priceElement.value = 'Error fetching price';
    }
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
    let startDate = sessionStorage.getItem('startDate');
    console.log("startDate", startDate);


    let endDate = sessionStorage.getItem('endDate');
    console.log("endDate", endDate);

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
    console.log("click submit");
    const url = 'https://api2-pnv.bluejaypos.vn/api/special/rate-plan';
    let startDate = sessionStorage.getItem('startDate');
    console.log("startDate", startDate);

    let endDate = sessionStorage.getItem('endDate');
    console.log("endDate", endDate);
    Swal.fire({
        title: 'Success!',
        text:  'Special rate created. Synchronization is taking place',
        icon: 'success',
        confirmButtonText: 'OK'
    })
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
            text: "New info synchronized successfully",
            icon: 'success',
            confirmButtonText: 'OK'
    })
    .then(()=> window.location.href = '/home');
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
  
  
  