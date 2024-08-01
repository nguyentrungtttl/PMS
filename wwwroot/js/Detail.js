function goBack(){
  window.location.href= "/home";
}

function getIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  rateId = urlParams.get("id");
  console.log("rateId", rateId);

  sessionStorage.setItem("id", rateId);
  console.log(rateId);
  return rateId;
}

async function fetchData(result) {
  try {
    const response = await fetch(
      `https://api2-pnv.bluejaypos.vn/api/rate-plan/${result}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderData(data) {
  // console.log(data);
  if (typeof data === "object" && data !== null) {
    data.ratePlans.forEach((ratePlanObj) => {
      const ratePlan = ratePlanObj.ratePlan;

      let splitDayStart = ratePlan.daystart.split("T")[0];
      sessionStorage.setItem("startDate", splitDayStart);
     
      let splitDayEnd = ratePlan.dayEnd.split("T")[0];
      sessionStorage.setItem("endDate", splitDayEnd);
    
      document.getElementById(
        "productName"
      ).innerHTML = `<p>${ratePlan.name}</p>`;
      document.getElementById("productDetails").innerHTML = `
            <p> <b>Price:</b>  ${ratePlan.price}</p>
            <p> <b>Date start:</b> ${splitDayStart}</p>
            <p><b>Date end:</b> ${splitDayEnd}</p>
            <p><b>Occupancy limit:</b> ${ratePlan.occupancyLimit}</p>
            <p><b>Room type:</b> ${ratePlan.roomType.name}</p>
            <p><b>Payment constraint:</b> ${ratePlan.paymentConstraint.name}</p>
            <p><b>Cancel policy:</b> ${ratePlan.cancelPolicy.name}</p>
            <p><b>Status:</b> ${ratePlan.status ? "Active" : "Inactive"}</p>
        `;
    });
  }
}
// Thực thi khi trang được tải
document.addEventListener("DOMContentLoaded", async () => {
  const result = getIdFromUrl();
  if (result) {
    const data = await fetchData(result);
    if (data) {
      renderData(data);
    }
  }
});
