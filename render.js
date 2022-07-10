class Render {
    // text, single-select, multi-select, radio, dropdown
    constructor(target, form) {
        this.target = target;
        this.form = form;
    }

    loadPageOfQuestions(questions, page, currentHobbies) {
        // console.log("loading pg of questions", questions, 155);
        let html = questions
            .map((q, index) => {
                if (q.type === "text") {
                    return new textInput(
                        q.query,
                        q.previousValue,
                        q.inputHandler,
                        index
                    ).getHtml();
                } else if (q.type === "single-select") {
                    return new singleSelect(
                        q.query,
                        q.options,
                        q.previousValue,
                        q.inputHandler
                    ).getHtml();
                } else if (q.type === "multi-select") {
                    return new multiSelect(
                        q.query,
                        q.options,
                        q.previousValue,
                        q.inputHandler,
                        currentHobbies
                    ).getHtml();
                } else if (q.type === "radio") {
                    return new radioSelect(
                        q.query,
                        q.options,
                        q.previousValue,
                        q.inputHandler
                    ).getHtml();
                } else if (q.type === "dropdown") {
                    return new dropdown(
                        q.query,
                        q.options,
                        q.previousValue,
                        questions[0].previousValue // note: can only do this because it's a small app.
                    ).getHtml();
                } else {
                    throw new Error("question type not supported");
                }
            })
            .join("");

        const header = this.makeHeader(page);
        const buttons = `<div class="flex">${this.makeButtons(page)}</div>`;
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
        const buttons = `<div class="flex">${this.makeButtons(page)}</div>`;
        this.target.innerHTML = header + html + buttons;
    }

    test() {
        console.log("in test");
    }

    makeHeader(page) {
        return `
            <div class="mb-3">
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
                    <button ${type === "next" ? "disabled" : ""} id="${type}Btn"
                        class="m-2 p-2 border-2 border-gray-300 text-gray-300 text-md rounded-md"
                    >
                        <span class="${type}Btn text-gray-400">${type}</span>
                    </button>
                </div>
            </div>
    `;
    }

    attachEventListenersForPage(page) {
        const form = this.form;
        if (page === 1) {
            const textInputs = document.getElementsByTagName("input");
            const init = new textInput();
            init.setupInputCommunication(textInputs[0], form.setFirstName);
            init.setupInputCommunication(textInputs[1], form.setLastName);
            // establish btns
            const nextBtn = document.getElementById("nextBtn");
            nextBtn.addEventListener("click", function () {
                form.switchToPage(page + 1);
            });
        } else if (page === 2) {
            const singleLineSelect = document.getElementById("singleSelect");
            new singleSelect().setupInputCommunication(
                singleLineSelect,
                form.setHasChildren
            );
            const multiLineSelect =
                document.getElementsByClassName("multiSelectOption");
            console.log(form.hobbies, "138rm");
            const initMulti = new multiSelect();
            initMulti.setupInputCommunication(
                multiLineSelect,
                form.setHobbies,
                form.hobbies
            );
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
            const init = new radioSelect();
            init.setupInputCommunicationWithShowDropdown(
                radioBtns[0],
                form.setDrivesCar,
                yearsExpDropdownContainer
            );
            init.setupInputCommunicationWithHideDropdown(
                radioBtns[1],
                form.setDrivesCar,
                yearsExpDropdownContainer
            );

            new dropdown().setupInputCommunication(
                yearsExpDropdown,
                form.setYearsExperience
            );

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

    updateBtns(button) {
        console.log("...", button, 214);
        if (button.enabled) {
            console.log("enabled");
            document.getElementById("nextBtn").disabled = false;
        } else {
            console.log("dis");
            document.getElementById("nextBtn").disabled = true;
        }
    }

    // addValidationError(validationError) {
    //     return `
    //         <div class="my-2">
    //             <p class="text-red-500">${validationError}</p>
    //         </div>
    //     `;
    // }
}
