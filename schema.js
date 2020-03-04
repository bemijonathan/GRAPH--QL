const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = require('graphql');



// Students have many books
const Students = [
  { name: "jonathan", course: "Anatomy", amount: 40000, id: "1", booksID:["1", "2"] },
  { name: "Elizabeth", course: "Mcb", amount: 45000, id: "2", booksID:["3", "2"]  },
  { name: "jeffery", course: "BioChem", amount: 90000, id: "3", booksID:["3", "1"]  },
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
        // console.log(parent)
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
    book:{
      type: GraphQLList(BookType),
      resolve(parent, args){
        let result = []
        parent.booksID.forEach((e, i) => {
          if (e === Books[i].id){
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
    }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery
})