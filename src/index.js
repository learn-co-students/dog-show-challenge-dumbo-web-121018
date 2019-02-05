document.addEventListener('DOMContentLoaded', () => {
  fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(dogs => {
      dogs.forEach(dog => {
        populateList(dog);
      })
      pickDog();
    })
})


const populateList = dog => {
  // const tableBody = document.querySelector("#table-body");
  // tableBody.innerHTML += `<tr id=${dog.id}><td>${dog.name}</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
  // `
  // console.log(tableBody);
  const tbody = document.querySelector("#table-body");
  const tr = document.createElement("tr");
  const name = document.createElement("td");
  const breed = document.createElement("td");
  const sex = document.createElement("td");
  const edit = document.createElement("button");

  name.innerText = `${dog.name}`;
  name.className = "dogName"
  breed.innerText = `${dog.breed}`;
  breed.className = "dogBreed";
  sex.innerText = `${dog.sex}`;
  sex.className = "dogSex";
  edit.innerText = "Edit";
  edit.className = "edit-button"
  edit.setAttribute("data-id", dog.id);
  tr.setAttribute('id', `${dog.id}`)
  ;

  tr.append(name);
  tr.append(breed);
  tr.append(sex);
  tr.append(edit);
  tbody.append(tr);
}

const pickDog = () => {
let edit2 = document.querySelector('.edit-button')

  edit2.addEventListener("click", e => {
    let dogForm = document.querySelector("#dog-form")
    let dogName = e.target.parentNode.querySelector(".dogName");
    let dogBreed = e.target.parentNode.querySelector(".dogBreed");
    let dogSex = e.target.parentNode.querySelector(".dogSex")
    dogForm[0].value = dogName.innerText;
    dogForm[1].value = dogBreed.innerText;
    dogForm[2].value = dogSex.innerText;

    let submit = document.querySelector("#dog-form");
console.log(submit)
let btn = dogForm.querySelector("input[type= 'submit']")
console.log(btn)
btn.dataset.id = e.target.dataset.id
  })
}


document.addEventListener('click', updateDog)

function updateDog (event){
event.preventDefault()
  if (event.target.className === 'submit'){
    let nameField = event.target.parentElement[0].value
    let breedField = event.target.parentElement[1].value
    let sexField = event.target.parentElement[2].value
let dogId = event.target.dataset.id
fetch(`http://localhost:3000/dogs/${dogId}`,{
  method: "PATCH",
  headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
  },
  body: JSON.stringify({name: nameField, breed: breedField, sex: sexField})
})
.then(res => res.json())
.then(console.log)


let body = document.getElementById('table-body')
console.log(body)
let card = body.querySelector(`tr[id= "${dogId}"]`)
card.children[0].innerText = nameField
card.children[1].innerText = breedField
card.children[2].innerText = sexField


// let dogRow = .querySelector(`tr[data-id=${dogId}]`)
// console.log(dogRow)



  }


};
