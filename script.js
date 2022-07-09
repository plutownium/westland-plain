const main = document.getElementsByTagName("main")[0];
console.log("script connected");
const form = new Form();
form.target = main;

form.switchToPage(1);

function test() {
    console.log("in test..144");
}

function test2() {
    console.log("test2");
}

function explain() {
    console.log(form, form.explain(), 17);
}

form.setHasChildren("bobby");
