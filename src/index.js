document.addEventListener('DOMContentLoaded', () => {

let dogURL = 'http://localhost:3000/dogs'
let tableBody = document.getElementById('table-body')
let nameField  = document.querySelector("input[type= 'name']")
let sexField = document.querySelector("input[type= 'sex']")
let breedField = document.querySelector("input[type= 'breed']")
let submitField = document.querySelector("input[type= 'submit']")

let dogId

function fetchDogs(){
  fetch(dogURL)
  .then(res => res.json())
  .then(dogs => dogs.forEach(displayDogs))
};

function displayDogs(dog){
tableBody.innerHTML += `<tr id=${dog.id}><td id=${dog.id}>${dog.name}</td>
<td>${dog.breed}</td>
<td>${dog.sex}</td>
<td><button class='button'>Edit</button id=${dog.id}><button class='delete'>delete</button></td></tr>`

};

document.addEventListener('click', updateDog)

function updateDog(e){
  if(e.target.className === "button"){
    fillForm(e)
  }
  else if(e.target.className === 'delete'){
    deleteDog(e)
}
    else if(e.target.className === 'submit'){
      editDog(e)
    }

};

function fillForm(e){
nameField.value = e.target.parentElement.parentElement.children[0].innerText
sexField.value = e.target.parentElement.parentElement.children[2].innerText
breedField.value = e.target.parentElement.parentElement.children[1].innerText
submitField.id = e.target.parentElement.parentElement.id
console.log(e.target.parentElement.parentElement.id)
  console.log('in edit')


};



function editDog(e){
event.preventDefault()
console.log('tried to udpdate dog info')
console.log(e.target.previousElementSibling.previousElementSibling.value)
console.log(e.target.id)
dogId = e.target.id
fetch(`http://localhost:3000/dogs/${e.target.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({name: nameField.value, breed: breedField.value, sex: sexField.value})
      })
.then(res => res.json())
.then(console.log)

let dogCard = document.querySelector(`tr[id="${dogId}"]`)
dogCard.children[0].innerText = nameField.value
dogCard.children[1].innerText = breedField.value
dogCard.children[2].innerText = sexField.value
}

function deleteDog(e){
e.target.parentElement.parentElement.remove()
dogId = e.path[2].id
fetch(`http://localhost:3000/dogs/${e.path[2].id}`,{
  method: 'DELETE',
})
.then(console.log('deleted'))
};





























fetchDogs()
})
