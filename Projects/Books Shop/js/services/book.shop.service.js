'use strict'

const STORAGE_KEY = 'booksDB'
const gTitles = ['harry potter', 'programming 101', 'learn to cook', 'moby dick', 'catch-22']
const PAGE_SIZE = 5

var gBooks
var gPageIdx = 0

var gFilterBy = { minRate: 0, maxPrice: 100, txt: '' }

var gBooksFilteredLength
// var gFilters = {minRate: 0, maxPrice: 100 }
// const gFilters = ['Max Price' , 'Min Rate']


_createBooks()

function getBooks() {
    var books = gBooks.filter(book => book.rate >= gFilterBy.minRate && book.price <= gFilterBy.maxPrice
        && book.title.toLowerCase().includes(gFilterBy.txt.toLowerCase()))

    const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}

// function getFilters(){
//     return gFilters
// }

function _createBook(title, price = getRandomIntInclusive(1, 100)) {
    return {
        id: makeId(),
        title,
        price,
        description: makeLorem(),
        rate: getRandomIntInclusive(0, 10)
    }
}

function _createBooks() {
    // elImg.src = `/imgs/${book.id}.jpg`
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (var i = 0; i < 20; i++) {
            var title = gTitles[(getRandomIntInclusive(0, gTitles.length - 1))]
            books.push(_createBook(title))
        }
    }

    gBooks = books
    saveToStorage(STORAGE_KEY, gBooks)
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function addBook(title) {
    const book = _createBook(title)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
}

function getBookById(bookId) {
    const book = gBooks.find((book) => book.id === bookId)
    return book
}

function updateBook(bookId, newPrice) {
    const book = getBookById(bookId)
    book.price = newPrice
    _saveBooksToStorage()
}

function deleteBook(bookId) {
    const bookIdx = gBooks.findIndex((book) => book.id === bookId)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()
}

function rateBook(diff, bookId) {
    // console.log(diff, bookId)
    const book = getBookById(bookId)
    if (book.rate < 10 && diff === 1 || book.rate > 0 && diff === -1) {
        book.rate += diff
        _saveBooksToStorage()
    }
    return book
}
//why do i need empty object and not just filter by
function setBookFilter(filterBy = {}) {
    //when will it ever be undefined?
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt

    return gFilterBy
}

function changePage(diff) {
    if(getNumOfPages() <= gPageIdx){
        console.log('hi')
        return gPageIdx
    }
    if (gPageIdx * PAGE_SIZE < gBooks.length && diff === 1 || gPageIdx > 0 && diff === -1){
        gPageIdx += diff
        return gPageIdx
    }
}

function getNumOfPages(){
    return Math.ceil(getFilteredBooksLength() / PAGE_SIZE)
}

function getCurrPageIdx(){
    return gPageIdx
}

function setPageIdxOnFilter(){
    gPageIdx = 0
}

function getFilteredBooksLength() {
    return gBooks.filter(book => book.rate >= gFilterBy.minRate && book.price <= gFilterBy.maxPrice
        && book.title.toLowerCase().includes(gFilterBy.txt.toLowerCase())).length
}

function sortBy(header){
    if(header === 'price')  gBooks.sort((a, b) => b.price - a.price)
    else    gBooks.sort((a, b) => a[header].localeCompare(b[header]))
}