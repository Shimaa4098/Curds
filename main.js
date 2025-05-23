let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads  = document.getElementById('ads');
let discount  = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let catogery = document.getElementById('catogery');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.background='#040'
    } else {
        total.innerHTML = '';
        total.style.background=' #a00d02'
    }
}


//save localStorage
let dataPro;
if (localStorage.product != null) {
    dataPro=JSON.parse(localStorage.product)
} else {
    dataPro=[];
}


//create product

submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catogery:catogery.value.toLowerCase()

    }
    if (mood === 'create') {
        if (newPro.count > 1) {
            for (i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = "create";
        count.style.display='block'
    }

    localStorage.setItem('product',  JSON.stringify(dataPro) )
    clearData()
    showData()
}


//clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    catogery.value = '';
}



//read
function showData() {
    getTotal()
    let table = '';
    for (i = 0; i < dataPro.length; i++){
        table += `
                 <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].catogery}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
                </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (dataPro.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All ( ${dataPro.length} ) </button>
        `
    }
    else {
        btnDelete.innerHTML=''
    }
}
showData()




//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}
function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
 }


//count

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display='none'
    catogery.value = dataPro[i].catogery;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
    
}

//search
let searchMood = 'title';
function getsearchmood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title'; 
        search.placeholder = 'search by title';
    } else {
        searchMood = 'category';
        search.placeholder = 'search by category';
    }
    search.foucs()
    search.value = '';
    showData()
}

function searchData(value) {
    let table = '';
    if (searchMood == 'title') {
        for (i = 0; i < dataPro.length; i++)
        {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                 <tr>
                    <td>${i}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].catogery}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
                </tr>
                   `;
        
            }
        }
    } else {
        for (i = 0; i < dataPro.length; i++)
            {
                if (dataPro[i].catogery.includes(value.toLowerCase())) {
                    table += `
                     <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].catogery}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i}) " id="delete">delete</button></td>
                    </tr>
                       `;
            
                }
            }
        
    }
    document.getElementById('tbody').innerHTML = table;
}
//clean data