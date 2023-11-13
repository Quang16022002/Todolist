import { useEffect, useState } from "react";
import React, { useReducer, useRef } from 'react';


// 1. useState
                      
// function App() {

//   const [counter, setCouter] = useState(1) //bài toán bắt đầu đếm từ số 1
//   const handleIncrease = () => {
//     setCouter(prevState => prevState+1)
//     setCouter(prevState => prevState+1)
    
//   }
//   return (
//     <div className="App" style={{padding: 30}}>
//      <h1>{counter}</h1>
//      <button onClick={handleIncrease}>Increase</button>
//     </div>
//   );
// }
// function App() {
//   const [cars, setCars] = useState(['Bugatti   ', 'Roll-Royce    ', 'Maybach    ']);
  
//   const handleUpdate = () => {
//        setCars((prevState) => {
//             return [...prevState, 'Lamborghini']
//        })
//   }

//   console.log(cars) // Output: ?

//   return (
//       <div>
//           <h1>{cars}</h1>
//           <button onClick={handleUpdate}>Update</button>
//       </div>
//   )
// }



// 2. Two-way binding trong React?
// const gifts = [
//   'CPU i9',
//   'RAM 16g',
//   'keybroad'
// ]

// function App () {
  
//   const[gift, setGift] = useState()

//  const randomgif =() => {
//   const index = Math.floor(Math.random()* gifts.length)
//   setGift(gifts[index])
//  }


//   return(
//     <div style={{padding:50}}>
//       <h1>{gift || 'chưa có phần thưởng'}</h1>
//       <button onClick={randomgif}>Lấy phần thưởng</button>
//     </div>
//   )
// }


// 3 todolist 



//1. Init state: 0
const initState = {
  task: '',
  todoList: []
}

//2. Actions
const SET_TASK = 'set_task'
const ADD_TASK = 'add_task'
const DEL_TASK = 'del_task'
const EDIT_TASK = 'edit_task'
const CLEAR_LIST = 'clear_list'


// convert actions to functions
const setTask = payload => {
  return {
    type: SET_TASK,
    payload
  }
}
const addTask = payload => {
  return {
    type: ADD_TASK,
    payload
  }
}
const delTask = payload => {
  return {
    type: DEL_TASK,
    payload
  }
}
const editTask = payload => {
  return {
    type: EDIT_TASK,
    payload
  }
}
const clearList = payload => {
  return {
    type: CLEAR_LIST,
    payload
  }
}


//3. Reducer (switch cases)
const reducer = (state, action) => {
  console.log('Action: ', action)
  console.log('Prev State: ', state)

  let newState;

  switch (action.type) {
    case SET_TASK:
      newState = {
        ...state, 
        task: action.payload
      }
      break

    case ADD_TASK:
      newState = {
        ...state,
        todoList: [...state.todoList, action.payload]
      }
      break

    case DEL_TASK: {
      const newTodoList = [...state.todoList]
      newTodoList.splice(action.payload, 1)
      newState = {
        ...state,
        todoList: newTodoList
      }
    }
      break

    case EDIT_TASK: {
      const updatedTask = [...state.todoList]
      updatedTask[action.payload.index] = action.payload.value
      newState = {
        ...state,
        todoList: updatedTask
      }
    }
      break

    case CLEAR_LIST:
      newState = {
        ...state,
        todoList: []
      }
      break

    default:
      throw new Error ("Invalid action type")
  }

  console.log('New State: ', newState)

  return newState
}

//4. Dispatch (kích hoạt 1 action)


function App() {
  const [state, dispatch] = useReducer(reducer, initState)
  const {task, todoList} = state

  const [editIndex, setEditIndex] = useState(null)
  const [editValue, setEditValue] = useState('')

  const inputRef = useRef()

  const handleSubmit = () => {
    if(task !== '') { 
      dispatch(addTask(task))
      dispatch(setTask(''))
  
      inputRef.current.focus()
    }
  }
  
  const handleEdit = (index, value) => {
    dispatch(editTask({index, value}))
    setEditIndex(null)
    setEditValue('')
  }
  
  
  return (
    <div style={{ padding: 50 }} className="main">

      <h1> Todo App </h1>

      <input 
          ref={inputRef}
          value={task}
          placeholder="Enter a task..." 
          onChange={e => {
            dispatch(setTask(e.target.value))
          }}
          onKeyUp={e => e.code === "Enter" && handleSubmit()}
      />

      <button className="Add" onClick={handleSubmit}> Add </button>
      
      <ul>
        {todoList.map((task, index) => (
          <li key={index}>
            {editIndex === index ? (
              <>
                <input className="a"
                  type="text"
                  defaultValue={task}
                  onChange={e => {
                    setEditValue(e.target.value)
                  }} 
                />

                <button style={{ marginLeft:3}}
                  onClick={() => handleEdit(index, editValue)}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {task}

                <button style={{width:40, marginLeft:10, marginRight:5}} className="x" onClick={() => {
                    dispatch(delTask(index))
                  }}
                >
                  X
                </button>

                <button className="E"
                  onClick={() => setEditIndex(index)}
                > 
                  Edit 
                </button>

              </>
            )}
          </li>
        ))}
         
      </ul>

        {todoList.length >= 1 && (
          <button className="" style={{height:25}}
            onClick={() => dispatch(clearList())}
          >
            Clear all
          </button>
        )}
      
    </div>
  )
}

export default App;
