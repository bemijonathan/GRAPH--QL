import React, {useState} from "react"


const AddList = () => {

// let result = gql`
//   mutation{
//     addBooks(name:${form.name}, genre:${form.genre}, StudentIds:${form.StudentIds}){
//       name
//       id
//       genre
//     }
//   }
//   `


  const [form, setstate] = useState({
    name:"",
    genre:"",
    StudentIds:""
  })

  const change = (e) => {
    let name = e.target.name
    let value = e.target.value
    setstate(prevstate => {
      return {...prevstate, [name]:value }
    })
  }

  const submit = (e) => {
    e.preventDefault()
  }
  // const { loading, error, data } = useQuery(result)
  return(
    <div>
      {/* <Mutation mutation={ADD_TODO}> */}

      <form onSubmit={submit}>
        <input name="name" placeholder="book name" onInput = {(e) => change(e)}/><br/>
        <input name="genre" placeholder="genre" onInput = {(e) => change(e)} /><br/>
        <input name="StudentIds" placeholder="2" onInput = {(e) => change(e)} /><br/>
        <button>Submit</button>
      </form>
      {/* </Mutation> */}
    </div>
  )
}

export default AddList

