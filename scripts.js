// script.js

// Ví dụ chức năng hiển thị thông báo khi người dùng nhấn nút Liên Hệ Mua
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', () => {
        alert('Cảm ơn bạn đã quan tâm! Chúng tôi sẽ liên hệ lại ngay.');
    });
});
// script.js

// Hàm tìm kiếm xe
function searchCars() {
    var input, filter, carList, carItems, title, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toLowerCase(); // Chuyển đổi đầu vào thành chữ thường
    carList = document.getElementById("carList");
    carItems = carList.getElementsByClassName('car-item');

    // Lặp qua các xe và ẩn những chiếc không khớp với tìm kiếm
    for (i = 0; i < carItems.length; i++) {
        title = carItems[i].getElementsByTagName("h3")[0];
        txtValue = title.textContent || title.innerText;

        // Kiểm tra nếu tên xe chứa từ khóa tìm kiếm
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            carItems[i].style.display = "";
        } else {
            carItems[i].style.display = "none";
        }
    }
}
// JavaScript để hiển thị hình ảnh
function showImage(service) {
    // Đặt các đường dẫn hình ảnh tương ứng cho các dịch vụ
    var images = {
        'repair-car': 'repair-car.jpg',

    };

    // Thay đổi hình ảnh và hiển thị
    var imageSrc = images[service];
    var imageElement = document.getElementById('service-image-display');

    // Cập nhật hình ảnh
    imageElement.src = imageSrc;
    imageElement.style.display = 'block'; // Hiển thị hình ảnh
}
