class Form {
    firstName = null;
    lastName = null;
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

    constructor() {
        this.page = 1;
    }

    switchToPage(page) {
        const render = new Render(this.target);
        if (page <= 3) {
            console.log("switched to page...", page);
            render.loadQuestions(this.getQuestionsFromPage(this.page));
        } else if (page === 4) {
            render.loadUserData(this.getUserData());
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
        if (this.hobbies.includes(hobby)) {
            // remove from list
            const withoutUncheckedValue = hobbies.filter((h) => h !== hobby);
            this.hobbies = withoutUncheckedValue;
            if (withoutUncheckedValue.length === 0) {
                // setValidationError();
            }
        } else {
            const newHobbies = [...hobbies];
            newHobbies.push(hobby);
            this.hobbies = newHobbies;
            // setValidationError("");
        }
    }

    setDrivesCar(drives) {
        this.drives = drives;
    }

    setYearsExperience(years) {
        this.yearsExp = years;
    }
}

class Render {
    // text, single-select, multi-select, radio, dropdown
    constructor(target) {
        this.target = target;
    }

    loadQuestions(questions) {
        const html = questions.map((q) => {
            if (q.type === "text") {
                return this.textInput(q.query, q.previousValue, q.inputHandler);
            } else if (q.type === "single-select") {
                return this.singleSelect(
                    q.query,
                    q.options,
                    q.previousValue,
                    q.inputHandler
                );
            } else if (q.type === "multi-select") {
                return this.multiSelect(
                    q.query,
                    q.options,
                    q.previousValue,
                    q.inputHandler
                );
            } else if (q.type === "radio") {
                return this.radioSelect(
                    q.query,
                    q.options,
                    q.previousValue,
                    q.inputHandler
                );
            } else if (q.type === "dropdown") {
                return this.dropdown(
                    q.query,
                    q.options,
                    q.previousValue,
                    q.inputHandler
                );
            } else {
                throw new Error("question type not supported");
            }
        });

        this.target.innerHTML = html;
        console.log(this.target, "165rm");
    }

    loadUserData(inputs) {}

    // query, options, previousValue, inputHandler, validationError
    textInput(query, previousValue, inputHandler) {
        return `
            <div className="w-40 pl-1 flex flex-col">
                <div>
                    <div className="py-2">
                        <h3 className="w-fit">${query}</h3>
                    </div>
                    <div className="h-12 flex">
                        <input
                            className="h-8 w-36 my-1 py-1 pl-2 border-2 border-gray-300"
                            value="${previousValue}"
                            type="text"
                            onChange="${inputHandler}"
                        />
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    singleSelect(query, options, previousValue, inputHandler) {
        return `
        <div className="flex flex-col">
            <div>
                <h3>${query}</h3>
                <select
                    className="border-2 border-black w-40 h-8"
                    onChange=${inputHandler}
                    defaultValue="${
                        previousValue === null
                            ? ""
                            : previousValue
                            ? "Yes"
                            : "No"
                    }"
                >
                    <option value=""></option>
                    ${options.map((option) => {
                        return `
                            <option value="${option}">
                            ${option}
                            </option>
                        `;
                    })}
                </select>
            </div>
            <div id="validationErrorContainer">
                    
            </div>
        </div>
        `;
    }

    multiSelect(query, options, previousValue, inputHandler) {
        // TODO: Render multiSelect with id="someId" and attach "ifValidReportInput" as click event listener to appropriate spot
        return `
            <div className="flex flex-col">
                <div>
                    <h3>${query}</h3>
                    <div>
                        ${options.map((option) => {
                            return `
                                <div
                                    className="flex"
                                    onClick={() => {
                                        ifValidReportInput(option);
                                    }}
                                >
                                    <div className="flex flex-col justify-center items-center">
                                        <div
                                            className="p-2 h-4 w-4 border-2 border-black ${
                                                selections.includes(option)
                                                    ? "bg-lime-400"
                                                    : ""
                                            }"
                                        ></div>
                                    </div>
                                    <div className="p-2">
                                        <p>${option}</p>
                                    </div>
                                </div>
                                `;
                        })}
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>>
        `;
    }

    radioSelect(query, options, previousValue, inputHandler) {
        const valueToCheck =
            previousValue === null ? null : previousValue ? "Yes" : "No";
        // TODO: Render multiSelect with id="someId" and attach "inputHandler" as click event listener to appropriate spot
        return `
            <div className="flex flex-col">
                <div>
                    <h3>${query}</h3>
                    <div className="mt-2 flex flex-col justify-start items-start">
                        ${options.map((option) => {
                            return `
                                <div
                                    className="mb-1"
                                    onClick={() => {
                                        ifValidReportInput(option);
                                    }}
                                >
                                    <input
                                        type="radio"
                                        id="${option}"
                                        name="drives"
                                        value={option}
                                        checked="${valueToCheck === option}"
                                    />
                                    <label className="ml-2" htmlFor="html">
                                        {option}
                                    </label>
                                </div>
                            `;
                        })}
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    dropdown(query, options, previousValue, inputHandler) {
        // TODO: Render multiSelect with id="someId" and attach "inputHandler" as click event listener to appropriate spot
        return `
            <div className="w-auto flex flex-col items-center">
                <div>
                    <h3 className="w-fit">${query}</h3>
                    <div className="w-52">
                        <select
                            className="w-full"
                            onChange="${ifValidReportInput}"
                            defaultValue="${previousValue}"
                        >
                            <option value=""></option>
                            ${options.map((option) => {
                                return `
                                    <option value="${option}">
                                        ${option}
                                    </option>
                                `;
                            })}
                        </select>
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    addValidationError(validationError) {
        return `
            <div className="my-2">
                <p className="text-red-500">${validationError}</p>
            </div>
        `;
    }
}

class Validator {
    // helper methods to validate form inputs
    validName(name) {
        return name.length > 1;
    }

    validHasChildren(hasChildren) {
        if (hasChildren === true || hasChildren === false) {
            return true;
        } else {
            return false;
        }
    }

    validHobbies(currentHobbies, newHobby) {
        const changeYieldsEmptyArray =
            currentHobbies.includes(newHobby) && currentHobbies.length === 1;
        if (changeYieldsEmptyArray) {
            return false;
        } else {
            return true;
        }
    }

    validDrivesCar(drives) {
        if (drives === true || drives === false) {
            return true;
        } else {
            return false;
        }
    }

    validYearsExperience(years) {
        if (years === null) {
            return false;
        } else {
            return true;
        }
    }
}
