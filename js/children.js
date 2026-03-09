const form = document.getElementById("childForm")
const table = document.getElementById("childrenTable")

const birthInput = document.getElementById("birthdate")
const ageInput = document.getElementById("age")

let children = JSON.parse(localStorage.getItem("children")) || []

let editIndex = -1

/* calcul age */

birthInput.addEventListener("change", function(){

const birth = new Date(this.value)
const today = new Date()

let age = today.getFullYear() - birth.getFullYear()

const m = today.getMonth() - birth.getMonth()

if(m < 0 || (m === 0 && today.getDate() < birth.getDate())){
age--
}

ageInput.value = age + " ans"

})

function calculateAge(birthdate){

if(!birthdate) return ""

const today = new Date()
const birth = new Date(birthdate)

let age = today.getFullYear() - birth.getFullYear()

const m = today.getMonth() - birth.getMonth()

if(m < 0 || (m === 0 && today.getDate() < birth.getDate())){
age--
}

return age
}

/* afficher enfants */

function displayChildren(){

table.innerHTML=""

children.forEach((child,index)=>{

if(!child.fullname) return

const age = calculateAge(child.birthdate)

table.innerHTML += `

<tr>

<td>
<a href="reports.html?child=${index}">
${child.fullname}
</a>
</td>

<td>${child.birthdate || ""}</td>

<td>${age ? age + " ans" : ""}</td>

<td>

<button onclick="editChild(${index})">Modifier</button>

<button onclick="deleteChild(${index})">Supprimer</button>

</td>

</tr>

`

})

}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function() {
    const query = this.value.toLowerCase();
    displayChildren(query);
});

function displayChildren(filter = "") {
    table.innerHTML = "";
    children.forEach((child, index) => {
        if (!child.fullname) return;
        if (filter && !child.fullname.toLowerCase().includes(filter)) return;
        const age = calculateAge(child.birthdate);
        table.innerHTML += `
        <tr>
        <td><a href="reports.html?child=${index}">${child.fullname}</a></td>
        <td>${child.birthdate || ""}</td>
        <td>${age ? age + " ans" : ""}</td>
        <td>
        <button onclick="editChild(${index})">Modifier</button>
        <button onclick="deleteChild(${index})">Supprimer</button>
        </td>
        </tr>`;
    });
}

/* ajouter ou modifier enfant */

form.addEventListener("submit",function(e){

e.preventDefault()

const child = {

fullname:document.getElementById("fullname").value,
birthdate:document.getElementById("birthdate").value,
birthweight:document.getElementById("birthweight").value,

mother:document.getElementById("mother").value,
father:document.getElementById("father").value,

address:document.getElementById("address").value,
email:document.getElementById("email").value,

phone1:document.getElementById("phone1").value,
phone2:document.getElementById("phone2").value,

referrer:document.getElementById("referrer").value

}

if(editIndex === -1){

children.push(child)

}else{

children[editIndex] = child
editIndex = -1

}

localStorage.setItem("children",JSON.stringify(children))

form.reset()

displayChildren()

})

/* supprimer */

function deleteChild(index){

if(confirm("Supprimer cet enfant ?")){

children.splice(index,1)

localStorage.setItem("children",JSON.stringify(children))

displayChildren()

}

}

/* modifier */

function editChild(index){

const child = children[index]

document.getElementById("fullname").value = child.fullname || ""
document.getElementById("birthdate").value = child.birthdate || ""
document.getElementById("birthweight").value = child.birthweight || ""

document.getElementById("mother").value = child.mother || ""
document.getElementById("father").value = child.father || ""

document.getElementById("address").value = child.address || ""
document.getElementById("email").value = child.email || ""

document.getElementById("phone1").value = child.phone1 || ""
document.getElementById("phone2").value = child.phone2 || ""

document.getElementById("referrer").value = child.referrer || ""

editIndex = index

}

/* afficher */

displayChildren()