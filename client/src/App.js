import logo from './logo.svg';
import './App.css';

import FileChoose from './screens/FileChoose'
import Main from './screens/Main'
import{
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
 
import React,{
  Component
} from 'react'
class App extends Component {
  render() {
    return ( 
      <div className="App" >
        <Router>
          <Route path="/" component={FileChoose} exact ></Route>
          <Route path="/main" component={Main} ></Route>
        </Router> 
      </div>
    )
  }
}

export default App;
