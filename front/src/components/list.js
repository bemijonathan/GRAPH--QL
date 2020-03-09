import React from 'react'
import { gql } from "apollo-boost";
import {useQuery } from '@apollo/react-hooks'

let result = gql`
{
  books {
    name
    genre
    id
  }
}
`


const List = function (params) {

const { loading, error, data } = useQuery(result)

console.log(loading, error, data)

const list = () => data.books.map(e => {
  return (
    <div key={e.id}>
      {e.name}: {e.genre}
    </div>
  )
})

  return(
    <div>
      List
      {data? list() : ''}
    </div>
  )
}


export default List