'use strict'

function onInit() {
    renderReadByQueryStringParams()
    renderFilterByQueryStringParams()
    renderBooksTable()
}

function renderBooksTable() {
    var books = getBooks()
    var strHtmls = books.map((book) => `
    <tr>
        <td>${book.id}</td>
        <td class="title">${book.title}</td>
        <td>${book.price}$</td>
        <td class="table-btns">
            <button onclick="onReadBook('${book.id}')" class="read-btn">Read</button>
            <button onclick="onUpdateBook('${book.id}')" class="update-btn">Update</button>
            <button onclick="onDeleteBook('${book.id}')" class="delete-btn">Delete</button>
        </td> 
    </tr>
    `)
    document.querySelector('tbody').innerHTML = strHtmls.join('')
}

function renderBooksCards() {
    var books = getBooks()
    var strHtmls = books.map((book) => `<div class="card">
        <img onerror="this.src='./pics/book.jfif'" src="./pics/${book.title}.jpg" alt="Avatar">
        <p><b>ID: ${book.id}</b></p>
        <p><b>Title: ${book.title}</b></p>
        <p><b>Price: ${book.price}</b></p>
        <button onclick="onReadBook('${book.id}')" class="read-btn">Read</button>
        <button onclick="onUpdateBook('${book.id}')" class="update-btn">Update</button>
        <button onclick="onDeleteBook('${book.id}')" class="delete-btn">Delete</button>
    </div>
    `)

    // console.log(strHtmls)
    document.querySelector('.books-cards-container').innerHTML = strHtmls.join('')
}

function onReadBook(bookId) {
    // console.log(bookId)
    var book = getBookById(bookId)
    // console.log(book)
    var elModal = document.querySelector('.modal')

    elModal.dataset.bookId = bookId
    elModal.querySelector('h3 span').innerText = book.title
    elModal.querySelector('h4 span').innerText = book.rate
    elModal.querySelector('h5 span').innerText = book.price
    elModal.querySelector('p').innerText = book.description
    elModal.classList.add('show-modal')
    document.querySelector('body').classList.toggle('fade')

    const queryStringParams = `?bookId=${bookId}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onUpdateBook(bookId) {
    // const newPrice = onUserUpdate()
    var newPrice = +prompt('Enter New Price', '5')
    if (!newPrice) return
    updateBook(bookId, newPrice)
    const elCheckBox = document.querySelector('.check-box')
    if (elCheckBox.checked) renderBooksCards()
    else renderBooksTable()

}

function onDeleteBook(bookId) {
    // Model
    deleteBook(bookId)

    // DOM
    const elCheckBox = document.querySelector('.check-box')
    if (elCheckBox.checked) renderBooksCards()
    else renderBooksTable()
}

function onAddBook() {
    var title = prompt('Enter Book Name?', 'Harry Potter')
    if (title) {
        addBook(title)
        const elCheckBox = document.querySelector('.check-box')
        if (elCheckBox.checked) renderBooksCards()
        else renderBooksTable()
    }
}

function onCloseModal() {
    var elModal = document.querySelector('.modal')
    elModal.classList.remove('show-modal')

    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function onRate(diff) {
    var elModal = document.querySelector('.modal')
    const book = rateBook(diff, elModal.dataset.bookId)
    elModal.querySelector('h4 span').innerText = book.rate
}


function onSetFilter(filterBy) {
    filterBy = setBookFilter(filterBy)

    setPageIdxOnFilter()
    renderButtons()
    // renderButtonsWhenFilter()

    const elCheckBox = document.querySelector('.check-box')
    if (elCheckBox.checked) renderBooksCards()
    else renderBooksTable()

    const queryStringParams = `?minRate=${filterBy.minRate}&maxPrice=${filterBy.maxPrice}&txt=${filterBy.txt}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}


function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const filterBy = {
        minRate: +queryStringParams.get('minRate') || 0,
        maxPrice: +queryStringParams.get('maxPrice') || 100,
        txt: queryStringParams.get('txt') || ''
    }


    if (filterBy.minRate || filterBy.maxPrice !== 100 || filterBy.txt) {
        document.querySelector('.filter-rate-range').value = filterBy.minRate
        document.querySelector('.filter-price-range').value = filterBy.maxPrice
        document.querySelector('.filter-txt').value = filterBy.txt
        setBookFilter(filterBy)
    }

    // else return
}

function renderReadByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const bookId = queryStringParams.get('bookId')

    if (bookId)
        onReadBook(bookId)
    else return
}


function onChangePage(diff) {
    renderButtons(changePage(diff))
    const elCheckBox = document.querySelector('.check-box')
    if (elCheckBox.checked) renderBooksCards()
    else renderBooksTable()
}

function renderButtons(currPage) {
    var elPrevBtn = document.querySelector('.perv-page-btn')
    var elNextBtn = document.querySelector('.next-page-btn')
    elPrevBtn.disabled = false
    elPrevBtn.classList.remove('btn-disable')
    elNextBtn.disabled = false
    elNextBtn.classList.remove('btn-disable')
console.log('currPage', currPage);
console.log('getNumOfPages()', getNumOfPages());
    if (currPage >= getNumOfPages() - 1) {
        elNextBtn.disabled = true
        elNextBtn.classList.add('btn-disable')
    }
     if (currPage <= 0) {
        elPrevBtn.disabled = true
        elPrevBtn.classList.add('btn-disable')
    }
}

function renderButtonsWhenFilter() {
    var elPrevBtn = document.querySelector('.perv-page-btn')
    var elNextBtn = document.querySelector('.next-page-btn')
    if (getNumOfPages() === 1) {
        elNextBtn.disabled = true
        elPrevBtn.disabled = true
        elNextBtn.classList.add('btn-disable')
        elPrevBtn.classList.add('btn-disable')
        return
    }
    else
        elNextBtn.disabled = false
        elPrevBtn.disabled = true
        elNextBtn.classList.remove('btn-disable')
        elPrevBtn.classList.add('btn-disable')
        
}

function onChangeMode(elCheckBox) {
    // console.log(elCheckBox.checked)
    const elCardsContainer = document.querySelector('.books-cards-container')
    const elTableContainer = document.querySelector('.books-table-container')
    if (elCheckBox.checked) {
        renderBooksCards()
        elCardsContainer.classList.add('show-cards')
        elTableContainer.classList.remove('show-table')
    }
    else {
        renderBooksTable()
        elTableContainer.classList.add('show-table')
        elCardsContainer.classList.remove('show-cards')
    }
}

function onSortBy(elTh){
    sortBy(elTh.innerText.toLowerCase())
    renderBooksTable()
}

function onUserUpdate(){
    const elUserInput = document.querySelector('.user-input')
    const userInput = elUserInput.value
    elUserInput.value = ''
    return userInput
}