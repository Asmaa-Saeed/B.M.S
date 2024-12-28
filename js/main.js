/* ------------------------------
Codes For Moving Between Pages */
function directing() {
  document.querySelector(".inputs-section").classList.toggle("hidden");
  document.querySelector(".outputs-section").classList.toggle("hidden");
}

// ------------------------------
// data variables -- and  -- data value variables
const title = document.getElementById("title");
const price = document.getElementById("price");
const taxes = document.getElementById("taxes");
const ads = document.getElementById("ads");
const discount = document.getElementById("discount");
const category = document.getElementById("category");
const count = document.getElementById("count");
const submit = document.getElementById("submit");
// ------------------------------
const titleVal = document.getElementById("titleVal");
const priceVal = document.getElementById("priceVal");
const taxesVal = document.getElementById("taxesVal");
const adsVal = document.getElementById("adsVal");
const discountVal = document.getElementById("discountVal");
const totalVal = document.getElementById("totalVal");
const categoryVal = document.getElementById("categoryVal");
const countVal = document.getElementById("countVal");

// ------------------------------
// additional variables
let mode = "create";
let temp;
const search = document.getElementById("search");
let searchMode = "title";

// ------------------------------
// get data -- and -- show data values
function getValues() {
  if (title.value != "") {
    titleVal.innerHTML = title.value.toLowerCase();
    document.getElementById("checkTitle").style.opacity = 1;
  } else {
    titleVal.innerHTML = "#";
    document.getElementById("checkTitle").style.opacity = 0;
  }
  if (price.value != "") {
    priceVal.innerHTML = `$${price.value}`;
    document.getElementById("checkPrice").style.opacity = 1;
    document.getElementById("checkTotal").style.opacity = 1;
  } else {
    priceVal.innerHTML = "$0";
    document.getElementById("checkPrice").style.opacity = 0;
    document.getElementById("checkTotal").style.opacity = 0;
  }
  if (taxes.value != "") {
    taxesVal.innerHTML = `$${taxes.value}`;
    document.getElementById("checkTaxes").style.opacity = 1;
  } else {
    taxesVal.innerHTML = "$0";
    document.getElementById("checkTaxes").style.opacity = 0;
  }
  if (ads.value != "") {
    adsVal.innerHTML = `$${ads.value}`;
    document.getElementById("checkAds").style.opacity = 1;
  } else {
    adsVal.innerHTML = "$0";
    document.getElementById("checkAds").style.opacity = 0;
  }
  if (discount.value != "") {
    discountVal.innerHTML = `-$${discount.value}`;
    document.getElementById("checkDiscount").style.opacity = 1;
  } else {
    discountVal.innerHTML = "-$0";
    document.getElementById("checkDiscount").style.opacity = 0;
  }
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    totalVal.innerHTML = `$${result}`;
  } else {
    totalVal.innerHTML = "$0";
  }
  if (category.value != "") {
    categoryVal.innerHTML = category.value.toLowerCase();
    document.getElementById("checkCategory").style.opacity = 1;
  } else {
    categoryVal.innerHTML = "#";
    document.getElementById("checkCategory").style.opacity = 0;
  }
  if (count.value > 1 && count.value <= 100) {
    countVal.innerHTML = `+${count.value}`;
  } else {
    countVal.innerHTML = "+";
  }
  if (
    title.value != "" &&
    price.value >= 1 &&
    taxes.value != "" &&
    ads.value != "" &&
    discount.value != "" &&
    category.value != "" &&
    count.value <= 100
  ) {
    if (mode === "create") {
      submit.innerHTML = '<i class="fa-solid fa-plus"></i> Create';
    } else if (mode === "update") {
      submit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Update';
    }
    submit.style = `
      opacity: 1;
    `;
  } else {
    submit.innerHTML = '<i class="fa-solid fa-lock"></i> ';
    submit.style = `
      opacity: 0.2;
    `;
  }
}

