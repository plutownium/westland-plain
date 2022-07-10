class multiSelect {
    constructor(query, options, previousValue, selections) {
        this.query = query;
        this.options = options;
        this.previousValue = previousValue;
        this.selections = selections;
        this.internalHobbies = [];
    }

    setHobby(hobby) {
        if (this.internalHobbies.includes(hobby)) {
            // remove from list
            console.log("removing...", hobby);
            const withoutUncheckedValue = this.internalHobbies.filter(
                (h) => h !== hobby
            );
            this.internalHobbies = withoutUncheckedValue;
            if (withoutUncheckedValue.length === 0) {
                // setValidationError();
            }
        } else {
            console.log("adding...", hobby);
            const newHobbies = [...this.internalHobbies];
            newHobbies.push(hobby);
            this.internalHobbies = newHobbies;
            // setValidationError("");
        }
    }

    getHtml() {
        return `
            <div class="w-40 flex flex-col">
                <div id="multiSelectContainer">
                    <h3>${this.query}</h3>
                    <div>
                        ${this.options
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
                                                this.previousValue
                                                    ? this.previousValue.includes(
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
                <div class="validationErrorContainer text-red-400 font-bold">
                    
                </div>
            </div>
        `;
    }

    setupInputCommunication(elements, handler, currentHobbies) {
        const multiThis = this;
        for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", function (event) {
                const choice = event.target.innerHTML;
                const parentOfValidationErrorNode = document.getElementById(
                    "multiSelectContainer"
                ).parentElement;
                const validationErrorEl =
                    parentOfValidationErrorNode.childNodes[3];
                const validator = new Validator();
                if (!validator.wellFormedHobby(choice)) {
                    return; // pretend the click never happened
                }

                if (
                    validator.changeWouldYieldEmptyArray(
                        choice,
                        multiThis.internalHobbies
                    )
                ) {
                    multiThis.setHobby(choice);
                    handler(choice);
                    validationErrorEl.innerHTML =
                        "Must select at least one hobby";
                } else {
                    multiThis.setHobby(choice);
                    handler(choice);
                    validationErrorEl.innerHTML = "";
                }
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
                    // FIXME: clicking between checkbox and choice adds strange "\nMusic\n" to hobbies
                    const parentOfValidationErrorNode = document.getElementById(
                        "multiSelectContainer"
                    ).parentElement;
                    const validationErrorEl =
                        parentOfValidationErrorNode.childNodes[3];
                    const valid = new Validator().validHobbies(choice);
                    if (valid) {
                        handler(event.target.innerHTML);
                        validationErrorEl.innerHTML = "";
                    } else {
                        validationErrorEl.innerHTML =
                            "Must select at least one hobby";
                    }
                }
            );
        }
    }
}
