import { useState } from 'react'

import './App.css'
// import UserListFetch from './components/UserListFetch'
import UserListFetch from './components/UserListAxios'
function App() {

  return (
    <>
     <UserListFetch/>
    </>
  )
}

export default App
