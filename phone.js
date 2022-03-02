const searchBtn = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => display(data))
}

const display = (recive) => {
    const addingDiv = document.getElementById('adding')
    addingDiv.textContent = '';
    if (recive.status == false) {
        const div = document.createElement('div')
        div.classList.add('result-show')
        div.innerHTML = ` <p>No Result Found</p>`
        addingDiv.appendChild(div)
    } else {
        const inputs = recive.data
        for (const input of inputs) {
            const div = document.createElement('div')
            div.classList.add('col')
            div.innerHTML = ` 
                            <div class="card h-100">
                        <img  src="${input.image}" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${input.phone_name}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to
                                additional
                                content. This content is a little bit longer.</p>
                        </div>
                        <div>
                            <button onclick = "clickBtn('${input.slug}')" class="detail-btn">Details</button>
                        </div>
                    </div>
        `
            addingDiv.appendChild(div)


        }
    }

}

// Details Button Part 
const clickBtn = (input) => {
    const url = `https://openapi.programming-hero.com/api/phone/${input}`
    fetch(url)
        .then(res => res.json())
        .then(data => detailDisplay(data))

}

const detailDisplay = (input) => {
    const callSection = document.getElementById('detail-add')
    callSection.textContent = '';
    // console.log(input.data.name);
    const div = document.createElement('div')
    div.innerHTML = ` 
                    <div class="card" style="width: 18rem;">
                <img src="${input.data.image}" class="card-img-top" alt="...">
                <div class="card-body">
                <h3 class = "name-color">${input.data.name}</h3>
                    <p class="card-text"> <span class = "color">Brand</span> : ${input.data.brand}</p>
                    <p class="card-text"> <span class = "color">Memory</span>  : ${input.data.mainFeatures.memory}</p>
                    <p class="card-text"> <span class = "color">Chipset</span>  : ${input.data.mainFeatures.chipSet}</p>
                    <p class="card-text"> <span class = "color">Display</span>  : ${input.data.mainFeatures.displaySize}</p>
                    <p class="card-text"> <span class = "color">Storage</span>  : ${input.data.mainFeatures.storage}</p>
                </div>
            </div>
    `
    callSection.appendChild(div)
}
