"use client"
import { useRef, useState } from "react"
import "./about.module.css"
import { v4 as uuid } from "uuid";
import Stulist from "../Studlist";
export default function page(){
    const [firstname,setfirstname]=useState()
    const [lasttname,setlastname]=useState()
    const firstnamevalue=useRef('')
    const lastnamevalue=useRef('')
    const [list,setlist]=useState(Stulist)
    
    const idvalue=uuid();
    const sliceid=idvalue.slice(0,4)
    
    const formsubmit=(events)=>{
        events.preventDefault()
        list.push({id:sliceid,firstname:firstnamevalue.current.value,lastname:lastnamevalue.current.value})
        setfirstname('')
        setlastname('')
    }
    const handledelete=(id)=>{
    
        let deleteval=list.filter((value)=>value.id!=id)
        setlist(deleteval)

    }
    const handleEdit=(id)=>{
        let data=list[id]
        data.firstname="hello2"
        console.log(data)
        setlist([...list])
    }
    
    return (
        <div>
            
            <form onSubmit={formsubmit}>
                <input type="text" placeholder="Enter First Name"  onChange={(e)=>setfirstname(e.target.value)} ref={firstnamevalue} />
                <input type="text" placeholder="Enter Last Name" onChange={(e)=>setlastname(e.target.value)} ref={lastnamevalue} />
                <button type="submit">Sumbit</button>
            </form>
         
            <table>
                <thead>
                    <tr>

                    <th>Id</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Edit</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {list && list.length > 0 ? list.map((value,key)=>{
                        return (<tr key={key}>
                            <td>{value.id}</td>
                            <td>{value.firstname}</td>
                            <td>{value.lastname}</td>
                            <td><button type="button" onClick={()=>handleEdit(key)}>Edit</button></td>
                            <td><button type="button" onClick={()=>handledelete(value.id)}>Delete</button></td>
                            </tr>
                        )
                        
                    }):
                    <h1>No data found</h1>
                    
                    }
                   
                </tbody>
            </table>
           
        </div>
    )
}