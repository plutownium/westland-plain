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

    constructor() {
        this.page = 1;
    }

    switchToPage(page) {
        console.log("Switching to page...", page, "63");
        const render = new Render(this.target, this);
        if (page <= 3) {
            render.loadPageOfQuestions(
                this.getQuestionsFromPage(page),
                page,
                this.hobbies
            );
            render.attachEventListenersForPage(page);
            this.page = page;
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
    constructor(target, form) {
        this.target = target;
        this.form = form;
    }

    loadPageOfQuestions(questions, page, currentHobbies) {
        console.log("loading pg of questions", questions, 155);
        let html = questions.map((q) => {
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
                    q.inputHandler,
                    currentHobbies
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

        const header = this.makeHeader(page);
        const buttons = this.makeButtons(page);
        console.log(buttons, "189rm");
        html = header + html + buttons;

        this.target.innerHTML = html;
    }

    loadUserData(inputs) {}

    test() {
        console.log("in test");
    }

    makeHeader(page) {
        return `
            <div>
                <h2>Page ${page}</h2>
            </div>
        `;
    }

    makeButtons(page) {
        if (page === 1) {
            return this.makeBtn("empty", 1) + this.makeBtn("next", 2);
        } else if (page === 2) {
            return this.makeBtn("back", 2) + this.makeBtn("next", 3);
        } else if (page === 3) {
            return this.makeBtn("back", 3) + this.makeBtn("submit", 4);
        } else {
            throw new Error("page index out of range or wasn't provided");
        }
    }

    makeBtn(type, toPage) {
        // TODO: make "toPage" inform onClick value
        if (type === "empty") {
            return `
                <div id="emptyBtn" class="w-14 h-11"></div>
            `;
        }
        return `
            <div>
                <div id="${type}Btn">
                    <button 
                        class="m-2 p-2 border-2 border-gray-300 text-gray-300 text-md rounded-md"
                    >
                        <span class="${type}Btn text-gray-400">${type}</span>
                    </button>
                </div>
            </div>
    `;
    }

    attachEventListenersForPage(page) {
        console.log("attaching event listeners...", this.form);
        const form = this.form;
        if (page === 1) {
            const nextBtn = document.getElementById("nextBtn");
            console.log("adding event listener, for real", nextBtn);
            nextBtn.addEventListener("click", function () {
                console.log("trying to switch to page...", page + 1);
                form.switchToPage(page + 1);
            });
        } else if (page === 2) {
            const nextBtn = document.getElementById("nextBtn");
            nextBtn.addEventListener("click", function () {
                form.switchToPage(page + 1);
            });
            const backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", function () {
                form.switchToPage(page - 1);
            });
        } else if (page === 3) {
            const submitBtn = document.getElementById("submitBtn");
            submitBtn.addEventListener(
                "click",
                this.form.switchToPage(page + 1)
            );
            const backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", function () {
                form.switchToPage(page - 1);
            });
        } else if (page === 4) {
            const backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", function () {
                form.switchToPage(page - 1);
            });
        } else {
            throw new Error("Page index out of range");
        }
    }

    // query, options, previousValue, inputHandler, validationError
    textInput(query, previousValue, inputHandler) {
        return `
            <div class="w-40 pl-1 flex flex-col">
                <div>
                    <div class="py-2">
                        <h3 class="w-fit">${query}</h3>
                    </div>
                    <div class="h-12 flex">
                        <input
                            class="h-8 w-36 my-1 py-1 pl-2 border-2 border-gray-300"
                            value="${
                                previousValue !== null ? previousValue : ""
                            }"
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
        <div class="flex flex-col">
            <div>
                <h3>${query}</h3>
                <select
                    class="border-2 border-black w-40 h-8"
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

    multiSelect(query, options, previousValue, inputHandler, selections) {
        // TODO: Render multiSelect with id="someId" and attach "ifValidReportInput" as click event listener to appropriate spot
        return `
            <div class="flex flex-col">
                <div>
                    <h3>${query}</h3>
                    <div>
                        ${options.map((option) => {
                            return `
                                <div
                                    class="flex"
                                    class="multiSelectOption"
                                >
                                    <div class="flex flex-col justify-center items-center">
                                        <div
                                            class="p-2 h-4 w-4 border-2 border-black ${
                                                selections.includes(option)
                                                    ? "bg-lime-400"
                                                    : ""
                                            }"
                                        ></div>
                                    </div>
                                    <div class="p-2">
                                        <p>${option}</p>
                                    </div>
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

    radioSelect(query, options, previousValue, inputHandler) {
        const valueToCheck =
            previousValue === null ? null : previousValue ? "Yes" : "No";
        // TODO: Render multiSelect with id="someId" and attach "inputHandler" as click event listener to appropriate spot
        return `
            <div class="flex flex-col">
                <div>
                    <h3>${query}</h3>
                    <div class="mt-2 flex flex-col justify-start items-start">
                        ${options.map((option) => {
                            return `
                                <div
                                    class="mb-1 radioSelectOption"
                                >
                                    <input
                                        type="radio"
                                        id="${option}"
                                        name="drives"
                                        value={option}
                                        checked="${valueToCheck === option}"
                                    />
                                    <label class="ml-2" htmlFor="html">
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
            <div class="w-auto flex flex-col items-center">
                <div>
                    <h3 class="w-fit">${query}</h3>
                    <div class="w-52">
                        <select
                            class="w-full"
                            defaultValue="${previousValue}"
                            onchange="test2()"
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
            <div class="my-2">
                <p class="text-red-500">${validationError}</p>
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
