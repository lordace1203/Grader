// ELEMENT SELECTORS
const container = document.querySelector('.container');
const addCourseBtn = document.querySelector('#addCourseBtn');
const calculateBtn = document.querySelector('#calculateBtn');
const courseContainer = document.querySelector('.course-container');
const deleteCourse = document.querySelector('.delete');


// VARIABLES
let number;
let courseGrade = document.querySelector('.course-grade');
document.querySelector('.serial-number').innerText = 1;

// ADD COURSE EVENT HANDLER
addCourseBtn.onclick = function () {

    number = document.querySelectorAll('.course').length + 1;

    // CREATE AND APPEND COURSE DETAILS
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
    let courseUnit = document.createElement('input');
    courseUnit.setAttribute('type', 'number');
    courseUnit.setAttribute('value', '1');
    courseUnit.setAttribute('placeholder', 'Unit');
    courseUnit.classList.add('course-unit');
    course.append(courseUnit);

    // ADD COURSE GRADE TO CURRENT COURSE
    let courseGrade = document.createElement('input');
    courseGrade.setAttribute('type', 'text');
    courseGrade.setAttribute('placeholder', 'Grade');
    courseGrade.classList.add('course-grade');
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

// TURN ENTERED GRADES TO UPPERCASE
courseContainer.oninput = event => {
    if (event.target.classList.contains('course-grade')) {
        event.target.value = event.target.value.toUpperCase();
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
    const gradingSystem = document.querySelector('input[name="grading"]:checked').value;

    // OBJECTS STORING GRADEPOINTS AND THEIR VALUES
    /*4 POINT SYSTEM*/
    const gradePoints4 = {
        "A": 4.0,
        "AB": 3.5,
        "B": 3.25,
        "BC": 3.0,
        "C": 2.75,
        "CD": 2.5,
        "D": 2.25,
        "E": 2.0,
        "EF": 1.75,
        "F": 0
    }

    /*5 POINT SYSTEM*/
    const gradePoints5 = {
        "A": 5.0,
        "B": 4.0,
        "C": 3.0,
        "D": 2.0,
        "E": 1.0,
        "F": 0.0
    }


    // GRADES AND UNITS ARRAYS
    const unitArray = document.querySelectorAll('.course-unit');
    const gradeArray = document.querySelectorAll('.course-grade');

    // TOTAL UNITS AND TOTAL GRADES
    let totalUnits = 0;
    let totalGrades = 0;


    // LOOP TO GO THROUGH EACH UNIT AND GRADE ENTERED

    for (let i = 0; i < unitArray.length; i++) {

        // INDIVIDUAL/ CURRENT GRADES AND UNITS
        const currentUnit = parseFloat(document.querySelectorAll('.course-unit')[i].value);    //number
        const currentGrade = document.querySelectorAll('.course-grade')[i].value.toUpperCase();  //alphabet string: a, ab ,b etc


        let gradePoints = (gradingSystem === "4") ? gradePoints4 : gradePoints5;
        // VALIDATING INPUTED DATA

        if (!isNaN(currentUnit) && gradePoints.hasOwnProperty(currentGrade)) {
            totalUnits += currentUnit;
            totalGrades += gradePoints[currentGrade] * currentUnit;
        } else {
            // ERROR HANDLING
            if (!gradePoints.hasOwnProperty(currentGrade)) {
                alert(`Invalid Entry at course grade ${i + 1}. GPA has been set to '0.00'`);
                document.querySelector('.gpa').innerText = "0.00";
                return;
            }
        }
    }
    const gpa = (totalUnits > 0) ? (totalGrades / totalUnits).toFixed(2) : "0.00";
    document.querySelector('.gpa').innerText = "GPA: " + gpa;
}


// COPYRIGHT TEXT
const year = new Date().getFullYear();
const copyrightText = document.querySelector('.copyrightText');
copyrightText.innerText = 'ⓒ ' + year + ' Ace-WebDevs';

