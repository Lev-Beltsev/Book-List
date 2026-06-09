const books = [ 
    { 
        id: 1, 
        author: "Jack London",
        title: "Martin Iden",
        read: true
    },
    {
        id: 2, 
        author: "Jack London", 
        title: "Sea Wolf",
        read: false
    }
];

// LOCALSTORAGE 
function saveToLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

function loadFromLocalStorage() {
    const savedBooks = localStorage.getItem('books');
    if (savedBooks) {
        // Очищаем массив и добавляем сохранённые книги
        books.length = 0;
        const parsed = JSON.parse(savedBooks);
        parsed.forEach(book => books.push(book));
    }
}

// Загружаем сохранённые книги при старте
loadFromLocalStorage();

// Если ничего не сохранили — используем начальные данные и сохраняем их
if (books.length === 0) {
    books.push(
        { id: 1, author: "Jack London", title: "Martin Iden", read: true },
        { id: 2, author: "Jack London", title: "Sea Wolf", read: false }
    );
    saveToLocalStorage();
}

// ФУНКЦИЯ ГЕНЕРАЦИИ ID
function generateId() {
    if (books.length === 0) return 1;
    const maxId = Math.max(...books.map(book => book.id));
    return maxId + 1;
}

// ФУНКЦИЯ ДОБАВЛЕНИЯ КНИГИ 
function addBook(title, author) {
    if (!title.trim() || !author.trim()) return;
    
    const newBook = {
        id: generateId(),
        title: title.trim(),
        author: author.trim(),
        read: false
    };
    
    books.push(newBook);
    saveToLocalStorage();
    renderBooks();
}

function renderBooks() {
    const booksHTML = books.map(function(book) {
        // Тернарный оператор для класса read
        const readClass = book.read ? 'read' : '';
        
        return `
            <div class="book-card ${readClass}">
                <div class="book-info">
                    <h3>📖 ${book.title}</h3>
                    <p>✍️ ${book.author}</p>
                    ${book.read ? '<span class="read-badge">✓ Прочитана</span>' : ''}
                </div>
                <div class="book-actions">
                    <button class="toggle-read" data-id="${book.id}">
                        ${book.read ? '✅ Прочитана' : '📖 Читать'}
                    </button>
                    <button class="delete-btn" data-id="${book.id}">
                        🗑️ Удалить
                    </button>
                </div>
            </div>
        `;
    });
    
    console.log(booksHTML);
    
    const booksHTMLString = booksHTML.join('');
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = booksHTMLString;
    
    // ОБРАБОТЧИКИ СОБЫТИЙ 
    
    // Обработчики для кнопок "Читать / Прочитана"
    document.querySelectorAll('.toggle-read').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(this.dataset.id);
            toggleBookStatus(bookId);
        });
    });
    
    // Обработчики для кнопок "Удалить"
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', function() {
            const bookId = parseInt(button.dataset.id);
            deleteBook(bookId);
        });
    });
}

// ФУНКЦИИ ДЛЯ ИЗМЕНЕНИЯ ДАННЫХ

function toggleBookStatus(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.read = !book.read;
        saveToLocalStorage();
        renderBooks();
    }
}

function deleteBook(bookId) {
    books = books.filter(book => book.id !== bookId);
    saveToLocalStorage();
    renderBooks();
}

// ОБРАБОТЧИК ФОРМЫ 
const addBookForm = document.getElementById('addBookForm');
if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('bookTitle').value;
        const author = document.getElementById('bookAuthor').value;
        addBook(title, author);
        document.getElementById('bookTitle').value = '';
        document.getElementById('bookAuthor').value = '';
    });
}

//  ЗАПУСК
renderBooks();