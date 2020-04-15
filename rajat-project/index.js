const createGrid = (data)=>{
    let tableElem = document.getElementsByTagName("table")[0];

    //headers 
    let features = getFeatures(data);

    let headRow = document.getElementsByClassName("header")[0];
    features.forEach(feature=>{
        let col = document.createElement("th");
        let text = document.createTextNode(feature);
        col.appendChild(text);
        headRow.appendChild(col);
    })

    //rows
    let projects = getProjects(data);

    for(let i=0; i< projects.length; i++){
        let projectName = projects[i];
        let featureArr = data[i][projectName];
        let row = document.createElement("tr");
        let projectNameElem = document.createElement("th");
        let text = document.createTextNode(projectName);
        projectNameElem.appendChild(text);
        row.appendChild(projectNameElem);
        for(let j=0; j<featureArr.length; j++){
            let featureElem = document.createElement("th");
            let featureName = features[j];
            let color = featureArr[j][featureName]["color"];
            let text = document.createTextNode("");
            featureElem.appendChild(text);
            featureElem.style.backgroundColor = color;
            if(color === "red"|| color === "yellow"){
                let reason_title = featureArr[j][features[j]]["reason_title"];
                let missing_box = featureArr[j][features[j]]["missing_box"];
                featureElem.addEventListener("click", ()=>clickHandler(projectName, featureName, reason_title, missing_box));
            }
            row.appendChild(featureElem);
        }
        
        tableElem.appendChild(row);
    }
}


const getFeatures = (data)=>{
    let arr = []; 
    let project = getProjects(data)[0];
    let featureArr = data[0][project];
    featureArr.forEach(feature=>{
        let key = Object.keys(feature)[0];
        arr.push(key);
    })
    return arr;
}

const getProjects = (data)=>{
    let arr = [];
    let projectArr = data;
    projectArr.forEach(project=>{
        let key = Object.keys(project)[0];
        arr.push(key);
    })
    return arr;
}

const clickHandler = (project, feature, title, missing_box)=>{
    alert(`project: ${project} feature: ${feature} title: ${title} missingBox: ${missing_box}`);
}

(function(){
    //API value should be stored in config or something
    fetch(' https://demo0556385.mockable.io/rajat-project')
                .then(res=>res.json())
                .then(res=>createGrid(res));
})();