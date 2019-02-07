document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById("table-body")
  const dogForm = document.getElementById("dog-form")

  const fetchDogs = () => {
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data => populateDogTable(data))
  }

  const populateDogTable = data => {
    tableBody.innerHTML = ""
    data.forEach(addOneDogToTable)
  }

  const addOneDogToTable = dog => {
    const string = `<tr data-id="${dog.id}">
      <td class="dog-name">${dog.name}</td>
      <td class="dog-breed">${dog.breed}</td>
      <td class="dog-sex">${dog.sex}</td>
      <td><button class="edit-button">Edit</button></td>
      </tr>`
    tableBody.innerHTML += string
  }

  const addEventToTableBody = () => {
    tableBody.addEventListener("click", editButtonEvent)
  }

  const editButtonEvent = event => {
    if (event.target.classList.contains("edit-button")) {
      // populate dogForm on top
      const dogsRow = event.target.parentNode.parentNode
      dogForm.dataset.id = dogsRow.dataset.id
      dogForm.name.value = dogsRow.querySelector(".dog-name").innerText
      dogForm.breed.value = dogsRow.querySelector(".dog-breed").innerText
      dogForm.sex.value = dogsRow.querySelector(".dog-sex").innerText
    }
  }

  const addEventToDogForm = () => {
    dogForm.addEventListener("submit", submitFormEvent)
  }

  const submitFormEvent = event => {
    event.preventDefault();
    if (event.target.dataset.id != undefined) {
      fetch(`http://localhost:3000/dogs/${event.target.dataset.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: dogForm.name.value,
          breed: dogForm.breed.value,
          sex: dogForm.sex.value
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(fetchDogs)
      // .then(res => res.json())
    }
  }

  // function calls
  fetchDogs();
  addEventToTableBody();
  addEventToDogForm();
  // End of DOMContentLoaded
})
