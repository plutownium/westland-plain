class radioSelect {
    constructor(query, options, previousValue) {
        this.query = query;
        this.options = options;
        this.previousValue = previousValue;
    }

    getHtml() {
        return `
            <div id="radioSelectContainer" class="flex flex-col">
                <div>
                    <h3>${this.query}</h3>
                    <div class="mt-2 flex flex-col justify-start items-start">
                        ${this.options
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
                                            this.previousValue === option
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
                <div class="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    setupInputCommunicationWithShowDropdown(element, handler, dropdown) {
        element.addEventListener("click", function (event) {
            if (event.target.value) {
                const validationErrorEl = document.getElementById(
                    "radioSelectContainer"
                ).childNodes[3];
                const valid = new Validator().validDrivesCar(
                    event.target.value
                );
                if (valid) {
                    dropdown.classList.remove("hidden");
                    handler(event.target.value);
                    validationErrorEl.innerHTML = "";
                } else {
                    validationErrorEl.innerHTML =
                        "Must indicate whether you drive a car";
                }
            }
        });
    }

    setupInputCommunicationWithHideDropdown(element, handler, dropdown) {
        element.addEventListener("click", function (event) {
            if (event.target.value) {
                const validationErrorEl = document.getElementById(
                    "radioSelectContainer"
                ).childNodes[3];
                const valid = new Validator().validDrivesCar(
                    event.target.value
                );
                if (valid) {
                    dropdown.classList.add("hidden");
                    handler(event.target.value);
                    validationErrorEl.innerHTML = "";
                } else {
                    validationErrorEl.innerHTML =
                        "Must indicate whether you drive a car";
                }
            }
        });
    }
}
