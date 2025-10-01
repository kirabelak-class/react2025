// import { useState } from 'react'

import './App.css'
// import UserListFetch from './components/UserListFetch'
// import UserListFetch from './components/UserListAxios'
import Pokedex from './components/poke/Pokedex'
import {QueryClient,QueryClientProvider} from "@tanstack/react-query"

const client = new QueryClient({
  defaultOptions:{
    queries:{
      retry:1,
      refetchOnWindowFocus:true
    }
  }
})

function App() {

  return (
    <QueryClientProvider client={client}>
     {/* <UserListFetch/> */}
     <Pokedex/>
    </QueryClientProvider>
  )
}

export default App
