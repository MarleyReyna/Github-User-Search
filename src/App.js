import {useState} from 'react';
import './App.css';
import Header from './Header/Header'
import Main from './Main/Main'

const App = () => {
  const [dark, setDark] = useState(false)

  return (
    <div className={dark ? 'App dark' : 'App'}>
      <Header 
      dark={dark}
      setDark={setDark}/>
      <Main 
      dark={dark}/>
    </div>
  );
}

export default App;
