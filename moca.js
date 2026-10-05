const patternButtons = document.querySelectorAll('.pattern-button');
const patternLines = document.getElementById('patternLines');
const patternBoard = document.getElementById('patternBoard');
const patternMessage = document.getElementById('patternMessage');

const correctPattern = ['1', 'A', '2', 'B', '3', 'C', '4', 'D', '5', 'E'];
let patternIndex = 0;
let patternPoints = [];
let patternFini = false;
let patternWrong = false;

patternButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (patternFini) return; // Nếu đã hoàn thành, không cho phép nhấn nút nữa
        const value = button.dataset.value;

        if (button.disabled) return;

        if (value !== correctPattern[patternIndex]) {
            patternWrong = true;
        }

        button.classList.add('completed');
        button.disabled = true;

        patternPoints.push(button);
        patternIndex++;

        drawPatternLine();

        if (patternIndex === correctPattern.length) {
            patternFini = true;

            if (patternWrong) {
                localStorage.setItem("basicCognitiveQ1", "0");
                console.log("Pattern completed incorrectly!");
            } else {
                localStorage.setItem("basicCognitiveQ1", "1");
                console.log("Pattern completed correctly!");
            }
            patternButtons.forEach(button => {
                button.disabled = true;
            });
        }
    });
});

function drawPatternLine() {

    if (patternPoints.length < 2) return;

    const previous = patternPoints[patternPoints.length - 2];
    const current = patternPoints[patternPoints.length - 1];

    const boardRect = patternBoard.getBoundingClientRect();
    const previousRect = previous.getBoundingClientRect();
    const currentRect = current.getBoundingClientRect();

    const x1 =
        previousRect.left +
        previousRect.width / 2 -
        boardRect.left;

    const y1 =
        previousRect.top +
        previousRect.height / 2 -
        boardRect.top;

    const x2 =
        currentRect.left +
        currentRect.width / 2 -
        boardRect.left;

    const y2 =
        currentRect.top +
        currentRect.height / 2 -
        boardRect.top;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    line.setAttribute("stroke-width", "4");
    line.setAttribute("stroke-linecap", "round");
    patternLines.appendChild(line);
}

function getQ2score() {
    const selected = document.querySelector('input[name="q2"]:checked');
    if (!selected) {
        return null;
    }
    return Number(selected.value);
}
function saveQ2Score() {
    const score = getQ2score();
    if (score === null) {
        return false;
    }
    localStorage.setItem("basicCognitiveQ2", score);
    return true;
}


const q3Answer = document.getElementById('q3Answer');
const q3Sequence = document.getElementById('q3Sequence');
q3Answer.addEventListener('input', () => {
    q3Sequence.style.visibility = 'hidden';
});

const questionCards = document.querySelectorAll('.question-card');
const prevBtn = document.getElementById('prevbtn');
const nextBtn = document.getElementById('nextbtn');
const submitBtn = document.getElementById('submitbtn');

let currentStep = 0;

function updateQuestion() {
    questionCards.forEach((card, index) => {
        if (index === currentStep) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    // Nút Quay lại
    if (currentStep === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }

    // Nút Tiếp tục
    if (currentStep === questionCards.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'inline-block';
    }

    // Nút Hoàn thành
    if (currentStep === questionCards.length - 1) {
        submitBtn.style.display = 'inline-block';
    } else {
        submitBtn.style.display = 'none';
    }
}


// NÚT TIẾP TỤC
nextBtn.addEventListener('click', () => {

    // Đang ở Câu 1
    if (currentStep === 0) {
        if (!patternFini) {
            alert('Vui lòng hoàn thành câu 1!');
            return;
        }
    }

    // Đang ở Câu 2
    if (currentStep === 1) {
        const selected = document.querySelector('input[name="q2"]:checked');

        if (!selected) {
            alert('Vui lòng chọn một đáp án cho Câu 2.');
            return;
        }

        localStorage.setItem(
            'basicCognitiveQ2',
            selected.value
        );
    }

    if (currentStep < questionCards.length - 1) {
        currentStep++;
        updateQuestion();
    }
});


// NÚT QUAY LẠI
prevBtn.addEventListener('click', () => {
    if (currentStep > 0) {
        currentStep--;
        updateQuestion();
    }
});
submitBtn.addEventListener('click', () => {
    const answerInput = document.getElementById('q3Answer');
    const answer = answerInput.value.trim();

    if (answer === '') {
        alert('Vui lòng nhập câu trả lời cho Câu 3.');
        return;
    }

    const normalizedAnswer = answer.replace(/[^0-9]/g, '');

    const q3 = normalizedAnswer === '741567' ? 2 : 0;

    localStorage.setItem('basicCognitiveQ3', q3);

    const q1 = Number(localStorage.getItem('basicCognitiveQ1') || 0);
    const q2 = Number(localStorage.getItem('basicCognitiveQ2') || 0);

    const totalScore = q1 + q2 + q3;
    console.log("Total Score:", totalScore);

    localStorage.setItem('basicCognitiveTotalScore', totalScore);
});


// NÚT HOÀN THÀNH



// HIỂN THỊ CÂU HỎI BAN ĐẦU
updateQuestion();