import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { TRASH, GALKA, PLUS, VECTOR } from '../images/images.js';

import './app-trash.css';

export default function AppList({ todos, setTodos }) {
  const tabs = [
    {
      id: 1,
      text: 'To do'
    },
    {
      id: 2,
      text: 'Done'
    },
    {
      id: 3,
      text: 'Trash'
    }
  ];



  const [activeTabId, setActiveTabId] = useState(1);
  const [popup, setPopup] = useState({ todoId: null, visible: false });

  // ADD TASKS FROM MODAL WINDOW
  const [input, setInput] = useState('');
  const onChangeTodoTitle = (e) => {
    setInput(e.target.value);
  };

  const onCreateTodo = () => {
    const newTodo = {
      id: uuid(),
      name: input,
      completed: false,
      deleted: false
    };

    setTodos([...todos, newTodo]);
    setInput('');
    setModalBig(false);
  };

  // Modal Window OPEN
  const [modalBig, setModalBig] = useState(false);

  const toggleModal = () => {
    setModalBig(!modalBig);
  };

  const onCompleteTodo = (id) => {
    const newTodoList = todos.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );

    setTodos(newTodoList);
  };

  
  const filteredTodos = todos.filter((item) => {
    // All todos
    if (activeTabId === 1) return !item.deleted;

    // finished todos
    if (activeTabId === 2) return !item.deleted && item.completed;

    // Deleted todos
    if (activeTabId === 3) return item.deleted;
  });

  const onMoveToTrash = (id) => {
    let newTodos;

    if (activeTabId !== 3) {
      // Move to trash
      newTodos = todos.map((item) => (item.id === id ? { ...item, deleted: true } : item));
    } else {
      // Delete forever
      newTodos = todos.filter((item) => item.id !== id);
    }

    setTodos(newTodos);
  };

  const onMoveBackToList = (id) => {
    const newTodos = todos.map((item) => (item.id === id ? { ...item, deleted: false } : item));
    setTodos(newTodos);
  };


  const onVisible = (id) => {
    
  }

  return (
    <div className='mainDiv'>
      <div className='buttons'>
        <div>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className='buttons__list'
              style={{ backgroundColor: activeTabId === tab.id ? '#666D71' : '' }}
              onClick={() => {
                setActiveTabId(tab.id);
                setPopup({ todoId: null, visible: false });
              }}
            >
              {tab.text}
            </button>
          ))}
        </div>
        <div className='modalDiv'>
          <button className='plus' onClick={toggleModal}>
            <img src={PLUS} alt='' />
          </button>
          {modalBig && (
            <div className='modal'>
              <p style={{ fontWeight: 700, marginTop: 16, marginLeft: 16 }}>Add New To Do</p>
              <input
                type='text'
                className='modal__input'
                placeholder='Your text'
                value={input}
                onChange={onChangeTodoTitle}
              />
              <button onClick={onCreateTodo} className='modal__button'>
                Add
              </button>
            </div>
          )}
        </div>
      </div>
      <h3 className='text'>{tabs[activeTabId - 1].text}</h3>
      <div className='divider'></div>

      <div className='mainToDo'>
        {filteredTodos.map((item) => (
          <div key={item.id} className='checkbox'>
            <div>
              <button
                style={{ border: 'none', cursor: 'pointer' }}
                onClick={() => {
                  if (popup.visible && popup.todoId === item.id) {
                    return setPopup({ todoId: null, visible: false });
                  }

                  setPopup({ todoId: item.id, visible: true });
                }}
              >
                <img className='checkbox__img' src={VECTOR} alt='' />
              </button>
              <button
                className='smallModal'
                style={{ display: popup.visible && item.id === popup.todoId ? 'block' : 'none' }}
                onClick={() => {
                  setPopup({ todoId: null, visible: false });
                }}
              >
                <div class='btn__group'>
                  <div className='btn__item' onClick={() => onMoveToTrash(item.id)}>
                    <img src={TRASH} alt='' />
                    {activeTabId === 3 ? <span>Delete forever</span> : <span>Move to trash</span>}
                  </div>
                  <div
                    className='btn__item'
                    style={{ display: activeTabId === 3 ? 'flex' : 'none' }}
                    onClick={() => onMoveBackToList(item.id)}
                  >
                    <img src={GALKA} alt='' />
                    <span>Move back to To Do</span>
                  </div>
                </div>
              </button>
            </div>
            <input
              type='checkbox'
              className='checkbox__input'
              checked={item.completed}
              onChange={() => onCompleteTodo(item.id)}
            />
            <p className={item.completed ? 'line' : ''}>{item.name} </p>
          </div>
        ))}
      </div>
    </div>
  );
}
