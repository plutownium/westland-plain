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
}
