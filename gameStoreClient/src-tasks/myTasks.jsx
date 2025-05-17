import { useState } from "react"
import { MyList } from "./myList"
import { MyTable } from "./myTable"
import { AddTask } from "./addTask"



export const MyTasks=()=>{
    const [arr, setarr]=useState([
        {id: 1, desc: "לנקות את החדר", done:false ,time:"15:00"},
        {id: 2, desc: "ללמוד למבחן", done:false ,time:"18:00"},
        {id: 3, desc: "לאפות עוגה", done:false ,time:"14:30"},
        {id: 4, desc: "לשטוף את הרצפה", done:true ,time:"12:15"},
        {id: 5, desc: "לקנות חלב", done:true ,time:"19:15"}]
    )

    const [isList,setIsList]=useState(false);
    const [isTable,setIsTable]=useState(false);

    const len=arr.length

    const changeStatus=(index,status)=>{
        let y=[...arr]
        y[index].done=!status
        setarr(y)
    }

    const add=(e, addItem)=>{
        e.preventDefault()
        setarr(x=>x.concat({...addItem,id:arr.length+1}))
    }

    const del=(id)=>{
        let y=arr.filter(x=>x.id!=id)
        setarr(y)
    }

    return <>
    <button style={{margin:"2rem"}} class="btn btn-secondary" onClick={()=>{setIsList(true);setIsTable(false)}}>רשימה</button>
    <button class="btn btn-secondary" onClick={()=>{setIsTable(true); setIsList(false)}}>טבלה</button>
    <AddTask  toAdd={add}></AddTask>
    {isList&&<MyList arr={arr} myClick={changeStatus} onDel={del}></MyList>}
    {isTable&&<MyTable arr={arr} myClick={changeStatus} onDel={del}></MyTable>}
    </>
}

