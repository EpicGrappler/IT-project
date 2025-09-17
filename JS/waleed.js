setTimeout(() => {
  document.querySelector(".loader").style.display = "none";
  document.querySelector("#mainco").style.display = "block";
  document.body.classList.remove("loading");
}, 1000);