// ------------------------------
// create product and save localStorage
let dataProduct;
if (localStorage.product != null) {
  dataProduct = JSON.parse(localStorage.product);
} else {
  dataProduct = [];
}
// ------------------------------
submit.onclick = () => {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: totalVal.innerHTML,
    category: category.value.toLowerCase(),
    count: count.value,
  };
  // count
  if (
    count.value <= 100 &&
    mode === "create" &&
    title.value >= "" &&
    price.value != 1 &&
    taxes.value != "" &&
    ads.value != "" &&
    category.value != ""
  ) {
    if (count.value > 1) {
      for (let i = 0; i < count.value; i++) {
        dataProduct.push(newProduct);
      }
    } else {
      dataProduct.push(newProduct);
    }
    clearData();
  } else if (
    mode === "update" &&
    title.value != "" &&
    price.value >= 1 &&
    taxes.value != "" &&
    ads.value != "" &&
    category.value != ""
  ) {
    dataProduct[temp] = newProduct;
    mode = "create";
    count.style.display = "block";
    clearData();
    directing();
  }

  // save localStorage
  localStorage.product = JSON.stringify(dataProduct);
  getValues();
  showData();
};

// ------------------------------
// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  count.value = "";
  // ------------------------------
  titleVal.innerHTML = "#";
  priceVal.innerHTML = "$0";
  taxesVal.innerHTML = "$0";
  adsVal.innerHTML = "$0";
  discountVal.innerHTML = "-$0";
  totalVal.innerHTML = "$0";
  categoryVal.innerHTML = "#";
  countVal.innerHTML = "+";
}

// ------------------------------
// read data
function showData() {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataProduct[i].title}</td>
        <td>${dataProduct[i].price}</td>
        <td>${dataProduct[i].taxes}</td>
        <td>${dataProduct[i].ads}</td>
        <td>${dataProduct[i].discount}</td>
        <td>${dataProduct[i].total}</td>
        <td>${dataProduct[i].category}</td>
        <td>
          <button onclick="updateData(${i})" id="update" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
        </td>
        <td>
          <button onclick="deleteData(${i})" id="delete" ><i class="fa-solid fa-trash-can"></i> Delete</button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tbody").innerHTML = table;
  // delete All
  if (dataProduct.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
      <button onclick="deleteAll()"><i class="fa-solid fa-trash-can"></i> Delete All (${dataProduct.length})</button>
    `;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}
showData();

// ------------------------------
// delete -- and -- deleteAll
function deleteData(i) {
  dataProduct.splice(i, 1);
  localStorage.product = JSON.stringify(dataProduct);

  showData();
}
// ------------------------------
function deleteAll() {
  localStorage.clear();
  dataProduct.splice(0);
  showData();
}

// ------------------------------
// update
function updateData(i) {
  title.value = dataProduct[i].title;
  price.value = dataProduct[i].price;
  taxes.value = dataProduct[i].taxes;
  ads.value = dataProduct[i].ads;
  discount.value = dataProduct[i].discount;
  category.value = dataProduct[i].category;
  getValues();
  directing();
  count.style.display = "none";
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    discount.value != "" &&
    category.value != ""
  ) {
    submit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Update';
  }
  mode = "update";
  temp = i;
}

// ------------------------------
// search
function getSearchMode(id) {
  if (id == "searchTitle") {
    searchMode = "title";
  } else {
    searchMode = "category";
  }
  search.placeholder = "search by " + searchMode;
  search.value = "";
  search.focus();
  console.log(searchMode);
  showData();
}
// ------------------------------
function searchData(value) {
  let table = "";
  for (let i = 0; i < dataProduct.length; i++) {
    if (searchMode == "title") {
      if (dataProduct[i].title.includes(value.toLowerCase())) {
        table += `
          <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td>
              <button onclick="updateData(${i})" id="update" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
            </td>
            <td>
              <button onclick="deleteData(${i})" id="delete" ><i class="fa-solid fa-trash-can"></i> Delete</button>
            </td>
          </tr>
        `;
      }
    } else {
      if (dataProduct[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
          <td>${i + 1}</td>
          <td>${dataProduct[i].title}</td>
          <td>${dataProduct[i].price}</td>
          <td>${dataProduct[i].taxes}</td>
          <td>${dataProduct[i].ads}</td>
          <td>${dataProduct[i].discount}</td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category}</td>
          <td>
            <button onclick="updateData(${i})" id="update" ><i class="fa-solid fa-pen-to-square"></i> Update</button>
          </td>
          <td>
            <button onclick="deleteData(${i})" id="delete" ><i class="fa-solid fa-trash-can"></i> Delete</button>
          </td>
        </tr>
      `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
