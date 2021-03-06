// localStorage.setItem("card", "19,72");
// let products = localStorage.getItem("card")
// console.log(products)

// setTimeout(() => {
//     localStorage.removeItem("card")
// }, 5000)

// document.cookie = "cusername=Rasim; expires=Thu, 18 Dec 2022 02:00:00 UTC";

let str1 = "#product .card .card-body";
let st2 = "#product .card .card-body h5";
let row = document.querySelector(".row")
//console.log(row.innerHTML);
let titles = [...document.querySelectorAll(st2)];
//console.log(titles)
let titleList = [];
titles.forEach((title) => {
  titleList.push(title.innerText);
});

function realTime() {
  let keyword = document.getElementById("search").value;
  //   console.log(keyword);
  keyword = keyword.toUpperCase();
  let newlst = titleList.filter((item) => item.toUpperCase().includes(keyword));

  console.log(newlst);
  console.log(titles.map((item) => item.innerHTML));

  let endLst = [];
  newlst.forEach(
    (element) =>
      (endLst = [
        ...endLst,
        ...titles.filter((names) => names.innerHTML === element),
      ])
  );
  endLst=endLst.map((item) => item.parentElement.parentElement.parentElement);
  console.log(endLst);

  row.innerHTML = endLst.map(item=>item.innerHTML);
}

let addToCart = document.querySelectorAll("#product .card .card-body a");
let basketCount = document.getElementById("basketCount");
let cart2 = localStorage.getItem("cart");

if (!(cart2 == null || cart2 == "")) {
  basketCount.textContent = cart2.split(",").length;

  addToCart.forEach((item) => {
    let id = item.dataset.id;
    if (cart2.split(",").includes(id)) {
      item.classList.remove("btn-primary");
      item.classList.add("btn-success");
    }
  });
}

addToCart.forEach((prd) => {
  prd.addEventListener("click", function (e) {
    e.preventDefault();

    let id = this.dataset.id;
    let cart = localStorage.getItem("cart");

    if (cart == null || cart == "") {
      localStorage.setItem("cart", id);
      basketCount.textContent = 1;
      this.classList.remove("btn-primary");
      this.classList.add("btn-success");
    } else {
      let cartArr = cart.split(",");
      let isExist = cartArr.includes(id);
      if (!isExist) {
        localStorage.setItem("cart", cart + "," + id);
        basketCount.textContent = cartArr.length + 1;
        this.classList.remove("btn-primary");
        this.classList.add("btn-success");
      } else {
        let newCartArr = cartArr.filter((item) => item != id);
        localStorage.setItem("cart", newCartArr.join(","));
        basketCount.textContent =
          newCartArr.length > 0 ? newCartArr.length : "";
        this.classList.remove("btn-success");
        this.classList.add("btn-primary");
      }
    }
  });
});
