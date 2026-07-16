import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <img src="https://images.pexels.com/photos/11593393/pexels-photo-11593393.jpeg" width="500" height="500"></img>
    <h1>Welcome to my website of ABES</h1>
    </div>
  )
}

export default App