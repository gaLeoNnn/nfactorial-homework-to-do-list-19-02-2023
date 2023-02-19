import './App.css';
import AppHeader from './components/app-header/app-header';
import AppList from './components/app-to-do/app-list';
import AppFooter from './components/app-footer/app-footer';
import { useState } from 'react';
import './modal.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 0, name: 'Write Essay', completed: false, deleted: false },
    {
      id: 1,
      name: 'One Hour CSS Course Online',
      completed: false,
      deleted: false
    },
    {
      id: 2,
      name: 'Buy One Way Tiekets to San Fransice',
      completed: false,
      deleted: false
    },
    {
      id: 3,
      name: 'Go to Gym',
      completed: false,
      deleted: false
    },
    {
      id: 4,
      name: 'Buy Groceries',
      completed: false,
      deleted: false
    }
  ]);



  return (
    <div className="App">
     <AppHeader/> 
      <AppList todos={todos} setTodos={setTodos}/>
      <AppFooter/>
    </div>
  );
}

export default App;
