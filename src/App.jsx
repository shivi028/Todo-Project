import { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import {FaEdit} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

useEffect(()=>{
  let todostr = localStorage.getItem('todos')
  if(todostr){
    let todos = JSON.parse(localStorage.getItem('todos'));
    setTodos(todos)
  }
}, [])

  const save = (parans)=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const handle_edit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)

    let newTodos= todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)

    save()
  }

  const handle_del = (e, id) => {
    let newTodos= todos.filter(item=>{
      return item.id !== id;
    });
    setTodos(newTodos)
    save()
  }

  const handle_add = () => {
    setTodos([...todos, {id:uuidv4(), todo, isCompleted: false }])
    setTodo('')
    save()
  }

  const handle_change = (e) => {
    setTodo(e.target.value)
  }

  const handle_check = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos= [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    save()
  }

  const toggleFinished = (e) =>{
    setshowFinished(!showFinished)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]">

        <h1 className='font-bold text-center text-2xl'>iTask - Manage your todos at one place</h1>
        <div className="addtodo my-3 flex flex-col ">
          <h2 className='text-xl font-bold'>Add a Todo</h2>

          <div className='flex gap-1'>
          <input onChange={handle_change} value={todo} type="text" className='w-full my-3 rounded-lg px-4 py-1 font-medium' />
          <button onClick={handle_add} disabled={todo.length<=3} className='bg-violet-700 hover:bg-violet-900  p-4 py-1 mx-2 my-3 text-white  font-bold disabled:bg-slate-400 rounded-full'>Save</button>
          </div>
         
        </div>

        <input type='checkbox' onChange={toggleFinished} checked={showFinished} className='cursor-pointer my-2'/> Show Finished
        <div className='h-[1px] bg-black opacity-15 mx-auto my-2'></div>

        <h2 className='text-xl font-bold my-1'>Your Todo's</h2>

        <div className='todos'>
          {todos.length === 0 && <div className='m-4'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className='todo flex my-3 justify-between '>
              <div className='flex gap-5'>
              <input name={item.id} onChange={handle_check} type="checkbox" checked={item.isCompleted} id="" />
              <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>

              <div className="button flex h-full">
                <button onClick={(e)=>handle_edit(e, item.id)} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-2 font-bold'><FaEdit/></button>
                <button onClick={(e)=>{handle_del(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-2 font-bold'> <AiFillDelete/> </button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
