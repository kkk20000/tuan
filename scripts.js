const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // Số ngày trong các tháng (không tính năm nhuận)
let currentMonth = new Date().getMonth(); // Tháng hiện tại (0 - 11)
let currentYear = new Date().getFullYear(); // Năm hiện tại (cố định)

function generateCalendar(month, year) {
    const calendarBody = document.getElementById("calendar-body");
    const monthName = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
    const dayNames = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];

    // Cập nhật tiêu đề tháng
    document.getElementById("month-name").textContent = `${monthName[month]} - Năm ${year}`;

    const totalDaysInMonth = daysInMonth[month] + (month === 1 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) ? 1 : 0); // Điều chỉnh cho năm nhuận
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Ngày đầu tháng là thứ mấy

    let date = 1;
    calendarBody.innerHTML = ""; // Xóa lịch cũ

    // Tạo dòng tên ngày trong tuần
    let tr = document.createElement("tr");
    for (let i = 0; i < dayNames.length; i++) {
        let th = document.createElement("th");
        th.textContent = dayNames[i];
        tr.appendChild(th);
    }
    calendarBody.appendChild(tr);

    // Tạo các ngày trong tháng
    for (let row = 0; row < 6; row++) { // 6 hàng cho lịch (có thể chứa tối đa 42 ô)
        tr = document.createElement("tr");
        for (let col = 0; col < 7; col++) {
            let td = document.createElement("td");

            if (row === 0 && col < firstDayOfMonth) {
                td.innerHTML = ''; // Ô trống cho các ngày trước tháng
            } else if (date <= totalDaysInMonth) {
                td.innerHTML = `
                    <div class="date">${date}</div>
                    <textarea class="goal-input" id="goal-${date}" placeholder="Nhập mục tiêu..." oninput="autoResize(this)" onchange="saveGoal(${date})" onclick="zoomIn(${date})"></textarea>
                `;

                // Kiểm tra ngày hôm nay
                if (date === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    td.classList.add('today');
                }

                // Lấy mục tiêu đã lưu từ localStorage
                const savedGoal = localStorage.getItem(`goal-${year}-${month}-${date}`);
                if (savedGoal) {
                    td.querySelector(`#goal-${date}`).value = savedGoal;
                }

                date++;
            }
            tr.appendChild(td);
        }
        calendarBody.appendChild(tr);
    }
}

// Hàm phóng to ô ngày khi nhấn
let currentZoomedDate = null; // Biến để theo dõi ô ngày đang được phóng to

function zoomIn(date) {
    const goalInput = document.getElementById(`goal-${date}`);

    // Nếu đã có ô nào đang được phóng to, thu nhỏ nó lại
    if (currentZoomedDate !== null && currentZoomedDate !== date) {
        const previousGoalInput = document.getElementById(`goal-${currentZoomedDate}`);
        previousGoalInput.classList.remove("zoomed"); // Loại bỏ lớp zoomed của ô cũ
    }

    // Phóng to ô ngày mới
    goalInput.classList.toggle("zoomed"); // Thêm/loại bỏ lớp zoomed cho textarea

    // Cập nhật biến để theo dõi ô ngày đang được phóng to
    currentZoomedDate = date;

    // Đảm bảo textarea có chiều cao phù hợp với nội dung
    autoResize(goalInput);
}


// Hàm tự động điều chỉnh chiều cao của textarea
function autoResize(textarea) {
    textarea.style.height = 'auto'; // Đặt lại chiều cao về 'auto' để tính toán lại chiều cao mới
    textarea.style.height = (textarea.scrollHeight) + 'px'; // Điều chỉnh chiều cao theo nội dung
}

// Lưu mục tiêu vào localStorage
function saveGoal(day) {
    const goalInput = document.getElementById(`goal-${day}`);
    const goalValue = goalInput.value;

    // Lưu mục tiêu vào localStorage (bao gồm năm, tháng, ngày)
    const goalKey = `goal-${currentYear}-${currentMonth}-${day}`;
    localStorage.setItem(goalKey, goalValue);
}

// Hàm tìm tháng tự động
function searchDate() {
    const monthSelect = document.getElementById("search-month").value;

    if (monthSelect !== "") {
        currentMonth = parseInt(monthSelect);
        generateCalendar(currentMonth, currentYear); // Cập nhật lại lịch theo tháng đã chọn
    }
}

// Khởi tạo lịch ban đầu
generateCalendar(currentMonth, currentYear);
