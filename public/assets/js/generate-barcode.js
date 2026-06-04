const inputs = [
    document.getElementById("text-1"),
    document.getElementById("text-2"),
    document.getElementById("text-3"),
    document.getElementById("text-4")
];
const button = document.getElementById("btn");

// 텍스트 입력 시 대문자 자동 변환
inputs.forEach(input => {
    input.addEventListener("input", (e) => {
        e.target.value = e.target.value.toUpperCase();
    });

    // 엔터 입력 이벤트: 바코드 생성
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            generateBarcode();
        }
    });
});

function generateBarcode() {
    // 대문자 변환
    const value = inputs
        .map(input => input.value)
        .join("-")
        .toUpperCase();

    if (!value.replace(/-/g, "")) return;

    // 바코드 생성
    JsBarcode("#barcode", value, {
        format: "CODE128",
        width: 2,
        height: 100,
        displayValue: true
    });
}

button.addEventListener("click", generateBarcode);