import { useState} from 'react'
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
  return (
    <>
      <h1>Express + MongoDB + React</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name : </label>
        <input type="text" name='name' placeholder='enter your name' onChange={handleChange} value={form.name}/><br />
        <label htmlFor="email">Email : </label>
        <input type="email" name="email" placeholder='enter your email' onChange={handleChange} value={form.email} /><br />
        <label htmlFor="age">Age : </label>
        <input type="number" name="age" placeholder='enter your age' onChange={handleChange} value={form.age}/><br />
        <button type="submit">Add User</button>
      </form>
      <h2>Users List</h2>
      <button onClick={fetchUsers}>Display</button>
      <ul>
        {users.map((user)=>(
          <li key={user._id}>{user.name} - {user.email} - {user.age}</li>
        ))}
      </ul>
    </>
  )
}

export default App
