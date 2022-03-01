import SurveyTwo from './components/SurveyTwo'
import SurveyThree from './components/SurveyThree'
import './style/style.scss'

function App() {
  return (
    <div className='col-md-4 col-12 mx-auto'>
      <div className='survey'>
        <SurveyTwo />
      </div>
      <br />
      <div className='survey mt-4'>
        <SurveyThree />
      </div>
    </div>
  )
}

export default App
