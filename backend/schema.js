const { GraphQLObjectType, GraphQLString, GraphQLSchema,GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');
const { Book, StudentsM } = require("./dbschema")


// Students have many books
const Students = [
  { name: "jonathan", course: "Anatomy", amount: 40000, id: "1", booksID: ["1", "2"] },
  { name: "Elizabeth", course: "Mcb", amount: 45000, id: "2", booksID: ["3", "2"] },
  { name: "jeffery", course: "BioChem", amount: 90000, id: "3", booksID: ["3", "1"] },
]


// books belongs to students
const Books = [
  { name: "book 1", genre: "Novel", id: '1', StudentIds: "1", },
  { name: "book 2", genre: "Novel", id: '2', StudentIds: "1", },
  { name: "book 3", genre: "Books", id: '3', StudentIds: "2", },
]


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    genre: { type: GraphQLString },
    name: { type: GraphQLString },
    student: {
      type: StudentType,
      resolve(parent, arg) {
        return Students.find(e => {
          return parent.StudentIds === e.id
        })
      }
    }
  })
})

const StudentType = new GraphQLObjectType({
  name: 'Students',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    course: { type: GraphQLString },
    amount: { type: GraphQLInt },
    book: {
      type: GraphQLList(BookType),
      resolve(parent, args) {
        let result = []
        parent.booksID.forEach((e, i) => {
          if (e === Books[i].id) {
            result.push(Books[i])
          }
        });
        return result
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args
        return Books.find(e => {
          return e.id === id
        })
      }
    },
    student: {
      type: StudentType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const { id } = args
        return Students.find(e => {
          return e.id === id
        })
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve() {
        return Books
      }
    },
    students: {
      type: GraphQLList(StudentType),
      resolve() {
        return Students
      }
    }
  }
})


const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        name: { type: new GraphQLNonNull (GraphQLString) },
        course: { type: new GraphQLNonNull (GraphQLString) },
        amount: { type: new GraphQLNonNull (GraphQLString) }
      },
      resolve(parent, args) {
        const { name, course, amount } = args
        let id = Students.length + 1
        let student = new StudentsM(name, course, amount, id);
        Students.push(student)
        return student
      }
    },
    addBooks:{
      type: BookType,
      args:{
        name:{ type: GraphQLString}, 
        genre:{type: GraphQLString}, 
        StudentIds:{type:GraphQLString },
      },
      resolve(parent, args){
        const {name, genre, StudentIds} = args
        let id = Books.length + 1
        let book = new Book(name, genre, StudentIds, id)
        Books.push(book)
        return book
      }
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})