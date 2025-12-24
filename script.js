function searchContent() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");
  let models = document.querySelectorAll(".model-list a");

  cards.forEach(card => {
    card.style.display = card.innerText.toLowerCase().includes(input)
      ? "block" : "none";
  });

  models.forEach(model => {
    model.style.display = model.innerText.toLowerCase().includes(input)
      ? "inline-block" : "none";
  });
}
