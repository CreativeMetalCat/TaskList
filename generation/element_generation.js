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

//this creates a div element with "p" and "input" element inside
function createTextDisplayAndEdit(name,idName,cssClassName,defaultText){
    let rootElement = document.createElement("div");

    //where the text will be displayed
    let textElement = document.createElement("p");
    //where the text need to be inputed
    let textInputElement = document.createElement("input");

    textElement.id = idName + "_"+name+"_"+"display";
    textInputElement.id = idName + "_"+name+"_"+"edit";

    textInputElement.value = defaultText;
    textElement.innerText = defaultText;

    textElement.className = cssClassName;
    textInputElement.className = cssClassName;

    //set proper callbacks
    textElement.onclick = function(e){
        let edit = document.getElementById(idName+"_"+name+"_edit");
        edit.style.display = "block";
        edit.focus();
        document.getElementById(idName+"_"+name+"_display").style.display ="none";

    }.bind(this,idName,name);

    textInputElement.oninput = function(e){
        document.getElementById(idName+"_"+name+"_display").innerText = document.getElementById(idName+"_"+name+"_edit").value;
    }.bind(this,idName,name);

    textInputElement.onblur = function (e){
        document.getElementById(idName+"_"+name+"_display").style.display = "block";
        document.getElementById(idName+"_"+name+"_edit").style.display ="none";
    }.bind(this,idName,name);

    textInputElement.style.display = "none";

    rootElement.appendChild(textElement);
    rootElement.appendChild(textInputElement);

    return rootElement;
}

//creates the element based on inputed json data
function generateListElementFromData(data,index){
    if(data != null){
        //(Maybe use input for text displays in the future)
        //main element of the element
        let rootElement = document.createElement("div");

        //this is the part that will only display if user hovers over the rootElement
        let contentRootElement = document.createElement("div");

        contentRootElement.className = "listElementContent";
        //set proper css classes
        rootElement.className = "listElement";

        //set element id
        //Id is just name + index so that it would not repeat
        let idName = data.name + index.toString();
        rootElement.id = idName;

        //add children
        rootElement.appendChild(createTextDisplayAndEdit("name",idName,"listElementName",data.name));
        contentRootElement.appendChild(createTextDisplayAndEdit("description",idName,"listElementDescription",data.name));

        rootElement.appendChild(contentRootElement);
        //this breaks some css
        //instead have another element that would act as banner of sorts
        //rootElement.style.background = "rgba("+data.color.r.toString()+","+data.color.g.toString()+","+data.color.b.toString()+",0.5)";

        return rootElement;
    }
}