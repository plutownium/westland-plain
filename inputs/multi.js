class singleSelect {
    constructor(query, options, previousValue, selections) {
        this.query = query;
        this.options = options;
        this.previousValue = previousValue;
        this.selections = selections;
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
                <div class="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    setupInputCommunication(element, handler) {
        for (let i = 0; i < multiLineSelect.length; i++) {
            element[i].addEventListener("click", function (event) {
                const parentOfValidationErrorNode = document.getElementById(
                    "multiSelectContainer"
                ).parentElement;
                const validationErrorEl =
                    parentOfValidationErrorNode.childNodes[3];
                console.log(validationErrorEl, 159);
                validationErrorEl.innerHTML = "Bowls";
                handler(event.target.innerHTML);
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
                    console.log(validationErrorEl, 159);
                    validationErrorEl.innerHTML = "Bowls";
                    handler(choice);
                }
            );
        }
    }
}
