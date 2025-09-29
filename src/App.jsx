import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './components/Intro'
import Portfolio from  './components/Portfolio'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Resume from './components/Resume'

function App() {

  
  return (
    <Router>
    {/* all relevant sections */}
		<div className="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-300 min-h-screen font-inter">
			<div className="max-w-5xl w-11/12 mx-auto">
        <Navbar/>
        <div className="pt-16 text-stone-900 bg-stone-100 dark:text-stone-100 dark:bg-stone-900">
          <Routes>
              <Route path="/" element={
                <div>
                  <Intro/>
                  <Timeline/>
                </div>
              }/>
              <Route path="/resume" element={<Resume/>} />
              <Route path="/projects" element={<Portfolio />} />
              {/* <Route path="/contact" element={<Contact/>} /> */}
              <Route path="*" element={<div className="text-center py-20"><h1 className="text-3xl font-bold">404 - No such page exists yet :( </h1></div>} />
          </Routes>
          <Footer/>
        </div>
      </div>
    </div>
    </Router>
  )
}

export default App
