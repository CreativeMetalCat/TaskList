

//Generates list element
function generateListElement()
{
    let rootElement  = document.createElement("div");
    let listElementName = document.createElement("h3");
    listElementName.innerText = "List Element Name";

    rootElement.className = "listElement";
    rootElement.appendChild(listElementName);
    rootElement.appendChild(document.createTextNode("GeneratedListObject"));

    return rootElement;
}


function generatePage()
{
    let outputArea = document.getElementById("generated");
    if(outputArea == null)
    {
        alert("Nowhere to write generated page to");
        return;
    }
    loadFromLocalData(outputArea);
    /*for(let i =0;i<5;i++)
    {
        outputArea.appendChild(generateListElement());
    }*/

}

//test function that loads data from local json
function loadFromLocalData(resultNode) {
    const testData = `{ "todo": [ { "name": "object", "description": "apple", "state" : 0, "color" : { "r": 0, "g": 0, "b": 0 }, "done": false },{ "name": "object2", "description": "apple 2:apple harder", "state" : 1, "color" : { "r": 0, "g": 0, "b": 0 }, "done": true } ], "additionalInfo": { "listName": "Name", "listDesc" : "banana" } }`;
    const testData_Small = '{"todo":[{"f":"f"},1,2]}';

    if (resultNode != null) {
        try {

            let loadedData = JSON.parse(testData);
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

function generateListElementFromData(data){
    if(data != null){
        let rootElement = document.createElement("div");
        let nameElement = document.createElement("h3");
        let descElement = document.createElement("p");

        rootElement.className = "listElement";
        nameElement.innerText = data.name;
        descElement.innerText = data.description;

        rootElement.appendChild(nameElement);
        rootElement.appendChild(descElement);

        rootElement.style.background = "rgba("+data.color.r.toString()+","+data.color.g.toString()+","+data.color.b.toString()+",0.5)";

        return rootElement;
    }
}
