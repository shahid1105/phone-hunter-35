const loadPhones = async(searchField, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchField}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';

    // display 10 phone 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0,10);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }


    // display warning no phone found
    const noPhone = document.getElementById('no-phone-message');

    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phone 
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card">
        <img src="${phone.image}" class="card-img-top p-5" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick = "loadPhonesDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailsModal">Show 
                Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
// stop loader 
toggleLoader(false);
}

const processSearch = (dataLimit) =>{
    toggleLoader(true);
    const searchField = document.getElementById('input-field').value;
    loadPhones(searchField, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10);
})

// search input field enter
// Get the input field
document.getElementById("input-field").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        processSearch(10);
  }
});
    

const toggleLoader = (isLoading) =>{
    const sectionSpinner = document.getElementById('loader');
    if(isLoading){
        sectionSpinner.classList.remove('d-none');
    }
    else{
        sectionSpinner.classList.add('d-none');
    }
}

//not the best way to btn load show all

document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch();
})


// load phone details 
const loadPhonesDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;

    const res = await fetch(url);
    const data = await res.json();
   showPhoneDetails(data.data);
}

// show phone details 
const showPhoneDetails = phone =>{
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailsModalLabel');
    modalTitle.innerText = phone.name;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML =`
        <p>Release date: ${phone.releaseDate ? phone.releaseDate : 'Not found release date'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'storage not found'}</p>
        <p>Memory: ${phone.mainFeatures ? phone.mainFeatures.memory : 'memory not found'}</p>
        <p>ChipSet: ${phone.mainFeatures ? phone.mainFeatures.chipSet : 'chipSet not found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'Others Not found'}</p>
    `
}

loadPhones('apple')