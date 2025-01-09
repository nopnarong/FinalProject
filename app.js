// ตัวแปรที่ใช้ในโค้ด Hi
let gender, weight, height, age, kcalLoss, kcalGain, activityLevel, bmr, dailyBMR, dailyTDEE;

// ฟังก์ชันสำหรับคำนวณ BMR (Basal Metabolic Rate)
function calcBMR() {
    // ป้องกันการส่งฟอร์มแบบดั้งเดิม
    $(document).on('submit', '#personalInfo', function(event) {
        event.preventDefault();
    });

    // รับค่าจากฟอร์ม
    gender = $("#gender")[0].value;  // เพศ
    weight = $("#weight")[0].value;  // น้ำหนัก (กก.)
    height = $("#height")[0].value;  // ส่วนสูง (ซม.)
    age = $("#age")[0].value;        // อายุ (ปี)
    activityLevel = $("#actLevel")[0].value;  // ระดับกิจกรรม

    // ตรวจสอบเพศและคำนวณ BMR
    if (gender === "male") { 
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === "female") { 
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
        alert("Please provide all the details.");
        return; // หยุดการทำงานหากข้อมูลไม่ครบ
    }

    // คำนวณค่าที่เกี่ยวข้อง
    dailyBMR = bmr;  // BMR รายวัน
    dailyTDEE = bmr * activityLevel;  // TDEE (Total Daily Energy Expenditure)
    kcalLoss = dailyTDEE * 0.8;  // แคลอรี่สำหรับลดน้ำหนัก
    kcalGain = dailyTDEE * 1.1;  // แคลอรี่สำหรับเพิ่มน้ำหนัก

    // แสดงผลลัพธ์
    printResults();
}

// ฟังก์ชันสำหรับแสดงผลลัพธ์
function printResults() {
    // แสดงผลส่วนของผลลัพธ์
    $("#results-list")
        .removeClass("d-none animate__fadeOut")
        .addClass("animate__fadeIn");

    // อัปเดตค่าผลลัพธ์ใน HTML
    $("#dailyBMR").html(Math.round(dailyBMR));
    $("#dailyTDEE").html(Math.round(dailyTDEE));
    $("#dailyLose").html(Math.round(kcalLoss));
    $("#dailyGain").html(Math.round(kcalGain));
}

// ฟังก์ชันสำหรับล้างผลลัพธ์
function clearResults() {
    $("#results-list")
        .removeClass("animate__fadeIn")
        .addClass("animate__fadeOut d-none");
}
