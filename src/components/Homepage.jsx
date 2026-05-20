import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import {useSelector} from 'react-redux'
const Homepage = () => {
    const [title,setTitle]=useState('');
    const [value,setValue]=useState('');
    const [searchParams,setSearchParams]=useSearchParams();
    const pasteId=searchParams.get("pasteId");
    const dispatch= useDispatch();
    const allPastes=useSelector((state)=> state.paste.pastes);


     useEffect(() => {
            if(pasteId){
                const paste =allPastes.find((p) => 
                p._id === pasteId);
                setTitle(paste.title);
                setValue(paste.content);
            }
        }, [pasteId])

        
    function createPaste(){
        const paste={
            title: title,
            content: value,
            _id:pasteId||
            Date.now().toString(36),
            createdAt: new Date().toISOString(),

        }

        

        if(pasteId){
            //update
            dispatch(updateToPastes(paste));
        }
        else{
            //create
            dispatch(addToPastes(paste));
        }

        //after creation or updation 
        setTitle('');
        setValue('');
        setSearchParams({});
    }

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
        <div className="flex flex-col gap-y-5 items-start ">
     <input
     className={`${
        pasteId ? "w-[80%]" : "w-[85%]"
     } text-black border border-input rounded-md p-2`}
        type='text'
        placeholder='enter title here'
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
     />


    <button 
    onClick={createPaste}
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
    font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 darl:bg-blue-600">
        {
            pasteId ? "Upadate My Paste" : "Create My Paste"
        }
    </button>

    {pasteId&& <button
    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300
    font-medium rounded-lg text-sem px-5 py-2.5 me-2 mb-2 dark:bg-blue-600
    dark:hover:bg-blue-700"
    
    >

        </button>}
    </div>

    <div className="">
        <textarea
        className="rounded-2xl mt-4, min-w-[500px] p-4 "
        value={value}
        placeholder="enter a content here"
        onChange={(e)=> setValue(e.target.value)}
        rows={20}
        
        />
    </div>
    </div>
  )
}

export default Homepage