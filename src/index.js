import "./styles.css"
import { Item, Project, createProj, createItem } from "./funcs.js"
import Icon1 from "./svg/star-outline.svg";
import Icon2 from "./svg/pencil.svg";
import Icon3 from "./svg/delete.svg";
import Icon4 from "./svg/star.svg";

let projList = [];
let currId = -1;

function displayItem(proj, item) {
    const itemList = document.querySelector("#content");
    const docItem = document.createElement("div");
    const doneBox = document.createElement("input");
    doneBox.setAttribute("type", "checkbox");
    doneBox.classList.add("done-checkbox");
    doneBox.checked = item.done;
    doneBox.onclick = () => {
        if (doneBox.checked) item.done = true;
        else item.done = false;
    }
    docItem.appendChild(doneBox);
    const itemContent = document.createElement("div");
    itemContent.classList.add("item-content");
    const title = document.createElement("div");
    title.classList.add("title");
    title.textContent = item.name;
    itemContent.appendChild(title);
    const dueDate = document.createElement("div");
    dueDate.classList.add("due-date");
    dueDate.textContent = item.date + " " + item.time;
    itemContent.appendChild(dueDate);
    const desc = document.createElement("div");
    desc.classList.add("desc");
    desc.textContent = item.desc;
    itemContent.appendChild(desc);
    docItem.appendChild(itemContent);
    const itemOpts = document.createElement("div");
    itemOpts.classList.add("item-opts");
    const favIcon = new Image();
    favIcon.src = item.fav ? Icon4 : Icon1;
    if (item.fav) {
        favIcon.classList.add("fav-on");
        docItem.style.border = "3px solid red";
    }
    else {
        favIcon.classList.add("fav");
        docItem.style.border = "none";
    }
    favIcon.onclick = () => {
        item.fav = !item.fav;
        if (item.fav) {
            favIcon.classList.add("fav-on");
            favIcon.classList.remove("fav");
            docItem.style.border = "3px solid red";
            favIcon.src = Icon4;
        }
        else {
            favIcon.classList.add("fav");
            favIcon.classList.remove("fav-on");
            docItem.style.border = "none";
            favIcon.src = Icon1;
        }
    }
    itemOpts.appendChild(favIcon);
    const editIcon = new Image();
    editIcon.src = Icon2;
    editIcon.classList.add("edit-item");
    editIcon.onclick = () => {
        const modal = document.querySelector("#edit-item-modal");
        modal.showModal();
        const editBtn = document.querySelector("#edit-item-btn");
        editBtn.onclick = () => {
            const newTitle = document.querySelector("#edit-item-title").value;
            const newDate = document.querySelector("#edit-due-date").value;
            const newTime = document.querySelector("#edit-due-time").value;
            const newDesc = document.querySelector("#edit-desc").value;
            if (newTitle === "" || newDate === "" || newTime === "" || newDesc === "") return;
            item.name = newTitle;
            item.date = newDate;
            item.time = newTime;
            item.desc = newDesc;
            title.textContent = newTitle;
            dueDate.textContent = item.date + " " + item.time;
            desc.textContent = item.desc;
            document.querySelector("#edit-item-title").value = "";
            document.querySelector("#edit-due-date").value = "";
            document.querySelector("#edit-due-time").value = "";
            document.querySelector("#edit-desc").value = "";
            modal.close();
        }
    }
    itemOpts.appendChild(editIcon);
    const delIcon = new Image();
    delIcon.src = Icon3;
    delIcon.classList.add("delete-item");
    delIcon.onclick = () => {
        for (let i = 0; i < proj.items.length; i++) {
            if (proj.items[i] == item) proj.items.splice(i, 1);
        }
        itemList.removeChild(docItem);
    }
    itemOpts.appendChild(delIcon);
    docItem.appendChild(itemOpts);
    itemList.appendChild(docItem);
}

