// show formbook
const showOn = document.getElementById('addBook');
const showOff = document.getElementById('close');
const overlay = document.getElementById('formBook');

showOn.addEventListener('click', function () {
    overlay.style.display = 'flex';
});

showOff.addEventListener('click', function () {
    overlay.style.display = 'none';
});

// form submit
document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addBook();
        clear();

    });
});

// clear value
function clear() {
    document.getElementById('inputBookTitle').value = '';
    document.getElementById('inputBookAuthor').value = '';
    document.getElementById('inputBookYear').value = '';
    document.getElementById('inputBookCategory').value = '';
    document.getElementById('inputBookIsComplete').checked = false;
    overlay.style.display = 'none';
}

// var book
const books = [];
const RENDER_EVENT = 'render-book';

function generateId() {
    return +new Date();
};

// return book
function generateBookObject(id, title, author, year, category, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        category,
        isCompleted
    };
};

// render event
document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
});

document.addEventListener(RENDER_EVENT, () => {
    const unfinished = document.getElementById('incompleteBookshelfList');
    const finished = document.getElementById('completeBookshelfList');

    unfinished.innerHTML = '';
    finished.innerHTML = '';

    for (const book of books) {
        const bookElement = newBook(book);
        if (book.isCompleted) {
            finished.append(bookElement);
        } else {
            unfinished.append(bookElement);
        }
    }
})

// function to add book
function addBook() {
    const title = document.getElementById('inputBookTitle').value;
    const author = document.getElementById('inputBookAuthor').value;
    const year = document.getElementById('inputBookYear').value;
    const category = document.getElementById('inputBookCategory').value;
    const isCompleted = document.getElementById('inputBookIsComplete').checked;

    const generateID = generateId();
    const bookObject = generateBookObject(generateID, title, author, year, category, isCompleted);
    books.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
}

// function to create button edit and delete
function createButtonEditDelete() {
    const editIcon = document.createElement('i');
    editIcon.classList.add('bi');
    editIcon.classList.add('bi-pencil-square');

    const editButton = document.createElement('button');
    editButton.setAttribute('type', 'button');
    editButton.classList.add('edit');
    editButton.append(editIcon);

    editButton.addEventListener('click', function () {
        editBook(bookObject.id);
    });

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('bi');
    deleteIcon.classList.add('bi-trash-fill');

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('type', 'button');
    deleteButton.classList.add('delete');
    deleteButton.append(deleteIcon);

    deleteButton.addEventListener('click', function () {
        deleteBook(bookObject.id);
    });
}

// funtion to create a new book
function newBook(bookObject) {
    const img = document.createElement('img');
    if (bookObject.isCompleted) {
        img.setAttribute('src', 'assets/img/2.png');
    } else {
        img.setAttribute('src', 'assets/img/1.png');
    }

    // card image
    const cardImage = document.createElement('div');
    cardImage.classList.add('card-img');
    cardImage.append(img);

    // card-body>content
    const bookTitle = document.createElement('h3');
    bookTitle.innerText = bookObject.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.innerText = bookObject.author;

    const bookYear = document.createElement('p');
    bookYear.innerText = bookObject.year;

    const bookCategory = document.createElement('h4');
    bookCategory.innerText = bookObject.category;

    const content = document.createElement('div');
    content.classList.add('content');
    content.append(bookTitle, bookAuthor, bookYear, bookCategory);

    // card-body>action
    const action = document.createElement('div');
    action.classList.add('action');

    // card-body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.append(content, action);

    if (bookObject.isCompleted) {
        const undoIcon = document.createElement('i');
        undoIcon.classList.add('bi');
        undoIcon.classList.add('bi-arrow-clockwise');

        const undoButton = document.createElement('button');
        undoButton.setAttribute('type', 'button');
        undoButton.classList.add('undo');
        undoButton.append(undoIcon);

        undoButton.addEventListener('click', function () {
            addUnfinished(bookObject.id);
        });

        createButtonEditDelete();
        action.append(undoButton, editButton, deleteButton);

    } else {
        const doneIcon = document.createElement('i');
        doneIcon.classList.add('bi');
        doneIcon.classList.add('bi-check-circle');

        const doneButton = document.createElement('button');
        doneButton.setAttribute('type', 'button');
        doneButton.classList.add('done');
        doneButton.append(doneIcon);

        doneButton.addEventListener('click', function () {
            addfinished(bookObject.id);
        });

        createButtonEditDelete();
        action.append(doneButton, editButton, deleteButton);
    };

    const card = document.createElement('article');
    card.classList.add('card');
    card.append(cardImage, cardBody);

    return card;
};

// function to add unfinished book
function addUnfinished(bookId) {
    const bookTarget = findBook
}


// function to add finished book

