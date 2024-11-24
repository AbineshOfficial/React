import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  TextField ,
  
} from "@mui/material";
import BrowserUpdatedRoundedIcon from '@mui/icons-material/BrowserUpdatedRounded';
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded';
const CrudApp = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [editingTask,setEditingTask] = useState(null)
    const [updateName,setUpdateName] = useState('')
    const [updateEmail,setUpdateEmail] = useState('')
    // Get user Data
    useEffect(()=>{
        const fetchData = async () => {
          try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data)
            console.log(response.data);
          }catch(error){
            console.log(error);
          }
        }
        fetchData()
    },[])
    // Add User using POST Method
    const addUser  = async (e) => {
        e.preventDefault()
        const newName = name.trim()
        const newEmail = email.trim()
       try {
        const data = await fetch('https://jsonplaceholder.typicode.com/users',{
          method:'POST',
          headers: {
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({id:Date.now(),username:newName,email:newEmail})
      })
      const res = await data.json()
      setUsers([...users, res])
      console.log(response);
       } catch (error) {
        console.log(error);
       }
    }
    // Editable
    const enableEdit = (user) => {
      setEditingTask(user.id),
      setUpdateName(user.username),
      setUpdateEmail(user.email)
    }
    const updateUser = async (id) => {
      try {
        const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`,{
          username:updateName,
          email:updateEmail
        })
        setUsers(users.map((user)=> user.id === id ? {...user,username:res.data.username,email:res.data.email} : user))
        setEditingTask(null)
      } catch (error) {
        console.log(error);
        
      }
    }
    const deletUser =async (id) => {
      try {
         await fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
          method:'DELETE'
        })
        setUsers(users.filter(user => user.id !== id))
      } catch (error) {
        console.log(error);
        
      }
    }
  return (
    <>
      <h1>CRUD APP</h1>
      <Box sx={{width:{xs:'100%',sm:'50%'},margin:'auto'}}>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Update</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                    {users.map((user) => (
                <TableBody key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        {editingTask === user.id ? (
                         <TableCell> 
                          <TextField
                            variant="outlined"
                            value={updateName}
                            onChange={(e)=>setUpdateName(e.target.value)}
                       /></TableCell>
                        ) :<TableCell onClick={()=>enableEdit(user)}>{user.username}</TableCell>}
                      {editingTask === user.id ? (
                        <TableCell> 
                        <TextField
                          variant="outlined"
                          value={updateEmail}
                          onChange={(e)=>setUpdateEmail(e.target.value)}
                     /></TableCell>
                      ):  <TableCell onClick={() => enableEdit(user)}>{user.email}</TableCell>}
                       
                        <TableCell><Button onClick={()=>updateUser(user.id)}><BrowserUpdatedRoundedIcon/></Button></TableCell>
                        <TableCell><Button color="error" onClick={()=>deletUser(user.id)}><DeleteSweepRoundedIcon/></Button></TableCell>
                </TableBody>
                    ))}
            </Table>
        </TableContainer>

       <Box sx={{marginTop:'20px',marginBottom:'50px',display:'flex', alignItems:'center', justifyContent:'center', gap:'30px'}}>
       <TextField id="outlined-basic" label="UserName" name="username" variant="outlined" value={name} onChange={(e) => setName(e.target.value)}/>
       <TextField id="outlined-basic" label="Email" name="email" variant="outlined" value={email} onChange={(e)=>setEmail(e.target.value)} />
       <Button variant="contained" onClick={addUser} sx={{padding:'15px 30px'}}>Add Name</Button>
       </Box>
      </Box>
    </>
  );
};

export default CrudApp;
