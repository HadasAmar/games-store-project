import { useState } from "react"

export const AddTask=(props)=>{

    const [newitem, setNewItem]=useState({})
    
    return <form onSubmit={(e)=>props.toAdd(e,newitem)} style={{direction:"rtl", display:"flex", gap:"2rem", justifyContent:"center"}}>
        <input type="desc" placeholder="תיאור" onBlur={(e)=>setNewItem({...newitem, desc:e.target.value})}/>
        <input type="checkbox" onChange={(e)=>setNewItem({...newitem, done:e.target.checked})}/>
        <input type="time"  onBlur={(e)=>setNewItem({...newitem, time:e.target.value})}/>
        <button type="submit">הוסף</button>
    </form>
}