import './App.css'
import FindTheRabbit from './FindTheRabbit'

function App() {

  return (
    <div className="App">
      <FindTheRabbit initialRabbitPos={6} refreshRateHz={0.5}/>
    </div>
  )
}

export default App
