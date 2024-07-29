// var data = [
//   {
//       "id": 1,
//       "ratePlanId": 21,
//       "day": "2024-07-26T00:00:00",
//       "roomAvailability": 4,
//       "numberOfRoom": 4,
//       "price": 500000
//   },
//   {
//       "id": 2,
//       "ratePlanId": 22,
//       "day": "2024-07-27T00:00:00",
//       "roomAvailability": 3,
//       "numberOfRoom": 4,
//       "price": 600000
//   },
//   {
//       "id": 3,
//       "ratePlanId": 23,
//       "day": "2024-07-28T00:00:00",
//       "roomAvailability": 5,
//       "numberOfRoom": 5,
//       "price": 550000
//   },
//   {
//       "id": 4,
//       "ratePlanId": 24,
//       "day": "2024-07-29T00:00:00",
//       "roomAvailability": 2,
//       "numberOfRoom": 4,
//       "price": 650000
//   },
//   {
//       "id": 5,
//       "ratePlanId": 25,
//       "day": "2024-07-30T00:00:00",
//       "roomAvailability": 3,
//       "numberOfRoom": 4,
//       "price": 700000
//   },
//   {
//       "id": 6,
//       "ratePlanId": 26,
//       "day": "2024-07-31T00:00:00",
//       "roomAvailability": 1,
//       "numberOfRoom": 4,
//       "price": 720000
//   },
//   {
//       "id": 7,
//       "ratePlanId": 27,
//       "day": "2024-08-01T00:00:00",
//       "roomAvailability": 6,
//       "numberOfRoom": 6,
//       "price": 500000
//   }
// ]

function goBack(){
  window.history.back();
}


(async function (){
    async function getRoomSaleData(hotelId) {
      const url = `https://api2-pnv.bluejaypos.vn/api/room-sale?hotelId=${hotelId}`;
    
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        let data = await response.json();
        data = data.value;
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    const roomSaleData = await getRoomSaleData(2);
    
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
        console.log("data: ", data);
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
        var clickCount = 0; // Biến để đếm số lần click
        var dateStart, dateEnd; // Biến lưu ngày bắt đầu và ngày kết thúc
    
        // Hàm lấy màu tương ứng với vị trí trong khoảng thời gian đã chọn
        function getColorInRange(dayIndex, totalDays) {
          var hue = (dayIndex / totalDays) * 360;
          return "hsl(" + hue + ", 100%, 50%)";
        }
        console.log("data: ", data);
        //Print the room available of each days
        Calendar.prototype.drawDay = async function (day) {
          console.log("check day:  ", day);
          var self = this;
          this.getWeek(day);
    
          // Outer Day
          var outer = createElement("div", this.getDayClass(day));
    
          // Add data-day attribute
          outer.setAttribute("data-day", day.format("YYYY-MM-DD"));
    
          // Available rooms and price
          var avaiable = createElement("div", "avaiable");
    
          // var dayData = data.find((d) => {
          //   console.log(
          //     `Comparing: ${moment(d.day).format("YYYY-MM-DD")} with ${moment(
          //       day
          //     ).format("YYYY-MM-DD")}`
          //   );
          //   return moment(d.day).isSame(day, "day");
          // });
    
          var dayData = data.find(d => moment(d.day).isSame(day, 'day'));
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
    
          // Thêm sự kiện click vào ngày
          outer.addEventListener("click", function () {
            clickCount++;
            var selectedDay = this.getAttribute("data-day");
    
            // Xóa lớp selected từ tất cả các ngày
            var allDays = document.querySelectorAll(".day");
            allDays.forEach(function (day) {
              day.classList.remove("selected");
            });
    
            // Thêm lớp selected vào cả ngày bắt đầu và ngày kết thúc
            this.classList.add("selected");
            if (clickCount % 2 !== 0) {
              dateStart = selectedDay;
              sessionStorage.setItem("startDate", dateStart);
              alert(sessionStorage.getItem("startDate"));
              console.log("Ngày bắt đầu:", dateStart);
            } else {
              dateEnd = selectedDay;
              sessionStorage.setItem("endDate", dateEnd);
              console.log("Ngày kết thúc:", dateEnd);
    
              // Kiểm tra nếu cả ngày bắt đầu và ngày kết thúc đã được chọn
              if (dateStart && dateEnd) {
                // Đánh dấu tất cả các ngày trong khoảng thời gian đã chọn
                // markDateRange(dateStart, dateEnd);
                // Điều hướng đến trang createForm
                window.location.href = "/specialCreate"; 
              }
            }
          });
        };
        // Hàm để đánh dấu các ngày trong khoảng thời gian đã chọn
        function markDateRange(start, end) {
          var startDate = moment(start);
          var endDate = moment(end);
    
          var allDays = document.querySelectorAll(".day");
    
          allDays.forEach(function (dayElement) {
            var dayDate = moment(dayElement.getAttribute("data-day"));
    
            // Kiểm tra nếu ngày nằm trong khoảng từ startDate đến endDate (bao gồm cả startDate và endDate)
            if (
              dayDate.isSameOrAfter(startDate, "day") &&
              dayDate.isSameOrBefore(endDate, "day")
            ) {
              // Tô màu cho ngày trong khoảng
              dayElement.style.backgroundColor = getColorInRange(
                startDate.diff(dayDate, "days"),
                endDate.diff(startDate, "days") + 1
              );
              dayElement.classList.add("in-range"); // Thêm lớp in-range
            } else {
              // Xóa lớp in-range và làm sạch màu nền cho các ngày không trong khoảng
              dayElement.classList.remove("in-range");
              dayElement.style.backgroundColor = ""; // Hoặc bạn có thể đặt màu nền mặc định nếu cần
            }
          });
        }
    
        // Hàm lấy màu theo khoảng cách ngày
        function getColorInRange(daysDiffStart, totalDays) {
          // Bạn có thể tùy chỉnh màu sắc ở đây dựa trên khoảng cách ngày
          // Ví dụ: trả về màu xanh cho các ngày trong khoảng
          return "lightblue";
        }
      })();
    
      //Print the Price of Day
      Calendar.prototype.drawEvents = function (day, element) {
        var dayData = data.find((d) => moment(d.day).isSame(day, "day"));
        console.log("dayData", dayData);
        if (dayData) {
          var nhiSpan = document.createElement("p");
          nhiSpan.textContent = `${(dayData.price / 1000).toFixed(0)}K`;
          element.appendChild(nhiSpan);
        }
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
    })(roomSaleData);
    
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
  }) ();
  
  
  
  