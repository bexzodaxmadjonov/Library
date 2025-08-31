let myLibrary = [];
displayBooks()

function Book(author, title, pages, hasRead) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.hasRead = hasRead;
}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
}

function addBookToLibrary() {
    const author = document.getElementById("Author").value;
    const title = document.getElementById("Title").value;
    const pages = document.getElementById("Pages").value;
    const hasRead = document.getElementById("hasRead").checked;

    if (!author || !title || !pages) {
        alert("Please fill in all fields!");
        return;
    }

    const newBook = new Book(author, title, pages, hasRead);
    myLibrary.push(newBook);
    displayBooks();
    toggleForm();
    document.getElementById("Author").value = "";
    document.getElementById("Title").value = "";
    document.getElementById("Pages").value = "";
    document.getElementById("hasRead").checked = false;
}

function displayBooks() {
    const section = document.getElementById("bookList");
    section.innerHTML = "";

    if (myLibrary.length === 0) {
         return section.innerHTML += `<p class="placeholder">No books added yet. Click "Create a new book" to add one!</p>`
    }

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <p><strong>Status:</strong> ${book.hasRead ? "Read ✅" : "Not Read ❌"}</p>
        <button onclick="removeBook(${index})">Remove Book</button>
        <button onclick="changeStatus(${index})">${book.hasRead ? "Mark Unread" : "I've Read it"}</button>
    `;
        section.appendChild(bookCard);
    });
}

function toggleForm() {
    const form = document.getElementById("bookForm");
    form.style.display = form.style.display === "flex" ? "none" : "flex";
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}



changeStatus = (index) => {
    myLibrary[index].toggleRead();
    displayBooks();
}