const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArray = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the manager's first name:",
            name: "mgrFName",
            default: "Jen"
        },
        {
            type: "input",
            message: "Enter the manager's last name:",
            name: "mgrLName",
            default: "Barber"
        },
        {
            type: "input",
            message: "Enter the manager's office number:",
            name: "mgrOffice",
            default: "100"
        },
    ]).then(({ mgrFName, mgrLName, mgrOffice }) => {
        // Construct full name
        const mgrName = mgrFName + " " + mgrLName;

        // Construct email address
        const mgrEmail = mgrFName + "@my-company.com";

        // Create new manager object
        const manager = new Manager(mgrName, 1, mgrEmail, mgrOffice);

        // Add manager to teamArray
        teamArray.push(manager);

        showCreateTeamMenu();
    });
}

function showCreateTeamMenu() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select type of employee to create:",
            choices: ["Engineer", "Intern", "Finished"],
            name: "menuChoice",
        },
    ]).then(({ menuChoice }) => {
        switch (menuChoice) {
            case "Engineer":
                createEngineer();
                break;
            case "Intern":
                createIntern();
                break;
            default:
                console.log(teamArray);
                // Look at assignment for next steps here.
                break;
        }
    });
}

function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the engineer's first name:",
            name: "FName",
            default: "Maurice"
        },
        {
            type: "input",
            message: "Enter the engineer's last name:",
            name: "LName",
            default: "Moss"
        },
        {
            type: "input",
            message: "Enter the engineer's GitHub account name:",
            name: "github",
            default: "ncastaldi"
        },
    ]).then(({ FName, LName, github }) => {
        // Increase employee count
        const empCount = teamArray.length + 1;

        // Construct full name
        const userName = FName + " " + LName;

        // Construct email address
        const userEmail = FName + "@my-company.com";

        // Create new engineer object
        const engineer = new Engineer(userName, empCount, userEmail, github);

        // Add manager to teamArray
        teamArray.push(engineer);

        // Return to menu
        showCreateTeamMenu();
    });
}

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter the intern's first name:",
            name: "FName",
            default: "Roy"
        },
        {
            type: "input",
            message: "Enter the intern's last name:",
            name: "LName",
            default: "Trenneman"
        },
        {
            type: "input",
            message: "Enter the intern's school:",
            name: "school",
            default: "GA Tech"
        },
    ]).then(({ FName, LName, school }) => {
        // Increase employee count
        const empCount = teamArray.length + 1;

        // Construct full name
        const userName = FName + " " + LName;

        // Construct email address
        const userEmail = FName + "@my-company.com";

        // Create new engineer object
        const intern = new Intern(userName, empCount, userEmail, school);

        // Add manager to teamArray
        teamArray.push(intern);

        // Return to menu
        showCreateTeamMenu();
    });
}

createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
