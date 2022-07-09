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
                                console.log(
                                    this.previousValue === option
                                        ? "selected"
                                        : false,
                                    271
                                );
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
                <div class="validationErrorContainer">
                        
                </div>
            </div>
        `;
    }
}