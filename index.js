#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    studentID;
    courses;
    balance;
    constructor(name, courses) {
        this.name = name;
        this.courses = courses;
        this.balance = 0;
        this.studentID = generateStudentID(); // 5 digit id;
    }
    enrollCourses(course) {
        this.courses.push(course);
    }
    viewBalance() {
        return this.balance;
    }
    payTuTionFees(fees) {
        this.balance -= fees;
    }
    showStatus() {
        return (`Name: ${(this.name)}\n ID: ${(this.studentID)}\n Courses Enrolled: ${(this.courses)}\n Balance: ${(this.viewBalance())}`);
    }
    ;
}
;
function generateStudentID() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}
async function studentInfo() {
    let id = {};
    let condiition = true;
    while (condiition) {
        let operators = await inquirer.prompt([
            {
                name: "operator",
                type: "list",
                message: ("Select an operator:"),
                choices: ["Add Student", "Enroll in Course", "View Balance", "Pay Tution Fees", "Show Status", "Exit"]
            }
        ]);
        if (operators.operator === "Exit") {
            break;
        }
        else if (operators.operator === "Add Student") {
            let { name, courses } = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "Enter Student Name:"
                },
                {
                    name: "courses",
                    type: "input",
                    message: "Enter Courses:"
                }
            ]);
            let student = new Student(name, courses.split(", ").map((course) => course.trim()));
            id[student.studentID] = student;
            console.log((`Student added with ID: ${(student.studentID)}`));
        }
        else {
            let { stdID } = await inquirer.prompt([
                {
                    name: "stdID",
                    type: "number",
                    message: "Enter Student ID:"
                },
            ]);
            const student = id[stdID];
            if (!student) {
                console.log(("Student Not Found!"));
            }
            else if (operators.operator === "Enroll in Course") {
                let { course } = await inquirer.prompt([
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name:"
                    }
                ]);
                student.enrollCourses(course);
                console.log(`Enrolled in ${course}`);
            }
            else if (operators.operator === "View Balance") {
                console.log((`Balance: ${(student.viewBalance())}`));
            }
            else if (operators.operator === "Pay Tution Fees") {
                let { tutionFees } = await inquirer.prompt({
                    name: "tutionFees",
                    type: "number",
                    message: "Enter Amount:"
                });
                student.payTuTionFees(tutionFees);
                console.log((`Paid ${tutionFees} in tuition.`));
            }
            else if (operators.operator === "Show Status") {
                console.log(student.showStatus());
            }
        }
    }
}
studentInfo();
