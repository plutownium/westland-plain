class Render {
    // text, single-select, multi-select, radio, dropdown
    constructor(target, form) {
        this.target = target;
        this.form = form;
    }

    loadPageOfQuestions(questions, page, currentHobbies) {
        // console.log("loading pg of questions", questions, 155);
        let html = questions
            .map((q) => {
                if (q.type === "text") {
                    return this.textInput(
                        q.query,
                        q.previousValue,
                        q.inputHandler
                    );
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
                        questions[0].previousValue // note: can only do this because it's a small app.
                    );
                } else {
                    throw new Error("question type not supported");
                }
            })
            .join("");

        const header = this.makeHeader(page);
        const buttons = this.makeButtons(page);
        html = header + html + buttons;
        // console.log(html, "189rm");
        // console.log(this.target, 209);
        this.target.innerHTML = html;
    }

    loadUserData(inputs, page) {
        let html = `
            <div>
                ${JSON.stringify(inputs)}
            </div>
        `;
        const header = this.makeHeader(page);
        const buttons = this.makeButtons(page);
        this.target.innerHTML = header + html + buttons;
    }

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
            return this.makeBtn("empty", null) + this.makeBtn("next", 2);
        } else if (page === 2) {
            return this.makeBtn("back", 1) + this.makeBtn("next", 3);
        } else if (page === 3) {
            return this.makeBtn("back", 2) + this.makeBtn("submit", 4);
        } else if (page === 4) {
            return this.makeBtn("back", 3);
        } else {
            throw new Error("page index out of range or wasn't provided");
        }
    }

    makeBtn(type) {
        if (type === "empty") {
            return `
                <div id="emptyBtn" class="w-14 h-11"></div>
            `;
        }
        return `
            <div>
                <div>
                    <button id="${type}Btn"
                        class="m-2 p-2 border-2 border-gray-300 text-gray-300 text-md rounded-md"
                    >
                        <span class="${type}Btn text-gray-400">${type}</span>
                    </button>
                </div>
            </div>
    `;
    }

    attachEventListenersForPage(page) {
        // console.log("attaching event listeners...", this.form);
        const form = this.form;
        if (page === 1) {
            // order is always the same: event listeners for form inputs, then next/back btn
            const textInputs = document.getElementsByTagName("input");
            textInputs[0].addEventListener("input", function (event) {
                form.setFirstName(event.target.value);
                // console.log(event.target.value, 255);
                // handleInput(event.target.value);
            });
            textInputs[1].addEventListener("input", function (event) {
                form.setLastName(event.target.value);
                // console.log(event.target.value, 255);
                // handleInput(event.target.value);
            });
            // establish btns
            const nextBtn = document.getElementById("nextBtn");
            // console.log("adding event listener, for real", nextBtn);
            nextBtn.addEventListener("click", function () {
                // console.log("trying to switch to page...", page + 1);
                form.switchToPage(page + 1);
            });
        } else if (page === 2) {
            // TODO: If hobbies option is selected, replace the evt listener with a "remove hobby" evt listener
            const singleLineSelect = document.getElementById("singleSelect");
            singleLineSelect.addEventListener("change", function (event) {
                form.setHasChildren(event.target.value);
            });
            const multiLineSelect =
                document.getElementsByClassName("multiSelectOption");
            for (let i = 0; i < multiLineSelect.length; i++) {
                multiLineSelect[i].addEventListener("click", function (event) {
                    form.setHobbies(event.target.innerHTML);
                });
            }
            const multiLineSelectTickboxes = document.getElementsByClassName(
                "multiSelectCheckBoxContainer"
            );
            for (let i = 0; i < multiLineSelectTickboxes.length; i++) {
                multiLineSelectTickboxes[i].addEventListener(
                    "click",
                    function (event) {
                        const choice =
                            multiLineSelectTickboxes[i].parentNode.childNodes[3]
                                .childNodes[1].innerHTML;
                        console.log(choice, 162);
                        form.setHobbies(choice);
                    }
                );
            }
            // establish btns
            const nextBtn = document.getElementById("nextBtn");
            nextBtn.addEventListener("click", function () {
                form.switchToPage(page + 1);
            });
            const backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", function () {
                form.switchToPage(page - 1);
            });
        } else if (page === 3) {
            const radioBtns =
                document.getElementsByClassName("radioSelectOption");
            const yearsExpDropdown = document.getElementById("dropdown");
            const yearsExpDropdownContainer =
                document.getElementById("dropdownContainer");
            radioBtns[0].addEventListener("click", function (event) {
                console.log(event.target.value, 297);
                if (event.target.value) {
                    form.setDrivesCar(event.target.value);
                    yearsExpDropdownContainer.classList.remove("hidden");
                }
            });
            radioBtns[1].addEventListener("click", function (event) {
                console.log(event.target.value, 300);
                if (event.target.value) {
                    form.setDrivesCar(event.target.value);
                    yearsExpDropdownContainer.classList.add("hidden");
                }
            });
            yearsExpDropdown.addEventListener("change", function (event) {
                console.log(event.target.value, 303);
                form.setYearsExperience(event.target.value);
            });
            // establish btns
            const submitBtn = document.getElementById("submitBtn");
            submitBtn.addEventListener("click", function () {
                form.switchToPage(page + 1);
            });
            const backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", function () {
                form.switchToPage(page - 1);
            });
        } else if (page === 4) {
            const backBtn = document.getElementById("backBtn");
            backBtn.addEventListener("click", function () {
                console.log("in the back btn 206");
                form.switchToPage(page - 1);
            });
        } else {
            throw new Error("Page index out of range");
        }
    }

    colourSelectedHobbiesGreen(currentHobbies) {
        const boxesToColor = document.getElementsByClassName(
            "multiSelectCheckBox"
        );
        // reset box color if present because we want the process of adding bg color to start with a fresh list
        for (let i = 0; i < boxesToColor.length; i++) {
            boxesToColor[i].classList.remove("bg-lime-400");
        }
        for (let i = 0; i < boxesToColor.length; i++) {
            const choice = boxesToColor[i].id;
            if (currentHobbies.includes(choice)) {
                boxesToColor[i].classList.add("bg-lime-400");
            }
        }
    }

    // query, options, previousValue, inputHandler, validationError
    textInput(query, previousValue, inputHandler) {
        console.log(previousValue, 226);
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
                            onchange="${inputHandler}"
                        />
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    singleSelect(query, options, previousValue, inputHandler) {
        console.log(options, previousValue, 252);
        return `
        <div class="flex flex-col">
            <div>
                <h3>${query}</h3>
                <select
                    id="singleSelect"
                    class="border-2 border-black w-40 h-8"
                    onchange=${inputHandler}
                >
                    <option value=""></option>
                    ${options
                        .map((option) => {
                            console.log(
                                previousValue === option ? "selected" : false,
                                271
                            );
                            return `
                            <option value="${option}" ${
                                previousValue === option ? "selected" : ""
                            }>${option}</option>
                        `;
                        })
                        .join("")}
                </select>
            </div>
            <div id="validationErrorContainer">
                    
            </div>
        </div>
        `;
    }

    multiSelect(query, options, previousValue, selections) {
        return `
            <div class="flex flex-col">
                <div>
                    <h3>${query}</h3>
                    <div>
                        ${options
                            .map((option, index) => {
                                return `
                                <div
                                    id="highlightBoxOuter${index}"
                                    class="flex"
                                    class=""
                                >
                                    <div class="flex flex-col justify-center items-center multiSelectCheckBoxContainer">
                                        <div id="${option}"
                                            class="p-2 h-4 w-4 border-2 border-black multiSelectCheckBox ${
                                                previousValue
                                                    ? previousValue.includes(
                                                          option
                                                      )
                                                        ? " bg-lime-400"
                                                        : null
                                                    : null
                                            }"
                                        ></div>
                                    </div>
                                    <div class="p-2 multiSelectOption">
                                        <p>${option}</p>
                                    </div>
                                </div>
                                `;
                            })
                            .join("")}
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    radioSelect(query, options, previousValue) {
        // const valueToCheck =
        //     previousValue === null ? null : previousValue ? "Yes" : "No";
        // TODO: Render multiSelect with id="someId" and attach "inputHandler" as click event listener to appropriate spot
        console.log(query, options, "prevValue:", previousValue, 321);
        // checked="${valueToCheck === option}"
        return `
            <div class="flex flex-col">
                <div>
                    <h3>${query}</h3>
                    <div class="mt-2 flex flex-col justify-start items-start">
                        ${options
                            .map((option) => {
                                return `
                                <div
                                    class="mb-1 radioSelectOption"
                                >
                                    <input
                                        type="radio"
                                        id="${option}"
                                        name="drives"
                                        value="${option}"
                                        ${
                                            previousValue === option
                                                ? "checked"
                                                : ""
                                        }
                                        
                                    />
                                    <label class="ml-2" htmlFor="html">
                                        ${option}
                                    </label>
                                </div>
                            `;
                            })
                            .join("")}
                    </div>
                </div>
                <div id="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    dropdown(query, options, previousValue, radioBtnValue) {
        return `
            <div id="dropdownContainer" class="w-auto flex flex-col items-center ${
                radioBtnValue === "Yes" ? "" : "hidden"
            }">
                <div>
                    <h3 class="w-fit">${query}</h3>
                    <div class="w-52">
                        <select
                            class="w-full"
                            onchange="test2()"
                            id="dropdown"
                        >
                            <option value=""></option>
                            ${options.map((option) => {
                                return `
                                    <option value="${option}" ${
                                    option.toString() === previousValue
                                        ? "selected"
                                        : ""
                                }>
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
