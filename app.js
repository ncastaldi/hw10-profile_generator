const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const clear = require("clear");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamArray = [];

function createManager() {
    // Clear screen before prompting user
    clear();

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
    // Clear screen before prompting user
    clear();

    inquirer.prompt([
        {
            type: "list",
            message: "Please make a selection:",
            choices: ["Create Engineer", "Create Intern", "Finished Building Team"],
            name: "menuChoice",
        },
    ]).then(({ menuChoice }) => {
        switch (menuChoice) {
            case "Create Engineer":
                createEngineer();
                break;
            case "Create Intern":
                createIntern();
                break;
            default:
                createOutput();
                break;
        }
    });
}

function createEngineer() {
    // Clear screen before prompting user
    clear();

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
    // Clear screen before prompting user
    clear();

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

function createOutput() {
    const teamPage = render(teamArray);

    fs.writeFile(outputPath, teamPage, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function initApp() {
    createManager();
}

initApp();