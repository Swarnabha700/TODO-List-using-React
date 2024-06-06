import { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';



function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const saveTolS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  }, [])
  

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveTolS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id == id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos, todos)
    saveTolS()
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTolS()
  }
  
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveTolS()
  }
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-3 rounded-xl p-5 shadow-xl bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-xl'>iTodo - Manage your todos in one place</h1>
        <div className="addTodo my-3 flex flex-col gap-3">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='w-full rounded-lg p-2' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-950 text-sm transition-all duration-200 p-3 py-1 text-white rounded-md mx-5 disabled:bg-slate-500'>Add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> <font className="text-sm">Show Finished</font>
        <h1 className='text-lg font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.length == 0 && <div className='m-5 font-semibold text-lg'>No todos to display</div> }
          {todos.map(item => {
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:max-w-xl justify-between my-2">
            <div className='flex gap-5'>
            <input onChange={handleCheckbox} type="checkbox" checked={todo.isCompleted} name={item.id} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-700 hover:bg-violet-950 text-sm transition-all duration-200 p-3 py-1 text-white rounded-md mx-1'><FaEdit /></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-700 hover:bg-violet-950 text-sm transition-all duration-200 p-3 py-1 text-white rounded-md mx-1'><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
