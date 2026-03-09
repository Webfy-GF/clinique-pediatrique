const childId = localStorage.getItem("selectedChild")

function goBack(){
window.location.href="children.html"
}

document.getElementById("delivery").addEventListener("change",function(){

if(this.value==="Voie haute"){
document.getElementById("causeBox").style.display="block"
}else{
document.getElementById("causeBox").style.display="none"
}

})


function saveReport(){

const data={}

document.querySelectorAll("input,select").forEach(el=>{
data[el.id]=el.value
})

localStorage.setItem("report_"+childId,JSON.stringify(data))

alert("Dossier enregistré")

}

function loadReport(){

const saved=localStorage.getItem("report_"+childId)

if(!saved)return

const data=JSON.parse(saved)

for(let key in data){

const el=document.getElementById(key)

if(el) el.value=data[key]

}

}

loadReport()