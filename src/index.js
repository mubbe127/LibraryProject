import "./style.css";

const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addform() {
  const bookform = document.querySelector(".bookform");
  bookform.classList.toggle("bookFormVisible");
  document.querySelector("#title").focus();
}

const bookFormButton = document.querySelector("#library");

bookFormButton.addEventListener("click", function (event) {
  addform();
  event.preventDefault();
});

bookFormButton.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default action for Enter key
  }
})

document
  .querySelector(".bookform1")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    if (addBook()) {
      document.querySelector(".bookform").classList.toggle("bookFormVisible");
    }
  });

function addBook() {
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let pages = document.getElementById("pages").value;
  let readInput = document.querySelector('input[value="yes"]:checked');
  let readInputNo = document.querySelector('input[value="no"]:checked');

  if (!title || !author || !pages || (!readInput && !readInputNo)) {
    alert("All fields must be filled out.");
    return false;
  }

  let read = readInput ? readInput.value : readInputNo.value;

  const book = new Book(title, author, pages, read);

  myLibrary.push(book);

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.querySelector('input[name="read"]:checked').checked = false;

  addBookToTable();

  return true;
}


const titleInput = document.getElementById('pages')



titleInput.addEventListener('submit', (event) => {
  console.log('Input event triggered');
  if (titleInput.validity.rangeOverflow) {
    titleInput.setCustomValidity("Antal sidor kan inte överskrida 5000");
  } else {
    titleInput.setCustomValidity(""); // Clear the custom validity message when the input is valid
  }
});

function addBookToTable() {
  const library = document.querySelector("#library");
  const newbook = document.querySelector(".newbook");
  library.innerHTML = "";
  library.appendChild(newbook);
  myLibrary.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("thecard");

    library.appendChild(card);

    for (const key in item) {
      if (typeof item[key] === "function") {
        continue;
      }

      if (item[key] === item.read) {
        const tooglediv = document.createElement("div");
        const tooglebutton = document.createElement("input");
        const readlabel = document.createElement("label");
        tooglediv.classList.add("tooglediv");
        tooglebutton.setAttribute("type", "checkbox");
        tooglebutton.classList.add = "toogleread";
        tooglebutton.setAttribute("id", "toogle");
        tooglebutton.checked = item.read === "yes";
        readlabel.setAttribute("class", "readlabel");
        readlabel.setAttribute("name", "toogle");
        readlabel.textContent = "read:";
        tooglediv.appendChild(readlabel);
        tooglediv.appendChild(tooglebutton);
        card.appendChild(tooglediv);

        continue;
      }

      const para = document.createElement("p");
      para.textContent = `${key}: ${item[key]}`;
      card.appendChild(para);
    }

    const removebutton = document.createElement("button");
    removebutton.textContent = "Remove";
    removebutton.classList.add("remove-button");
    card.appendChild(removebutton);

    removebutton.addEventListener("click", function removeBook() {
      myLibrary.splice(index, 1);
      addBookToTable();
    });
  });
}

const murcur = 1;
// Event listener for the button click
