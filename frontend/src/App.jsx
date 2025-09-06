import { useState,useEffect} from 'react'
import axios from 'axios';
function App() {

  const [users,setUsers]=useState([]);
  const [form,setForm] = useState({
    name:"",
    email:"",
    age:""
  });
  const fetchUsers = async () =>{
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    }catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  const handleChange = (e) =>{
    setForm({...form,[e.target.name]:e.target.value});
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:5000/users',form);
      console.log("User added:",res.data);
      setForm({name:"",email:"",age:""});
      fetchUsers();
    }catch(error){

      console.error("Error adding user:",error);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []); 
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-black h-full">
        <h1 className='text-green-500 text-5xl m-5 p-5'>Express + MongoDB + React</h1>
        <form onSubmit={handleSubmit} className='bg-sky-400 min-h-0.5 w-2/3 m-5 p-5 text-2xl flex flex-col items-center justify-between '>
          <div>
          <label htmlFor="name" className='text-orange-600 m-5 p-5 bg-transparent hover:text-orange-700 text-3xl'>Full Name : </label>
          <input type="text" name='name' placeholder='enter your name' onChange={handleChange} value={form.name} required className='bg-gray-500 p-5 m-5 w-auto h-4'/><br />
          </div>
          <div>
            <label htmlFor="email" className='text-orange-600 m-5 p-5 bg-transparent hover:text-orange-700 text-3xl'>Email : </label>
            <input type="email" name="email" placeholder='enter your email' onChange={handleChange} value={form.email} required className='bg-gray-500 p-5 m-5 w-auto h-4' /><br />
          </div>
          <div>
            <label htmlFor="age" className='text-orange-600 m-5 p-5 bg-transparent hover:text-orange-700 text-3xl'>Age : </label>
            <input type="number" name="age" placeholder='enter your age' onChange={handleChange} value={form.age} required className='bg-gray-500 p-5 m-5 w-auto h-4'/><br />
          </div>
          <button type="submit" className='m-3 p-3 bg-green-400 rounded-xl hover:bg-green-500 hover:rounded-full hover:ease-linear'>Add User</button>
          <div id='error'></div>
        </form>
      </div>
      <div className='flex flex-col items-center justify-center bg-black'>
        <h2 className='text-4xl text-red-500'>Users List</h2>
        <button onClick={fetchUsers} className='bg-indigo-500 m-3 p-3 w-auto h-auto rounded-lg'>Display</button>
        <div className='flex flex-wrap items-center justify-center m-5 p-5 '>
          {users.map((user)=>(
            <div className='bg-slate-400 m-4 p-4 rounded-xl font-mono'>
                <h3 className='text-3xl font-bold text-blue-500 hover:text-indigo-600'>Name : {user.name}</h3>
                <h4 className='text-xl font-semibold hover:text-black'>Email : {user.email}</h4>
                <h4 className='text-lg font-medium hover:text-black'>Age : {user.age}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
