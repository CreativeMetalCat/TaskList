//this hides the actual name display block and displays <input> element
//the reason why don't use css things is because this is activated by click not hover
function startNameEdit(listElementId){
    document.getElementById(listElementId+"_name_edit").style.display = "block";
    document.getElementById(listElementId+"_name_display").style.display ="none";
}

//this displays the actual name display block and hides <input> element
function endNameEdit(listElementId){
    document.getElementById(listElementId+"_name_display").style.display = "block";
    document.getElementById(listElementId+"_name_edit").style.display ="none";
}

//changes text of the name display
function onNameEdit(listElementId){
    document.getElementById(listElementId+"_name_display").innerText = document.getElementById(listElementId+"_name_edit").value;
}

function loadFromData(data){
    let resultNode = document.getElementById("generated");
    if (resultNode != null) {
        try {

            let loadedData = JSON.parse(data);
            for (let i = 0; i < loadedData.todo.length; i++) {
                try {
                    resultNode.appendChild(generateListElementFromData(loadedData.todo[i],i));
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
function generateListElementFromData(data,index){
    if(data != null){
        //(Maybe use input for text displays in the future)
        //main element of the element
        let rootElement = document.createElement("div");
        //where the name will be displayed
        let nameElement = document.createElement("p");
        //where the name need to be inputed
        let nameInputElement = document.createElement("input");
        //where the description will be displayed
        let descElement = document.createElement("p");
        //where the description will be inputed
        let descInputElement = document.createElement("input");
        //this is the part that will only display if user hovers over the rootElement
        let contentRootElement = document.createElement("div");

        //set proper css classes
        rootElement.className = "listElement";
        nameElement.className = "listElementName";
        nameInputElement.className = "listElementName";
        descInputElement.className = "listElementDescription";
        descElement.className = "listElementDescription";
        contentRootElement.className = "listElementContent";

        //set element id
        //Id is just name + index so that it would not repeat
        let idName = data.name + index.toString();
        rootElement.id = idName;


        //set values from the data
        nameElement.innerText = data.name;
        nameInputElement.value = data.name;
        nameElement.id = idName + "_name_display";
        nameInputElement.id = idName + "_name_edit";
        descInputElement.value = data.description;
        descElement.innerText = data.description;

        //set proper callbacks
        nameElement.onclick = function(e){startNameEdit(idName);}.bind(this,idName);
        nameInputElement.oninput = function(e){onNameEdit(idName);}.bind(this,idName);
        nameInputElement.onblur = function (e){endNameEdit(idName);}.bind(this,idName);

        nameInputElement.style.display = "none";

        //add children
        rootElement.appendChild(nameElement);
        rootElement.appendChild(nameInputElement);
        contentRootElement.appendChild(descElement);

        rootElement.appendChild(contentRootElement);
        //this breaks some css
        //instead have another element that would act as banner of sorts
        //rootElement.style.background = "rgba("+data.color.r.toString()+","+data.color.g.toString()+","+data.color.b.toString()+",0.5)";

        return rootElement;
    }
}