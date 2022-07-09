class Form {
    firstName = "";
    lastName = "";
    hasChildren = null;
    hobbies = [];
    drivesCar = null;
    yearsExperience = null;

    target = null;

    questionSetOne = [
        {
            type: "text",
            query: "First name",
            previousValue: null,
            inputHandler: this.setFirstName
        },
        {
            type: "text",
            query: "Last name",
            previousValue: null,
            inputHandler: this.setLastName
        }
    ];
    questionSetTwo = [
        {
            type: "single-select",
            query: "Children",
            options: ["Yes", "No"],
            previousValue: null,
            inputHandler: this.setHasChildren
        },
        {
            type: "multi-select",
            query: "Hobbies",
            options: ["Hiking", "Music", "Programming"],
            previousValue: null,
            inputHandler: this.setHobbies
        }
    ];
    questionSetThree = [
        {
            type: "radio",
            query: "Drives a car",
            options: ["Yes", "No"],
            previousValue: null,
            inputHandler: this.setDrivesCar
        },
        {
            type: "dropdown",
            query: "Driving experience in years",
            options: [...Array(20).keys()],
            previousValue: null,
            inputHandler: this.setYearsExperience
        }
    ];

    constructor(target) {
        this.page = 1;
        this.render = new Render(target, this);
    }

    explain() {
        console.log(this, 63);
    }

    a() {
        console.log("aaaaaaa");
    }

    switchToPage(page) {
        // console.log("Switching to page...", page, "63");
        // const render = new Render(this.target, this);
        // console.log(this.target, this.render, 74);
        if (page <= 3) {
            this.render.loadPageOfQuestions(
                this.getQuestionsFromPage(page),
                page,
                this.hobbies
            );
            this.render.attachEventListenersForPage(page);
            this.page = page;
        } else if (page === 4) {
            console.log("load user data... 84");
            this.render.loadUserData(this.getUserData(), page);
            this.render.attachEventListenersForPage(page);
            this.page = page;
        }
    }

    getQuestionsFromPage(page) {
        if (page === 1) {
            return this.questionSetOne;
        } else if (page === 2) {
            return this.questionSetTwo;
        } else if (page === 3) {
            return this.questionSetThree;
        } else {
            throw new Error("Page out of bounds");
        }
    }

    getUserData() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            hasChildren: this.hasChildren,
            hobbies: this.hobbies,
            drivesCar: this.drivesCar,
            yearsExperience: this.yearsExp
        };
    }

    setPage(page) {
        this.page = page;
    }

    setFirstName(name) {
        this.firstName = name;
    }

    setLastName(name) {
        this.lastName = name;
    }

    setHasChildren(hasChildren) {
        this.hasChildren = hasChildren;
    }

    setHobbies(hobby) {
        // console.log(this.hobbies, 126);
        if (this.hobbies.includes(hobby)) {
            console.log("Removing hobby... 137", hobby);
            // remove from list
            const withoutUncheckedValue = this.hobbies.filter(
                (h) => h !== hobby
            );
            this.hobbies = withoutUncheckedValue;
            if (withoutUncheckedValue.length === 0) {
                // setValidationError();
            }
        } else {
            const newHobbies = [...this.hobbies];
            newHobbies.push(hobby);
            this.hobbies = newHobbies;
            // setValidationError("");
        }
        console.log(this.hobbies, 143);
        this.render.colourSelectedHobbiesGreen(this.hobbies);
    }

    setDrivesCar(drives) {
        this.drives = drives;
    }

    setYearsExperience(years) {
        this.yearsExp = years;
    }
}
