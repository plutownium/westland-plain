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

    nextBtnsForPage = [
        { page: 1, enabled: false },
        { page: 2, enabled: false },
        { page: 3, enabled: false }
    ];

    constructor(target) {
        this.page = 1;
        this.render = new Render(target, this);
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
            this.render.updateNextBtn(
                this.nextBtnsForPage.filter((b) => b.page === page)[0]
            );
        } else if (page === 4) {
            console.log("load user data... 84");
            this.render.loadUserData(this.getUserData(), page);
            this.render.attachEventListenersForPage(page);
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

    setFirstName = (name) => {
        this.firstName = name;
        this.questionSetOne[0].previousValue = name;
        this.updateButtonState(1);
        this.render.updateNextBtn(
            this.nextBtnsForPage.filter((b) => b.page === 1)[0]
        );
    };

    setLastName = (name) => {
        this.lastName = name;
        this.questionSetOne[1].previousValue = name;
        this.updateButtonState(1);
        this.render.updateNextBtn(
            this.nextBtnsForPage.filter((b) => b.page === 1)[0]
        );
    };

    setHasChildren = (hasChildren) => {
        this.hasChildren = hasChildren;
        this.questionSetTwo[0].previousValue = hasChildren;
        this.updateButtonState(2);
        this.render.updateNextBtn(
            this.nextBtnsForPage.filter((b) => b.page === 2)[0]
        );
    };

    setHobbies = (hobby) => {
        if (this.hobbies.includes(hobby)) {
            // remove from list
            console.log("removing...", hobby);
            const withoutUncheckedValue = this.hobbies.filter(
                (h) => h !== hobby
            );
            this.hobbies = withoutUncheckedValue;
            if (withoutUncheckedValue.length === 0) {
                // setValidationError();
            }
        } else {
            console.log("adding...", hobby);
            const newHobbies = [...this.hobbies];
            newHobbies.push(hobby);
            this.hobbies = newHobbies;
            // setValidationError("");
        }
        this.questionSetTwo[1].previousValue = this.hobbies;
        this.render.colourSelectedHobbiesGreen(this.hobbies);
        this.updateButtonState(2);
        this.render.updateNextBtn(
            this.nextBtnsForPage.filter((b) => b.page === 2)[0]
        );
    };

    setDrivesCar = (drives) => {
        console.log("setting drives...", 154, drives);
        this.drivesCar = drives;
        this.questionSetThree[0].previousValue = drives;
        this.updateButtonState(3);
        this.render.updateNextBtn(
            this.nextBtnsForPage.filter((b) => b.page === 3)[0]
        );
    };

    setYearsExperience = (years) => {
        this.yearsExp = years;
        this.questionSetThree[1].previousValue = years;
        this.updateButtonState(3);
        this.render.updateNextBtn(
            this.nextBtnsForPage.filter((b) => b.page === 3)[0]
        );
    };

    updateButtonState(page) {
        const validator = new Validator();
        if (page === 1) {
            if (
                validator.validName(this.firstName) &&
                validator.validName(this.lastName)
            ) {
                console.log(
                    this.firstName,
                    this.lastName,
                    validator.validName(this.firstName) &&
                        validator.validName(this.lastName),
                    184,
                    page
                );
                this.enableNextBtn(page);
            } else {
                this.disableNextBtn(page);
            }
        } else if (page === 2) {
            if (
                validator.validHasChildren(this.hasChildren) &&
                this.hobbies.length >= 1
            ) {
                this.enableNextBtn(page);
            } else {
                this.disableNextBtn(page);
            }
        } else if (page === 3) {
            if (
                (this.drivesCar &&
                    validator.validYearsExperience(this.yearsExperience)) ||
                !this.drivesCar
            ) {
                this.enableNextBtn(page);
            } else {
                this.disableNextBtn(page);
            }
        } else {
            throw new Error("Page out of range");
        }
    }

    enableNextBtn(page) {
        const btn = this.nextBtnsForPage.filter((b) => b.page === page)[0];
        console.log(btn, 218);
        btn.enabled = true;
    }

    disableNextBtn(page) {
        const btn = this.nextBtnsForPage.filter((b) => b.page === page)[0];
        btn.enabled = false;
    }
}
