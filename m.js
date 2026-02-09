let phonebtn = document.getElementById('phonediv');
let phone = document.getElementById('phone');


phone.addEventListener('mouseenter', () => {
  phonebtn.style.display = "block";
});

phone.addEventListener('mouseleave', () => {
  phonebtn.style.display = "none";
});

