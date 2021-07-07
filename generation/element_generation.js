
function loadFromData(data){
    let resultNode = document.getElementById("generated");
    if (resultNode != null) {
        try {

            let loadedData = JSON.parse(data);
            for (let i = 0; i < loadedData.todo.length; i++) {
                try {
                    resultNode.appendChild(generateListElementFromData(loadedData.todo[i]));
                }
                catch (e) {
                    alert(e.message)
                }
            }
        } catch (e) {
            alert(e.message)
        }
    }
}

//test function that loads data from local json
function loadFromLocalData() {
    const testData = `{ "todo": [ { "name": "object", "description": "apple", "state" : 0, "color" : { "r": 0, "g": 0, "b": 0 }, "done": false },{ "name": "object2", "description": "apple 2:apple harder", "state" : 1, "color" : { "r": 0, "g": 0, "b": 0 }, "done": true } ], "additionalInfo": { "listName": "Name", "listDesc" : "banana" } }`;
    const testData_Small = '{"todo":[{"f":"f"},1,2]}';
    loadFromData(testData);
}

function loadFromFileData(inputFieldId) {
    let input = document.getElementById(inputFieldId);
    if (input.value == "") {
        alert("No file was selected!");
    }

    let reader = new FileReader();
    reader.addEventListener("load", function (e) {
        loadFromData(e.target.result);
    });

    reader.readAsText(input.files[0]);

}

//creates the element based on inputed json data
function generateListElementFromData(data){
    if(data != null){
        //(Maybe use input for text displays in the future)
        //main element of the element
        let rootElement = document.createElement("div");
        //where the name will be displayed
        let nameElement = document.createElement("h3");
        //where the description will be displayed
        let descElement = document.createElement("p");
        //this is the part that will only display if user hovers over the rootElement
        let contentRootElement = document.createElement("div");


        rootElement.className = "listElement";
        nameElement.innerText = data.name;
        descElement.innerText = data.description;
        contentRootElement.className = "listElementContent";

        rootElement.appendChild(nameElement);
        contentRootElement.appendChild(descElement);

        rootElement.appendChild(contentRootElement);
        //this breaks some css
        //instead have another element that would act as banner of sorts
        //rootElement.style.background = "rgba("+data.color.r.toString()+","+data.color.g.toString()+","+data.color.b.toString()+",0.5)";

        return rootElement;
    }
}