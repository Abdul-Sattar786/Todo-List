import { useState } from "react";

export function Todos(){
    const [input, setInput]=useState("");
    const [todos, setTodos]=useState([]);
    const [editItemId, setEditItemId]=useState(null)
    const [displayAdd, setDisplayAdd]=useState(true)
    const [search, setSearch]=useState("")
    const [currentPage, setCurrentPage]=useState(1)
    // const [enableButton, setEnabaleButton]=useState(false)

    const searching=todos.filter((event)=>event.title.includes(search))
    
    const rowsPerPage=5
    const arrayLength=todos.length
    const ceiling=Math.ceil(arrayLength/rowsPerPage)

    const isFirstPage=currentPage===1
    const isLastPage=currentPage===ceiling

    const currentPageData=searching.slice(
        currentPage*rowsPerPage-rowsPerPage,
        currentPage*rowsPerPage
    )
    
    const pageNumber=(event)=>{
        setCurrentPage(event)
    }
    function handleSubmit(event){
        event.preventDefault()

        if(displayAdd){
        const newItem={id: new Date().getTime(), title: input, complete: false}
        setTodos([...todos, newItem])
    }else{
        // when click on update button the array should be updated with the the edited item placed in its original place
        // for that we need to use splice method
        // and for that we need findindex method
        // to proceed we need to id of the item
        // everything will be done in a duplicate copy of array
        console.log("called")
        const updateArray=[...todos]
        const selectedItem=updateArray.find((item)=>item.id===editItemId)
        selectedItem.title=input
        const indexForUpdate=updateArray.findIndex((item)=>item.id===editItemId)
        updateArray.splice(indexForUpdate,1,selectedItem)
        setTodos(updateArray)
        setDisplayAdd(true)
    }
        setInput("")
    }
            function handleEdit(id){
            // by clicking on edit button item should be found and selected with the help of id
            // then input should show the selected item
            // set the id of item that is being edited in setEditItemId
            // and at last display update button instead of add button
            const selectedItem=todos.find((item)=>item.id===id)
            setInput(selectedItem.title)
            setEditItemId(id)
            setDisplayAdd(false)
        }
        const handleCheck=(id)=>{
            // Step 1, find item in question
            const selectedItem=todos.find((item)=>item.id===id)
            // Update it's complete property
            selectedItem.complete = !selectedItem.complete
            console.log(selectedItem)
            // Update array and replace new item with old one
            const checkboxArray=[...todos]
            const indexForCheckbox=checkboxArray.findIndex((item)=>item.id===id)
            checkboxArray.splice(indexForCheckbox,1,selectedItem)

            // Call updater function to handle state change of array
            setTodos(checkboxArray)
        }
        const handleDelete=(id)=>{
            const newArray=todos.filter((item)=>item.id !== id)
            setTodos(newArray)

        }
        const handleInput=(event)=>{
            setInput(event.target.value)
        }
        const handleSearch=(event)=>{
            setSearch(event.target.value)
        }
         const handleFirstButton=()=>{
            pageNumber(1)
         }
         const handleNextButton=()=>{
            pageNumber(currentPage+1)
         }
         const handlePrevButton=()=>{
            pageNumber(currentPage-1)
         }
         const handleLastButton=()=>{
            pageNumber(ceiling)
         }
    return(
        <div className="container">

        <div>
            <form onSubmit={handleSubmit}>
                <input className="input" type='search' placeholder="search" value={search} onChange={(event)=>handleSearch(event)}/>
                <br></br>
                <br></br>
                <label className="label" htmlFor="item">ENTER YOUR ITEM </label>
                <input className="input" id="item" type='text' value={input} onChange={(event)=>handleInput(event)}/>
                {displayAdd ? <button className="button" type="submit">Add</button>:<button className="button" type="submit">Update</button>}
            </form>
            </div>
            <div>
            <ul>
            <table className="table">
            <thead>
                <tr className="heading">
                    <th>CHECK BOX</th>
                    <th>TITLE</th>
                    <th>ACTION BUTTONS</th>
                    <th>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                {currentPageData.map((x)=>{
                    return(
                        <tr key={x.id} >
                            <td><input type='checkbox' checked={x.complete}  onChange={()=>handleCheck(x.id)}/></td>
                            <td style={{textDecoration: x.complete ? "line-through": null}}>{x.title}</td>
                            <td>
                            <button className="button" onClick={()=>handleEdit(x.id)}>Edit</button>
                            <button className="button" onClick={()=>handleDelete(x.id)}>Delete</button>
                            </td>
                            <td>{x.complete ? "true":"false"}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </ul>

            <button className="button" disabled={isFirstPage} onClick={()=>handleFirstButton()}>First</button>
            <button className="button" disabled={isLastPage} onClick={()=>handleNextButton()}>Next</button>
            <button className="button" disabled={isFirstPage} onClick={()=>handlePrevButton()}>Previous</button>
            <button className="button" disabled={isLastPage} onClick={()=>handleLastButton()}>Last</button>

        </div>

        </div>
    )
}