function displayProj(project) {
    document.querySelector("#content").style.display = "flex";
    document.querySelector("#curr-title").textContent = project.name;
    currId = project.id;
    const itemList = document.querySelector("#content");
    while (itemList.children.length > 2) itemList.removeChild(itemList.lastChild);
    for (let i = 0; i < project.items.length; i++) displayItem(project, project.items[i]);
    let currIdx = 0;
    for (let i = 0; i < projList.length; i++) {
        if (projList[i].id == project.id) {
            currIdx = i;
            break;
        }
    }
    const editProj = document.querySelector(".edit-proj");
    editProj.onclick = () => {
        const modal = document.querySelector("#edit-project-modal");
        modal.showModal();
        const editProjBtn = document.querySelector("#edit-project-btn");
        editProjBtn.onclick = () => {
            const newTitle = document.querySelector("#edit-proj-title").value;
            document.querySelector("#sidebar").children[currIdx + 2].textContent = newTitle;
            document.querySelector("#curr-title").textContent = newTitle;
            project.name = newTitle;
            document.querySelector("#edit-proj-title").value = "";
            modal.close();
        }
    }
    const delProj = document.querySelector(".delete-proj");
    delProj.onclick = () => {
        projList.splice(currIdx, 1);
        document.querySelector("#sidebar").removeChild(document.querySelector("#sidebar").children[currIdx + 2]);
        document.querySelector("#content").style.display = "none";
    }
    const addItem = document.querySelector("#add-item");
    addItem.onclick = () => {
        const modal = document.querySelector("#add-item-modal");
        modal.showModal();
        const addItemBtn = document.querySelector("#add-item-btn");
        addItemBtn.onclick = () => {
            const newTitle = document.querySelector("#item-title").value;
            const newDate = document.querySelector("#due-date").value;
            const newTime = document.querySelector("#due-time").value;
            const newDesc = document.querySelector("#desc").value;
            if (newTitle === "" || newDate === "" || newTime === "" || newDesc === "") return;
            const newItem = createItem(newTitle, newDate, newTime, newDesc);
            project.addItems(newItem);
            displayItem(project, newItem);
            document.querySelector("#item-title").value = "";
            document.querySelector("#due-date").value = "";
            document.querySelector("#due-time").value = "";
            document.querySelector("#desc").value = "";
            modal.close();
        }
    }
}

function addProject(project) {
    const docList = document.querySelector("#sidebar");
    projList.push(project);
    const projNav = document.createElement("nav");
    projNav.textContent = project.name;
    projNav.classList.add("project");
    projNav.onclick = () => {
        const currNav = document.querySelector(".selected");
        if (!(currNav === null)) currNav.classList.remove("selected");
        projNav.classList.add("selected");
        if (currId != project.id) displayProj(project);
    }
    docList.appendChild(projNav);
}

let id = 0;

const addProjBtn = document.querySelector("#add-project");

addProjBtn.onclick = () => {
    const modal = document.querySelector("#add-project-modal");
    modal.showModal();
    const addProj = document.querySelector("#add-project-btn");
    addProj.onclick = () => {
        const projTitle = document.querySelector("#proj-title").value;
        if (projTitle === "") return;
        const newProj = createProj(projTitle, id);
        id++;
        addProject(newProj);
        document.querySelector("#proj-title").value = "";
        modal.close();
    }
}

const modal1 = document.querySelector("#add-project-modal");
const c1 = document.querySelector("#close-project");
c1.onclick = () => {
    document.querySelector("#proj-title").value = "";
    modal1.close();
}

const modal2 = document.querySelector("#add-item-modal");
const c2 = document.querySelector("#close-item");
c2.onclick = () => {
    document.querySelector("#item-title").value = "";
    document.querySelector("#due-date").value = "";
    document.querySelector("#due-time").value = "";
    document.querySelector("#desc").value = "";
    modal2.close();
}
const modal3 = document.querySelector("#edit-project-modal");
const c3 = document.querySelector("#close-edit-project");
c3.onclick = () => {
    document.querySelector("#edit-proj-title").value = "";
    modal3.close();
}
const modal4 = document.querySelector("#edit-item-modal");
const c4 = document.querySelector("#close-edit-item");
c4.onclick = () => {
    document.querySelector("#edit-item-title").value = "";
    document.querySelector("#edit-due-date").value = "";
    document.querySelector("#edit-due-time").value = "";
    document.querySelector("#edit-desc").value = "";
    modal4.close();
}