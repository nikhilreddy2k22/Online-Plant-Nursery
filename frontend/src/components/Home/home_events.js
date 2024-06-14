export const changeimg = (id, event) => {
  event.preventDefault();
  let b = document.getElementById(id);
  let logo = b.querySelector("img");
  var h = document.getElementById("head");
  // console.log(logo.src);
  let sliderContainer = document.getElementById("slider");
  const path = "http://localhost:3000/icons/min.png";
  console.log(sliderContainer.style.display);

  if (logo.src !== path && sliderContainer.style.display === "") {
    logo.src = path;
    sliderContainer.style.display = "block";

    console.log(h.style.borderBottom);
    h.style.borderBottom = "none";
    console.log(logo.src);
  } else {
    logo.src = "http://localhost:3000/icons/plus.png";
    sliderContainer.style.display = "";

    console.log(h.style.borderBottom);
    h.style.borderBottom = "1px solid black";
  }
};

export const displayinout = (id, event) => {
  event.preventDefault();
  let b = document.getElementById(id);
  let logo = b.querySelector("img");
  // console.log(logo.src);
  let c = document.getElementById("cbbox");
  let head = document.getElementById("fil2");
  const path = "http://localhost:3000/icons/min.png";

  if (logo.src !== path && c.style.display === "") {
    logo.src = path;
    c.style.display = "block";
    head.style.borderBottom = "none";

    console.log(logo.src);
  } else {
    logo.src = "http://localhost:3000/icons/plus.png";
    c.style.display = "";
    head.style.borderBottom = "1px solid black";
  }
};
export const displaybloom = (id, event) => {
  event.preventDefault();
  let b = document.getElementById(id);
  let logo = b.querySelector("img");
  // console.log(logo.src);
  let c = document.getElementById("cbbox1");
  let head = document.getElementById("fil3");
  const path = "http://localhost:3000/icons/min.png";

  if (logo.src !== path && c.style.display === "") {
    logo.src = path;
    c.style.display = "block";
    head.style.borderBottom = "none";

    console.log(logo.src);
  } else {
    logo.src = "http://localhost:3000/icons/plus.png";
    c.style.display = "";
    head.style.borderBottom = "1px solid black";
  }
};
export const maintenance = (id, event) => {
  event.preventDefault();
  let b = document.getElementById(id);
  let logo = b.querySelector("img");
  // console.log(logo.src);
  let c = document.getElementById("cbbox2");
  let head = document.getElementById("fil4");
  const path = "http://localhost:3000/icons/min.png";

  if (logo.src !== path && c.style.display === "") {
    logo.src = path;
    c.style.display = "block";
    head.style.borderBottom = "none";

    console.log(logo.src);
  } else {
    logo.src = "http://localhost:3000/icons/plus.png";
    c.style.display = "";
    head.style.borderBottom = "1px solid black";
  }
};
export const watersched = (id, event) => {
  event.preventDefault();
  let b = document.getElementById(id);
  let logo = b.querySelector("img");
  // console.log(logo.src);
  let c = document.getElementById("cbbox3");

  const path = "http://localhost:3000/icons/min.png";

  if (logo.src !== path && c.style.display === "") {
    logo.src = path;
    c.style.display = "block";

    console.log(logo.src);
  } else {
    logo.src = "http://localhost:3000/icons/plus.png";
    c.style.display = "";
  }
};
export const clearall = (event) => {
  event.preventDefault();
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
};

export const getValue = (event) => {
  const slider = document.getElementById("priceRange");
  const output = document.getElementById("priceValue");
  output.innerHTML = "₹" + slider.value + " - ₹14999";
};
export const writeval = (event) => {
  const slider = document.getElementById("priceRange");
  const output = document.getElementById("priceValue");
  output.innerHTML = "₹" + slider.value + " - ₹14999";
};
export const menu = (event) => {
  event.preventDefault();
  let v = document.getElementById("sortmenu");
  if (v.style.display === "block") {
    v.style.display = "";
  } else {
    v.style.display = "block";
  }
};
