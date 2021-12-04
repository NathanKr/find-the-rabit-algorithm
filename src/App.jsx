import './App.css'
import FindTheRabbit from './FindTheRabbit'

function App() {

  return (
    <div className="App">
      <FindTheRabbit numHoles={10} initialRabbitPos={5} initialGuessPos={2} refreshRateHz={0.20}/>
    </div>
  )
}

export default App
