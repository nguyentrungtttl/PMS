function goBack() {
  window.history.back();
}

(async function () {
  async function fetchAndConvertRatePlans(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ratePlanObject = await response.json();
      console.log("ratePlanObject", ratePlanObject);
      // Use the new convertRatePlans logic directly
      const convertedRatePlans = convertRatePlans(ratePlanObject);

      console.log("data", convertedRatePlans);
      return convertedRatePlans;
    } catch (error) {
      console.error("Error fetching rate plans:", error);
      return null;
    }
  }

  function convertRatePlans(input) {
    const ratePlans = input.ratePlans;
    const data = [];

    ratePlans.forEach((ratePlanObj) => {
      const ratePlan = ratePlanObj.ratePlan;
      const specialRatePlans = ratePlanObj.specialRatePlan;

      const startDate = new Date(ratePlan.daystart);
      const endDate = new Date(ratePlan.dayEnd);

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        const day = d.toISOString().split("T")[0];
        let price = ratePlan.price;

        // Check if there's a special rate plan for the current day
        specialRatePlans.forEach((specialRatePlan) => {
          const specialStartDate = new Date(specialRatePlan.daystart);
          const specialEndDate = new Date(specialRatePlan.dayEnd);
          if (d >= specialStartDate && d <= specialEndDate) {
            price = specialRatePlan.specialPrice; // Use specialPrice instead of price
          }
        });

        data.push({ day, price });
      }
    });

    return data;
  }
  const id = sessionStorage.getItem("id");
  // const id = 21;
  console.log("id", id);
  const url = `https://api2-pnv.bluejaypos.vn/api/rate-plan/${id}`;
  const convertedRatePlans = await fetchAndConvertRatePlans(url);

  // ===================
  !(function (data) {
    var today = moment();

    function Calendar(selector, events) {
      this.el = document.querySelector(selector);
      this.events = events;
      this.current = moment().date(1);
      this.draw();
      var current = document.querySelector(".today");
      if (current) {
        var self = this;
        window.setTimeout(function () {
          self.openDay(current);
        }, 500);
      }
    }

    Calendar.prototype.draw = function () {
      //Create Header
      this.drawHeader();
      //Draw Day-Name
      this.drawDayName();
      //Draw Month
      this.drawMonth();
    };

    Calendar.prototype.drawHeader = function () {
      var self = this;
      if (!this.header) {
        //Create the header elements
        this.header = createElement("div", "header");
        this.header.className = "header";

        this.title = createElement("h1");

        var right = createElement("div", "right");
        right.addEventListener("click", function () {
          self.nextMonth();
        });

        var left = createElement("div", "left");
        left.addEventListener("click", function () {
          self.prevMonth();
        });

        //Append the Elements
        this.header.appendChild(this.title);
        this.header.appendChild(right);
        this.header.appendChild(left);
        this.el.appendChild(this.header);
      }

      this.title.innerHTML = this.current.format("MMMM YYYY");
    };
    Calendar.prototype.drawDayName = function () {
      if (!this.dayName) {
        //Create the dayName elements
        this.dayName = createElement("div", "dayName");
        this.dayName.className = "dayName";

        const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        dayNames.forEach((day) => {
          let daySpan = createElement("b");
          daySpan.innerHTML = day;
          this.dayName.appendChild(daySpan);
        });

        //Append the Elements
        this.el.appendChild(this.dayName);
      }

      this.title.innerHTML = this.current.format("MMMM YYYY");
    };

    Calendar.prototype.drawMonth = function () {
      var self = this;

      this.events.forEach(function (ev) {
        ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
      });

      if (this.month) {
        this.oldMonth = this.month;
        this.oldMonth.className = "month out " + (self.next ? "next" : "prev");
        this.oldMonth.addEventListener("webkitAnimationEnd", function () {
          self.oldMonth.parentNode.removeChild(self.oldMonth);
          self.month = createElement("div", "month");
          self.backFill();
          self.currentMonth();
          self.fowardFill();
          self.el.appendChild(self.month);
          window.setTimeout(function () {
            self.month.className = "month in " + (self.next ? "next" : "prev");
          }, 16);
        });
      } else {
        this.month = createElement("div", "month");
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = "month new";
      }
    };

    Calendar.prototype.backFill = function () {
      var clone = this.current.clone();
      var dayOfWeek = clone.day();

      if (!dayOfWeek) {
        return;
      }

      clone.subtract("days", dayOfWeek + 1);

      for (var i = dayOfWeek; i > 0; i--) {
        this.drawDay(clone.add("days", 1));
      }
    };

    Calendar.prototype.fowardFill = function () {
      var clone = this.current.clone().add("months", 1).subtract("days", 1);
      var dayOfWeek = clone.day();

      if (dayOfWeek === 6) {
        return;
      }

      for (var i = dayOfWeek; i < 6; i++) {
        this.drawDay(clone.add("days", 1));
      }
    };

    Calendar.prototype.currentMonth = function () {
      var clone = this.current.clone();

      while (clone.month() === this.current.month()) {
        this.drawDay(clone);
        clone.add("days", 1);
      }
    };

    Calendar.prototype.getWeek = function (day) {
      if (!this.week || day.day() === 0) {
        this.week = createElement("div", "week");
        this.month.appendChild(this.week);
      }
    };

    !(function () {
      var clickCount = 0;
      var dateStart, dateEnd;

      Calendar.prototype.drawDay = async function (day) {

        console.log("day",day);
        var self = this;
        this.getWeek(day);

        // Outer Day
        var outer = createElement("div", this.getDayClass(day));

        // Add data-day attribute
        outer.setAttribute("data-day", day.format("YYYY-MM-DD"));

       //Print room available of each days
        var avaiable = createElement("div", "avaiable");

        var dayData = data.find((d) => moment(d.day).isSame(day, "day"));
        console.log("available dayData", dayData);
        if (dayData) {
          avaiable.innerHTML = `Available: <b>${dayData.roomAvailability}/${dayData.numberOfRoom}</b> rooms`;
          var priceSpan = createElement("p");
          // priceSpan.textContent = `Price: $${(dayData.price / 1000).toFixed(0)}K`;
          // avaiable.appendChild(priceSpan);
        } else {
          avaiable.innerHTML = "Available: <b>0/0</b> rooms";
        }

        // Day Number
        var number = createElement("div", "day-number", day.format("DD"));

        // Events
        var events = createElement("div", "day-events");
        this.drawEvents(day, events);

        outer.appendChild(avaiable);
        outer.appendChild(number);
        outer.appendChild(events);
        this.week.appendChild(outer);

        const startDate = sessionStorage.getItem("startDate");
        const endDate = sessionStorage.getItem("endDate");

        console.log("startDate",startDate);
        console.log("endDate",endDate);

        // Thêm sự kiện click vào ngày
        outer.addEventListener("click", function () {
          clickCount++;
          // var selectedDay = this.getAttribute("data-day");
          var selectedDay = moment(this.getAttribute("data-day")).format("YYYY-MM-DD");

          // Xóa lớp selected từ tất cả các ngày
          var allDays = document.querySelectorAll(".day");
          allDays.forEach(function (day) {
            day.classList.remove("selected");
          });

          // Thêm lớp selected vào cả ngày bắt đầu và ngày kết thúc
          this.classList.add("selected");
          if (clickCount % 2 !== 0) {
            if (startDate && endDate) {
              const start = moment(startDate);
              const end = moment(endDate);
          
              console.log("selectedDay choose", selectedDay);
          
              if (moment(selectedDay).isBetween(start, end, undefined, '[]')) { // Inclusive of start and end
                console.log("Ngày nằm trong phạm vi.");
                dateStart = selectedDay;
                sessionStorage.setItem("startDate", dateStart);
                console.log("Ngày bắt đầu:", dateStart);
                // Perform actions when the day is within the range
              } else {
                console.log("Ngày không nằm trong phạm vi.");
                // Optional: Provide feedback if the date is outside the range
              }
            }
          } else {
            if (startDate && endDate) {
              const start = moment(startDate);
              const end = moment(endDate);
          
              if (moment(selectedDay).isBetween(start, end, 'day', '[]')) { // Inclusive of start and end
                console.log("Ngày nằm trong phạm vi.");
                dateEnd = selectedDay;
                sessionStorage.setItem("endDate", dateEnd);
                console.log("Ngày kết thúc:", dateEnd);
                // Perform actions when the day is within the range
          
                // Kiểm tra nếu ngày kết thúc nằm trước ngày bắt đầu
                if (moment(dateEnd).isBefore(dateStart)) {
                  alert("Ngày kết thúc không thể nằm trước ngày bắt đầu!");
                  return; // Ngăn chặn hành động tiếp theo nếu có lỗi
                }
              } else {
                console.log("Ngày không nằm trong phạm vi.");
                // Optional: Provide feedback if the date is outside the range
              }
            }
          
            // Kiểm tra nếu cả ngày bắt đầu và ngày kết thúc đã được chọn
            if (dateStart && dateEnd) {
              window.location.href = "/specialCreate";
            }
          }
          

        });
      };
    })();

    //Print the Price of Day
    Calendar.prototype.drawEvents = function (day, element) {
      var dayData = data.find((d) => moment(d.day).isSame(day, "day"));
      console.log("dayData", dayData);

      var nhiSpan = document.createElement("p");

      if (dayData && dayData.price !== undefined) {
        nhiSpan.textContent = `$${(dayData.price / 1000).toFixed(0)}`;
      } else {
        nhiSpan.textContent = "-";
      }

      element.appendChild(nhiSpan);
    };

    Calendar.prototype.getDayClass = function (day) {
      classes = ["day"];
      if (day.month() !== this.current.month()) {
        classes.push("other");
      } else if (today.isSame(day, "day")) {
        classes.push("today");
      }
      return classes.join(" ");
    };

    Calendar.prototype.nextMonth = function () {
      this.current.add("months", 1);
      this.next = true;
      this.draw();
    };

    Calendar.prototype.prevMonth = function () {
      this.current.subtract("months", 1);
      this.next = false;
      this.draw();
    };

    window.Calendar = Calendar;

    function createElement(tagName, className, innerText) {
      var ele = document.createElement(tagName);
      if (className) {
        ele.className = className;
      }
      if (innerText) {
        ele.innderText = ele.textContent = innerText;
      }
      return ele;
    }
  })(convertedRatePlans);

  !(function () {
    var data = [
      { eventName: "Lunch Meeting w/ Mark", calendar: "Work", color: "orange" },
      {
        eventName: "Interview - Jr. Web Developer",
        calendar: "Work",
        color: "orange",
      },
      {
        eventName: "Demo New App to the Board",
        calendar: "Work",
        color: "orange",
      },
      { eventName: "Dinner w/ Marketing", calendar: "Work", color: "orange" },

      { eventName: "Game vs Portalnd", calendar: "Sports", color: "blue" },
      { eventName: "Game vs Houston", calendar: "Sports", color: "blue" },
      { eventName: "Game vs Denver", calendar: "Sports", color: "blue" },
      { eventName: "Game vs San Degio", calendar: "Sports", color: "blue" },

      { eventName: "School Play", calendar: "Kids", color: "yellow" },
      {
        eventName: "Parent/Teacher Conference",
        calendar: "Kids",
        color: "yellow",
      },
      {
        eventName: "Pick up from Soccer Practice",
        calendar: "Kids",
        color: "yellow",
      },
      { eventName: "Ice Cream Night", calendar: "Kids", color: "yellow" },

      { eventName: "Free Tamale Night", calendar: "Other", color: "green" },
      { eventName: "Bowling Team", calendar: "Other", color: "green" },
      { eventName: "Teach Kids to Code", calendar: "Other", color: "green" },
      { eventName: "Startup Weekend", calendar: "Other", color: "green" },
    ];

    function addDate(ev) {}

    var calendar = new Calendar("#calendar", data);
  })();
})();

const firebaseConfig = {
  apiKey: "AIzaSyBTL2NwrzkBLCM07CQcKwOQB6OFWueERUw",
  authDomain: "bluejay-21878.firebaseapp.com",
  projectId: "bluejay-21878",
  storageBucket: "bluejay-21878.appspot.com",
  messagingSenderId: "245314083295",
  appId: "1:245314083295:web:819f166c0bbcdf0697cc6a",
  measurementId: "G-4WSDT2EGKV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database
const database = firebase.database();

// Initialize Firebase Cloud Messaging
const messaging = firebase.messaging();

// Request permission to send notifications
messaging
  .requestPermission()
  .then(() => {
    console.log("Notification permission granted.");
    return messaging.getToken();
  })
  .then((token) => {
    console.log("FCM Token:", token);
    // Save the token to your database
    database.ref("fcmTokens").push({ token });
  })
  .catch((error) => {
    console.error("Unable to get permission to notify.", error);
  });

// Handle incoming messages
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  alert("API Response Received: " + payload.data.message);
});
