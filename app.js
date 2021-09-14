// Get Product Form API 
const loadProducts = async () => {
    const url = `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();
    showProducts(data);
};
loadProducts();

// Show All Product in UI
const showProducts = (products) => {
    const allProducts = products.map((pd) => pd);
    for (const product of allProducts) {
        const image = product.image;
        const title = product.title;
        const sliceTitle = title.slice(0, 25);
        const div = document.createElement('div');
        div.classList.add('col');
        // Show Starts Dynamically Start
        let HTML = "";
        for (let i = 0; i < 5; i++) {
            let icoClass = i < product.rating.rate ? "fa fa-star star-color" : "fa fa-star-o";
            HTML += "<i class='" + icoClass + "'></i>";
        }
        // Show Starts Dynamically Start
        div.innerHTML = `
        <div class="card h-100">
          <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${sliceTitle}</h5>
              <p>Category: ${product.category}</p> <br>
              <div>
                <h6>
                  ${HTML} ${product.rating.rate} (${product.rating.count});
                </h6>
              </div>
              <h4>Price: <span style ='color:#db8216c0'>$${product.price}</span></h4>
            </div>
           <div class="card-footer">
              <button onclick="addToCart(${product.id},${product.price})" type="button" class="btn btn-outline-light mt-4 px-4 py-2" id="addToCart-btn" class="buy-now">Add to cart</button>
              <button onclick="loadDetails(${product.id})" id="details-btn" type="button" class="btn btn-outline-light mt-4 px-4 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
            </div>
        </div>
        `;

        document.getElementById('all-products').appendChild(div);
        document.getElementById('footer').style.display = 'block';
    }
};

// Get Api by Id For Modal Details
const loadDetails = async (id) => {
    const url = `https://fakestoreapi.com/products/${id}`
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data);
};
// Show Modal Details 
const showDetails = (detail) => {
    const modalTitle = document.getElementById('exampleModalLabel');
    const productDetail = detail.description;
    const productDetailSlice = productDetail.slice(0, 200)
    const productTitle = detail.title;
    const productTitleSlice = productTitle.slice(0, 25)
    modalTitle.style.color = '#555'
    modalTitle.innerText = detail.category;
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
                          <img src="${detail.image}" class="img-fluid">
                          <h3 style = 'color:#555'>${productTitleSlice}</h3>
                          <h5 style = 'color:#555'> Price:<span style ='color:#db8216c0'>$${detail.price}</span></h5>
                          <small style = 'color:#555'>${productDetailSlice}</small>
     `;
};
// Update Total Products in Cart
let count = 0;
const addToCart = (id, price) => {
    count = count + 1;
    updatePrice('price', price);

    updateTaxAndCharge();
    document.getElementById('total-Products').innerText = count;
    updateTotal();
};
// Update Value in Cart
const getInputValue = (id) => {
    const element = document.getElementById(id).innerText;
    const converted = parseFloat(element);
    return converted;
};

// Update Main Price Function
const updatePrice = (id, value) => {
    const convertedOldPrice = getInputValue(id);
    const convertPrice = parseFloat(value);
    const total = convertedOldPrice + convertPrice;
    document.getElementById(id).innerText = total.toFixed(2);
};

// Set Inner Text Function
const setInnerText = (id, value) => {
    document.getElementById(id).innerText = value.toFixed(2);
};

// Update Delivery Charge and Tax
const updateTaxAndCharge = () => {
    const priceConverted = getInputValue('price');

    if (priceConverted > 200) {
        setInnerText('delivery-charge', 30);
        setInnerText('total-tax', priceConverted * 0.2);
    }
    if (priceConverted > 400) {
        setInnerText('delivery-charge', 50);
        setInnerText('total-tax', priceConverted * 0.3);
    }
    if (priceConverted > 500) {
        setInnerText('delivery-charge', 60);
        setInnerText('total-tax', priceConverted * 0.4);
    }
};

//Update Grand Total Function
const updateTotal = () => {
    const grandTotal =
        getInputValue('price') +
        getInputValue('delivery-charge') +
        getInputValue('total-tax');
    document.getElementById('total').innerText = grandTotal.toFixed(2);
};