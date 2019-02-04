document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = 'http://localhost:3000/dogs'
    const dogTable = document.querySelector('#table-body')
    const dogEditForm = document.getElementById('dog-form')
    console.log(dogTable)
 
    
    dogTable.addEventListener("click",event => populateEditForm(event,dogEditForm))
    
    
    dogEditForm.addEventListener()
    
          
          
          
     fetch(dogUrl)
    .then(res => res.json())
    .then(response => displayDogs(response,dogTable))

})


function displayDogs(response,table){
response.forEach(dog =>  
table.innerHTML += `<tr><td>${dog.name}</td> 
<td>${dog.breed}</td> 
<td>${dog.sex}</td> 
<td><button>Edit</button>
</td></tr>`    
)}


function populateEditForm(event,form){
    
    
    let tr = event.target.parentNode.parentNode
    form.name.value = tr.children[0].innerText
    form.breed.value = tr.children[1].innerText
    form.sex.value = tr.children[2].innerText
    
   
    
    
}
          
                 
                 