const input1 = document.getElementById("text-1"); // GC (고정)
const input2 = document.getElementById("text-2"); // 영어 + 숫자
const input3 = document.getElementById("text-3"); // 숫자
const input4 = document.getElementById("text-4"); // 숫자

const inputs = [input1, input2, input3, input4];

const button = document.getElementById("btn");

const message = document.getElementById("input-message");

function showMessage(text) {
    message.textContent = text;
    clearTimeout(showMessage.timer);
    showMessage.timer = setTimeout(() => {
        message.textContent = "";
    }, 2000);
}

// 2번째 입력칸 : 영어 + 숫자 -> 텍스트 입력 시 대문자 자동 변환
input2.addEventListener("input", (e) => {
    e.target.classList.remove("input-error");

    const originalValue = e.target.value;
    const filteredValue = originalValue
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "");

    e.target.value = filteredValue;

    // 제거된 문자가 있으면 알림
    if (originalValue.toUpperCase() !== filteredValue) {
        showMessage("영문과 숫자만 입력할 수 있습니다.");
    }
});

// 3, 4번째 입력칸 : 숫자
[input3, input4].forEach(input => {
    input.addEventListener("input", (e) => {
        e.target.classList.remove("input-error");

        const originalValue = e.target.value;
        const filteredValue = originalValue.replace(/\D/g, "");

        e.target.value = filteredValue;

        // 제거된 문자가 있으면 알림
        if (originalValue !== filteredValue) {
            showMessage("숫자만 입력할 수 있습니다.");
        }
    });
});

// 엔터 입력 이벤트: 바코드 생성
inputs.forEach(input => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generateBarcode();
        }
    });
});

function generateBarcode() {
    let hasEmpty = false;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            input.classList.add("input-error");
            hasEmpty = true;
        } else {
            input.classList.remove("input-error");
        }
    });

    if (hasEmpty) {
        showMessage("모든 입력칸을 입력해주세요.");
        return;
    }

    const value = inputs
        .map(input => input.value)
        .join("-");

    // 바코드 생성
    JsBarcode("#barcode", value, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true
    });
}

button.addEventListener("click", generateBarcode);