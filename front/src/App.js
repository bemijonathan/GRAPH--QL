import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
import List from './components/list'
import AddList from './components/addList'


const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
});


function App() {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        Student Burrow Apps
        <List/>
        <AddList/>
      </div>
    </ApolloProvider>
  );
}

export default App;
