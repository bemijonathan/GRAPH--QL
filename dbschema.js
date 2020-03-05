

class Book {
  constructor(name,genre,StudentIds, id){
    this.name = name
    this.genre = genre
    this.StudentIds = StudentIds
    this.id = id
  }
}


class StudentsM {
  constructor(name,course, amount, id){
    this.name = name 
    this.course = course
    this.amount = amount
    this.id = id
    this.booksID = []
  }
  addBook(book){
    this.booksID.push(book)
  }
}

module.exports = {
  Book, StudentsM
}