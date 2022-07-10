class singleSelect {
    constructor(query, options, previousValue, inputHandler) {
        this.query = query;
        this.options = options;
        this.previousValue = previousValue;
        this.inputHandler = inputHandler;
    }

    getHtml() {
        return `
            <div class="w-40 flex flex-col">
                <div>
                    <h3>${this.query}</h3>
                    <select
                        id="singleSelect"
                        class="border-2 border-black w-40 h-8"
                        onchange=${this.inputHandler}
                    >
                        <option value=""></option>
                        ${this.options
                            .map((option) => {
                                return `
                                <option value="${option}" ${
                                    this.previousValue === option
                                        ? "selected"
                                        : ""
                                }>${option}</option>
                            `;
                            })
                            .join("")}
                    </select>
                </div>
                <div class="validationErrorContainer text-red-400 font-bold">
                        
                </div>
            </div>
        `;
    }

    setupInputCommunication(element, handler) {
        element.addEventListener("change", function (event) {
            const parentOfValidationErrorNode =
                element.parentElement.parentElement;
            const validationErrorEl = parentOfValidationErrorNode.childNodes[3];
            const valid = new Validator().validHasChildren(event.target.value);
            handler(event.target.value);
            if (valid) {
                validationErrorEl.innerHTML = "";
            } else {
                validationErrorEl.innerHTML =
                    "Must indicate whether you are a parent";
            }
        });
    }
}
