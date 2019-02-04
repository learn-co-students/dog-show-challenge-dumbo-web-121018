const dogUrl = 'http://localhost:3000/dogs'
document.addEventListener('DOMContentLoaded', () => {
  const dogTable = document.querySelector('#table-body')
  const dogEditForm = document.getElementById('dog-form')

  dogTable.addEventListener('click', event => populateEditForm(event, dogEditForm))

  dogEditForm.addEventListener('submit', event => {
    event.preventDefault()
    updateDog(event, dogTable)
  })

  fetch(dogUrl)
    .then(res => res.json())
    .then(response => displayDogs(response, dogTable))
})

function displayDogs (response, table) {
  response.forEach(dog => addRowToTable(dog, table))
}

function addRowToTable (dog, table) {
  table.innerHTML +=
  `<tr id='${dog.id}'>
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button>Edit</button></td>
  </tr>`
}

function populateEditForm (event, form) {
  console.dir(event)
  let tr = event.target.parentNode.parentNode
  form.id.value = tr.id
  form.name.value = tr.children[0].innerText
  form.breed.value = tr.children[1].innerText
  form.sex.value = tr.children[2].innerText
}

function updateDog (e, table) {
  const editedDog = {
    name: e.target[1].value,
    breed: e.target[2].value,
    sex: e.target[3].value
  }
  const id = e.target[0].value

  fetch(dogUrl + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(editedDog)
  })
    .then(res => res.json())
    .then(dog => slapDogOnDom(dog, table))
}

function slapDogOnDom (dog, table) {
  let dogRow = table.children[dog.id - 1]
  console.dir(dogRow)
  dogRow.children[0].innerText = dog.name
  dogRow.children[1].innerText = dog.breed
  dogRow.children[2].innerText = dog.sex
}
