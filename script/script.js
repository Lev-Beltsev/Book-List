const books = [ 
    { 
        id: 1, 
        title: "Мартин Иден", 
        author: "Джек Лондон", 
        read: true
    }, 
    { 
        id: 2, 
        title: "Время не Ждёт", 
        author: "Джек Лондон", 
        read: true 
    }, 
    { 
        id: 3, 
        title: "Халявы Нет: Начало пути",
        author: "Амиран Сардаров",
        read: true
    },
    { 
        id: 4, 
        title: "Системное Мышление",
        author: "Анатолий Левенчук",
        read: true
    },

    { 
        id: 5, 
        title: "Образование для образованных",
        author: "Анатолий Левенчук",
        read: true
    },
    { 
        id: 6, 
        title: "Методология 2025",
        author: "Анатолий Левенчук",
        read: true
    },
    { 
        id: 7, 
        title: "Инженерия Личности",
        author: "Анатолий Левенчук",
        read: true
    },
    { 
        id: 8, 
        title: "Интеллект-стек",
        author: "Анатолий Левенчук",
        read: true

    },
    { 
        id: 9, 
        title: "Системный Менеджмент",
        author: "Анатолий Левенчук",
        read: true
        
    },
    { 
        id: 10, 
        title: "Системная Инженерия",
        author: "Анатолий Левенчук",
        read: true
        
    }
];

function renderBooks() { 
    const booksHTML = books.map(function(book) { 
      
        const readClass = book.read ? 'read' : '';
        
        return `
            <div class="book-card ${readClass}">
                <div class="book-info">
                    <h3>📖 ${book.title}</h3>
                    <p>✍️ ${book.author}</p>
                </div>
                <div class="book-actions">
                    <button class="toggle-read">✅ Прочитана</button>
                    <button class="delete-btn">🗑️ Удалить</button>
                </div>
            </div>
        `;
    });
    
    const booksHTMLString = booksHTML.join('');
    const booksList = document.getElementById('bookList');
    booksList.innerHTML = booksHTMLString;
}

renderBooks();