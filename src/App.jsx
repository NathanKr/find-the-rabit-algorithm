import './App.css'
import FindTheRabbit from './FindTheRabbit'

function App() {

  return (
    <div className="App">
      <FindTheRabbit numHoles={10} initialRabbitPos={4} initialGuessPos={2} refreshRateHz={0.5}/>
    </div>
  )
}

export default App
