import { useState } from 'react'
import './App.css'
import { Button, Card, Elevation } from "@blueprintjs/core";
import MinimalChat from "./components/random/MinimalChat";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MinimalChat />
    </div>
  )
}

export default App
