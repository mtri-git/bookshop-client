import api from "../constants/api";

const bookService = {
    getBook(data){
        return api.get('/book')
    },
    getBookById(data){
        return api.get(`/book/${data}`)
    },
    searchBook(data){
        return api.get(`/book/search?q=${data}`)
    }
}

export default bookService