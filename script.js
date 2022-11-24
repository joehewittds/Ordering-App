import {menuArray} from "./menu.js";

//function that renders menu items
const menuItem = document.getElementById("menuList")
function renderMenuItems() {
    for (let i = 0; i < Object.keys(menuArray).length; i++) {   
        // item[i] += 
        menuItem.innerHTML +=`
        <div class="menu">
            <div class="flex">
                <div id="emoji1">
                    <p class="emoji">${menuArray[i].emoji}</p>
                </div>
                <div class="menuItem">
                    <p>${menuArray[i].name}</p>
                    <br>
                    <p>${menuArray[i].ingredients}</p> 
                    <br>
                    <p>£${menuArray[i].price}</p>
                </div>
            </div>
            <div>
                <button id="btn${i}" type="button">+</button> 
            </div>
        </div>`
       

    }
}
renderMenuItems()
// event listeners that add items to order

const checkOut = document.getElementById("checkout")
const itemOne = document.getElementById("btn0")
const itemTwo = document.getElementById("btn1")
const itemThree = document.getElementById("btn2")
let total = 0
const totalPrice = document.getElementById("totalPrice")

let firstPizza=0
let firstHamburger=0
let firstBeer=0

itemOne.addEventListener("click", ()=>{
    if(firstPizza == 0){
        addItem(0)
        firstPizza += 1
    }else{
        addItem("Pizza")
    }
})
itemTwo.addEventListener("click", ()=>{
    if(firstHamburger == 0){
        addItem(1)
        firstHamburger += 1
    }else{
        addItem("Hamburger")
    }
})

itemThree.addEventListener("click", ()=>{
    if(firstBeer == 0){
        addItem(2)
        firstBeer += 1
    }else{
        addItem("Beer")
    }

})


let Pizza=0
let Hamburger=0
let Beer=0
function incrementOrder(item, math){
    if(item == "Pizza"||item ==0){
        if(math == "add"){
            Pizza += 1
        }else if(math == "sub"){
            Pizza -= 1
        }else if(math == "reset"){ 
            Pizza = 0
            firstPizza = 0
        }  
        item = "Pizza"       
    }

    if((item == "Hamburger"||item ==1)){
        if(math == "add"){
            Hamburger += 1
        }else if(math == "sub"){
            Hamburger -= 1
        }else if(math == "reset"){ 
            Hamburger = 0
            firstHamburger = 0
        }  
        item = "Hamburger"
    }

    if((item == "Beer"||item ==2)){
        if(math == "add"){
            Beer += 1
        }else if(math == "sub"){
            Beer -= 1
        }else if(math == "reset"){ 
            Beer = 0
            firstBeer = 0
        }
        item = "Beer"
    }
    const gg =document.getElementsByClassName(item)
    gg[0].innerHTML =`X ${eval(item)}`
}

// Renders selected menu items
function addItem(itemNum) {  
      
    if(Number.isInteger( itemNum )){

    checkOut.insertAdjacentHTML("beforeend", `
        <div id="${menuArray[itemNum].name}" class="flex">
            <p>${menuArray[itemNum].name}: £${menuArray[itemNum].price}</p>
            <div class="numberOfItems">
                <p class="${menuArray[itemNum].name}">X ${eval(menuArray[itemNum].name)}</p>
                <button data-itemid="${menuArray[itemNum].name}" id="addone" type="button">+</button>
                <button data-itemid="${menuArray[itemNum].name}" id="removeOne" type="button">-</button>
                <button data-itemid="${menuArray[itemNum].name}" id="remove" type="button">Remove</button>
            <div>
        </div>
    `)
    incrementOrder(itemNum, "add")
    UpdatePrice(itemNum, "add")
        
    }
    if(typeof itemNum == "string"){
        incrementOrder(itemNum, "add")
        var index = menuArray.findIndex(p => p.name == itemNum);
        UpdatePrice(index, "add")
    }
    

}


checkOut.onclick = function (e){
    
    if(e.target && e.target.id == "remove"){
        const itemH = e.target.getAttribute("data-itemid")
        document.getElementById(itemH).remove()

        var index = menuArray.findIndex(p => p.name == e.target.dataset.itemid);

        UpdatePrice(index, "subRemove")
        incrementOrder(e.target.dataset.itemid, "reset")


    }else if(e.target && e.target.id == "addone"){
        incrementOrder(e.target.dataset.itemid, "add")
        var index = menuArray.findIndex(p => p.name == e.target.dataset.itemid);
        UpdatePrice(index, "add")
    }

}

function UpdatePrice(itemNum, math){
    if(math == "add"){
        totalPrice.textContent = `Total Price: £${total += menuArray[itemNum].price}`
    }else if(math == "subRemove"){
        console.log(itemNum)
        console.log(menuArray[itemNum].price)
        console.log(eval(menuArray[itemNum].name))
        totalPrice.textContent = `Total Price: £${total -= (menuArray[itemNum].price)*eval(menuArray[itemNum].name)}`
    }else{
        totalPrice.textContent = `Total Price: £0`
    }
}


// Modal for payment
const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const pay = document.getElementById('generate')

pay.addEventListener('click', () => {
    modal.style.display = 'inline'
})


modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})