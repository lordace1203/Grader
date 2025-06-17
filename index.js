// ELEMENT SELECTORS
const container = document.querySelector('.container');
const addCourseBtn = document.querySelector('#addCourseBtn');
const calculateBtn = document.querySelector('#calculateBtn');
const courseContainer = document.querySelector('.course-container');
const deleteCourse = document.querySelector('.delete');


// VARIABLES
let number;
const gradeOptions1 = [{
    label: 'Grade',
    value: '0'
}, {
    label: 'A',
    value: '4'
}, {
    label: 'AB',
    value: '3.5'
}, {
    label: 'B',
    value: '3.25'
}, {
    label: 'BC',
    value: '3.00'
}, {
    label: 'C',
    value: '2.75'
}, {
    label: 'CD',
    value: '2.50'
}, {
    label: 'D',
    value: '2.25'
}, {
    label: 'E',
    value: '2.00'
}, {
    label: 'EF',
    value: '1.75'
}, {
    label: 'F',
    value: '0'
}];

const gradeOptions2 = [{
    label: 'Grade',
    value: '0'
}, {
    label: 'A',
    value: '5'
}, {
    label: 'B',
    value: '4'
}, {
    label: 'C',
    value: '3'
}, {
    label: 'D',
    value: '2'
}, {
    label: 'E',
    value: '1'
}, {
    label: 'F',
    value: '0'
}];


let courseGrade = document.querySelectorAll('.grade');




// ADD COURSE EVENT HANDLER
addCourseBtn.onclick = function () {

    number = document.querySelectorAll('.course').length + 1;

    // CREATE COURSE AND APPEND COURSE DETAILS
    let course = document.createElement('div');
    course.classList.add('course');

    // ADD SERIAL NUMBER TO CURRENT COURSE
    let numberParagraph = document.createElement('p');
    numberParagraph.classList.add('serial-number');
    numberParagraph.innerText = number;
    course.append(numberParagraph);

    // ADD COURSE TITLE TO CURRENT COURSE
    let courseTitle = document.createElement('input');
    courseTitle.setAttribute('type', 'text');
    courseTitle.setAttribute('placeholder', 'Title');
    courseTitle.classList.add('course-title');
    course.append(courseTitle);

    // ADD COURSE UNIT TO CURRENT COURSE
    let courseUnit = document.createElement('select');
    let unitOptions = ['Unit', 1, 2, 3, 4, 5, 6];
    unitOptions.forEach((option, index) => {
        courseUnit.options[index] = new Option(option, index);
    })
    courseUnit.classList.add('select', 'unit');
    courseUnit.setAttribute('id', 'unit-select');
    course.append(courseUnit);


    // ADD COURSE GRADE TO CURRENT COURSE
    let gradingSystem = getGradingSystem();
    let courseGrade = document.createElement('select');
    gradingSystem.forEach((option, index) => {
        courseGrade.options[index] = new Option(option.label, option.value);
    })
    courseGrade.classList.add('select', 'grade');
    courseGrade.setAttribute('id', 'grade-select');
    course.append(courseGrade);


    // ADD DELETE BUTTON TO CURRENT COURSE
    let courseDelete = document.createElement('i');
    courseDelete.classList.add('delete', 'fa-solid', 'fa-trash');
    course.append(courseDelete);

    // APPEND A SINGLE COURSE PER CLICK
    courseContainer.append(course);

}

// REMOVE COURSE HANDLER
courseContainer.onclick = function (event) {
    if (event.target.classList.contains('delete')) {
        event.target.parentElement.remove();
        updateSerialNumbers();
    }
}


// UPDATE SERIAL NUMBER
function updateSerialNumbers() {
    const serialPararaphs = document.querySelectorAll('.serial-number');
    serialPararaphs.forEach((serialParagraph, index) => {
        serialParagraph.innerText = index + 1;
    });
}


// SUBMIT/ CALCULATE BUTTON HANDLER
calculateBtn.onclick = function () {
    const unitSelectArray = document.querySelectorAll('.unit');
    const gradeSelectArray = document.querySelectorAll('.grade');
    let totalGradePoints = 0;
    let totalUnitPoints = 0;


    gradeSelectArray.forEach((gradeSelect, index) => {


        if (unitSelectArray[index].value <= 0) {
            alert(`Invalid Entry at Course Unit ${index + 1}`);
            document.querySelector('.gpa').innerText = 'GPA: 0.00';
            return;
        } else {
            if (gradeSelect.value <= 0) {
                alert(`Invalid Entry at Course Grade ${index + 1}`)
                document.querySelector('.gpa').innerText = 'GPA: 0.00';
                return;
            } else {
                totalGradePoints += Number((gradeSelect.value) * unitSelectArray[index].value);
                totalUnitPoints += Number(unitSelectArray[index].value);
            }
        }
    })

    if (totalGradePoints > 0 && totalUnitPoints > 0) {
        const gpa = totalGradePoints / totalUnitPoints;
        document.querySelector('.gpa').innerText = `GPA: ${gpa.toFixed(2)}`;
    }
}


// COPYRIGHT TEXT
const year = new Date().getFullYear();
const copyrightText = document.querySelector('.copyrightText');
copyrightText.innerText = 'ⓒ ' + year + ' Ace-WebDevs';



// UPDATE GRADEPOINT SELECTION FROM THE UI
function getGradingSystem() {
    const selected = document.querySelector('input[name="grading"]:checked');
    if (!selected) return gradeOptions1;
    return selected.value == 4 ? gradeOptions1 : gradeOptions2;
}

// ATTACH LISTENER TO GRADE SYSTEM RADIOS AND UPDATE CURRENT SYSTEM
document.querySelectorAll('input[name="grading"]').forEach((radio) => {
    radio.addEventListener('click', () => {
        let gradingSystem = getGradingSystem();
        document.querySelectorAll('.grade').forEach((gradeSelect) => {
            gradeSelect.innerHTML = '';
            gradingSystem.forEach((option, index) => {
                gradeSelect.options[index] = new Option(option.label, option.value);
            })
        })
    })
})