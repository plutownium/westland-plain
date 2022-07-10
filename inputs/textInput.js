class textInput {
    constructor(query, previousValue, inputHandler, index) {
        this.query = query;
        this.previousValue = previousValue;
        this.inputHandler = inputHandler;
        this.index = index;
    }

    getHtml() {
        return `
            <div id="textInput${this.index}" class="w-40 pl-1 flex flex-col">
                <div>
                    <div class="py-2">
                        <h3 class="w-fit">${this.query}</h3>
                    </div>
                    <div class="h-12 flex">
                        <input
                            class="h-8 w-36 my-1 py-1 pl-2 border-2 border-gray-300"
                            value="${
                                this.previousValue !== null
                                    ? this.previousValue
                                    : ""
                            }"
                            type="text"
                            onchange="${this.inputHandler}"
                        />
                    </div>
                </div>
                <div class="validationErrorContainer text-red-400 font-bold">
                    
                </div>
            </div>
        `;
    }

    setupInputCommunication(element, handler) {
        element.addEventListener("input", function (event) {
            const parentOfValidationErrorNode =
                element.parentElement.parentElement.parentElement;
            const validationErrorEl = parentOfValidationErrorNode.childNodes[3];
            const valid = new Validator().validName(event.target.value);
            if (valid) {
                handler(event.target.value);
                validationErrorEl.innerHTML = "";
            } else {
                validationErrorEl.innerHTML =
                    "Names must have at least two letters";
            }
        });
    }
}
