import { useState ,useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { RiDeleteBinLine } from "react-icons/ri";
import { LiaEdit } from "react-icons/lia";
import { FaPlus } from "react-icons/fa";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = (params) =>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const handleEdit = (e,id) => { 
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    }); 
    setTodos(newTodos) 
    saveToLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleDelete = (e,id) => {
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }
  
  const handleChange = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    console.log(e, e.target)
    let id = e.target.name;
    // console.log(`The id is ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
    // console.log(newTodos, todos)
  }
  
  
  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto rounded-lg bg-slate-300 my-8 min-h-[80vh] p-8 md:w-[38%]">
        <div className="addTodo my-2">
          <h2 className='font-semibold text-xl'>Add a new task</h2>
          <div className='space-x-2 flex my-2'>
            <input onChange={handleChange}  value={todo} placeholder="What's plan for today?" type="text" className='w-full p-2' />
            <button onClick={handleAdd} disabled={todo.length<=3} className='cursor-pointer font-medium bg-[#1571b2] py-2 px-3 text-white disabled:bg-blue-800'><FaPlus /></button>
          </div>
        </div>
        <input type="checkbox" onChange={toggleFinished} checked={showFinished} id="show"/>Show finished
          <div className='h-[2px] bg-gray-400 w-[90%] mx-auto my-4'></div>
          <h2 className='font-semibold text-xl'>Your tasks</h2>
          <div className="todoCard">
            {todos.length === 0 && <div className='m-5'>No task to show</div> }
          {todos.map(item=>{

            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex w-full my-3 justify-between'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-[#1b93d1] hover:bg-cyan-600 p-2 text-sm font-bold text-white rounded-md mx-2 '><LiaEdit /></button>
                <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-red-500 hover:bg-red-700  p-2 text-sm font-bold text-white  mx-2 '><RiDeleteBinLine /></button>
              </div> 
            </div>
          })}
          </div>
      </div>
    </>
    )
}

export default App
