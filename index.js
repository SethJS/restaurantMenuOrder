import menuArray from "/data.js"

const orderSection = document.getElementById('your-order')
const itemContainer = document.getElementById('item-container')
const cartContainer = document.getElementById('cart-container')
const cartTotalHtml = document.getElementById('cart-total')
const consentForm = document.getElementById('consent-form')
const popUp = document.getElementById('modal')
const thanksContainer = document.getElementById('thanks-container')

let cart = []
let cartId = 0
// thanksContainer.style.display = 'none'
// popUp.style.display = 'none'

//trying to keep DRY coding practices in mind as well as incorporating modern JS code


document.addEventListener("click", function(e){
    console.log("click!")
    if (document.getElementById(e.target.id)){
        document.getElementById(e.target.id).classList.contains("plus-button") ? addToCart(e.target.id) : console.log("not add menu button")
    }   
    if (document.getElementById(e.target.id)){
        document.getElementById(e.target.id).classList.contains("remove-btn") ? removeFromCart(e.target.id) : console.log("not remove-btn")
    }
    if (e.target.id == 'order-btn') {
        // console.log("complete order clicked!")
        popUp.style.display = 'block'
    }
    if (e.target.id == 'modal-close-btn') {
        popUp.style.display = 'none'
    }
    // if (e.target.id == 'pay-btn') {
    //     popUp.style.display = 'none'
    //     console.log('Thank you for paying!')
    // }
    
    console.log("target =", e.target)
})

consentForm.addEventListener('submit', function(e){
    e.preventDefault()
    console.log('consent form submit')
    
    const consentFormData = new FormData(consentForm)
    const fullName = consentFormData.get('fullName')
    
    console.log(`logging name: ${fullName}`)
    popUp.style.display = 'none'
    cart = []
    renderCart()
    
    thanksContainer.style.display = 'flex'
    thanksContainer.innerHTML = `
    <h3>Thanks, ${fullName}! Your order is on the way!</h3>
    `
})


//rendering menu
menuArray.forEach((item, index) => {
    itemContainer.innerHTML += `
    <div class="item">
        <div class="menu-items">
            <div class="emoji-container">
                <p class="emoji">${item.emoji}</p>
            </div>
            <div class="item-info">
                <h3>${item.name}</h3>
                <p>${item.ingredients.map(ingredient => {return ingredient}).join(", ")}</p>
                <h4>$${item.price}</h4>
            </div>
        </div>
        <div class="item-button">
            <button class="plus-button" id="${item.id}">+</button>
        </div>
    </div>
    `
})


function renderCart() {
    let cartTotal = 0
    console.log("rendering cart")
    
    cartContainer.innerHTML = ''
    if (cart.length > 0) {
        //populating cart html
        cart.forEach(item => {
            console.log(item)
            cartContainer.innerHTML += `
            <div class="cart-items">
                <div class="cart-item">
                    <h3>${item.name}</h3>
                    <button class="remove-btn" id="${item.id}">remove</button>
                </div>
                <div class="item-prices">
                    <p>$${item.price}</p>
                </div>
            </div>`
            cartTotal += item.price
        })
        cartTotalHtml.innerText = `$${cartTotal}`
        //displaying cart
        orderSection.style.display = "flex"
    } else {
        //hiding empty cart
        orderSection.style.display = "none"
    } 
}

function addToCart(targetId) {
    thanksContainer.style.display = 'none'
    //making item a shallow copy to make sure original data doesn't change
    let item = Object.assign({}, menuArray.find(order => { 
        //console.log(`looking for id ${targetId}: ${order.name} and id ${order.id}`)
        return targetId == order.id
    }))
    console.log(`adding menu item to bill: ${item.name}`)
    cartId--
    item.id = cartId
    
    cart.push(item)
    renderCart()
}


function removeFromCart(targetId) {
    console.log(`removing id:${targetId}`)
    console.log(`removing: ${cart.find(order => {
        return targetId == order.id
    }).name}`)
    
    // someArray.splice(x, 1) removes x position from the array
    console.log(`trying to remove index:${cart.findIndex(order =>targetId == order.id)}`)
    
    cart.splice(cart.findIndex(order =>targetId == order.id),1)
    renderCart()
}






