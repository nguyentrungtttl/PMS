function filter() {
    document.getElementById("filter").style.display = "block";
    console.log("successful");
  }
  
  
  let table = document.getElementById("table");
  let filterForm = document.querySelector(".filterForm");
  let listRatePlan = [];
  
  
  filterForm.addEventListener("submit", function (event) {
    event.preventDefault();
    this.style.display = "none";
  
  
    let formData = new FormData(this);
    let filterCriteria = {
      hotelId : sessionStorage.getItem("hotelId") ,
      channelName: formData.get("channelName") || "",
      roomType: Array.from(formData.getAll("roomType")),
      status: formData.get("status") || "",
      timeApplied: {
        start: moment(formData.get("timeAppliedStart")).format() || "",
        end: moment(formData.get("timeAppliedEnd")).format() || "",
      },
    };
  
  
    console.log("filterCriteria:", filterCriteria);
    fetchRatePlans(filterCriteria);
    async function fetchRatePlans(filterCriteria) {
      try {
        let url = `https://api2-pnv.bluejaypos.vn/api/rate-plan?hotelId=${filterCriteria.hotelId}&channelName=${
          filterCriteria.channelName
        }&roomTypeNames=${filterCriteria.roomType.join(
          ","
        )}&&status=${encodeURIComponent(filterCriteria.status)}
        &timeAppliedStart=${encodeURIComponent(
          filterCriteria.timeApplied.start
        )}&timeAppliedEnd=${encodeURIComponent(filterCriteria.timeApplied.end)}`;
  
  
        let response = await fetch(url);
        let data = await response.json();
        listRatePlan = data;
        console.log("API Response:", data);
  
  
        showListRatePlan(listRatePlan);
      } catch (error) {
        console.error("Error fetching rate plans:", error);
      }
    }
  });
  
  
  function showListRatePlan(listRatePlan) {
    let tableBody = table.querySelector("tbody");
    tableBody.innerHTML = "";
  
  
    if (typeof listRatePlan === "object" && listRatePlan !== null) {
      Object.keys(listRatePlan).forEach((groupKey) => {
        let ratePlanArray = listRatePlan[groupKey];
  
  
        if (Array.isArray(ratePlanArray)) {
          ratePlanArray.forEach((plan) => {
            let splitDayStart = plan.ratePlan.daystart.split("T")[0];
            let splitDayEnd = plan.ratePlan.dayEnd.split("T")[0];
            let row = document.createElement("tr");
           
            console.log(plan.ratePlan.status );
  
            row.innerHTML = `
            <td><a href="/detail?id=${plan.ratePlan.id}" class="navigate">${
              plan.ratePlan.name
            }</a></td>
  

              <td>${plan.ratePlan.roomType.name}</td>
              <td>
                <span class="status  
                 ${plan.ratePlan.status ? "return" : "Inactivate"}">
                  ${plan.ratePlan.status === true ? "Active" : "Inactive"}
                </span>
              </td>
              <td>${splitDayStart + " - " + splitDayEnd}</td>
            `;
            tableBody.appendChild(row);
          });
        } else {
          console.error(
            `Value for key ${groupKey} is not an array:`,
            ratePlanArray
          );
        }
      });
    } else {
      console.error("listRatePlan is not an object:", listRatePlan);
    }
  }
  
  function confirmLogout(event) {
    event.preventDefault(); 
    const userConfirmed = confirm("Are you sure you want to log out?");
    if (userConfirmed) {
        window.location.href = event.currentTarget.href; 
    }
}
  
  
  
  
  