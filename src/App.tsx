import pie from './pie.svg'
import './App.css'
import Main from './Main'
function App() {

  return (
    <div className="App">
      <div className='header'>
        <p>Tap month name to add a new goal, <br/>
          drag & drop to reorganize your goals.</p>
          <p>Make goals short and to the point, <br/>so you'll remember them without the app too😎</p>
      </div>
      <div className='content'>
        <img src={pie} alt="pie" />
        <Main/>
      </div>
    </div>
  )
}

export default App;
