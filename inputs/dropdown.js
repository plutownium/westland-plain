class dropdown {
    constructor(query, options, previousValue, radioBtnValue) {
        this.query = query;
        this.options = options;
        this.previousValue = previousValue;
        this.radioBtnValue = radioBtnValue;
    }

    getHtml() {
        return `
            <div id="dropdownContainer" class="w-auto flex flex-col items-center ${
                this.radioBtnValue === "Yes" ? "" : "hidden"
            }">
                <div>
                    <h3 class="w-fit">${this.query}</h3>
                    <div class="w-52">
                        <select
                            class="w-full"
                            onchange="test2()"
                            id="dropdown"
                        >
                            <option value=""></option>
                            ${this.options.map((option) => {
                                return `
                                    <option value="${option}" ${
                                    option.toString() === this.previousValue
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
                <div class="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    setupInputCommunication(element, handler) {
        element.addEventListener("change", function (event) {
            handler(event.target.value);
            const validationErrorEl =
                document.getElementById("dropdownContainer").childNodes[3];
            validationErrorEl.innerHTML = "bar";
        });
    }
}
