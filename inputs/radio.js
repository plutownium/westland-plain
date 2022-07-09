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
                <div class="validationErrorContainer">
                    
                </div>
            </div>
        `;
    }

    setupInputCommunication(element, handler) {}
}
