import React, { useState } from 'react'

export default function CustomDialog({title="Title", content="content", onClick, open=false}) {

    const onClose = () => {
        document.getElementById("dialog").style.display = "none"
    }
  return (
    <div id="dialog" className='fixed pt-36 left-0 top-0 bg-gray-600/60 w-full h-full z-10' style={{display:open ? "block":"none"}}>
        <div className='bg-white top-0 w-6/12 mx-auto p-5 border rounded-lg'>
        <span onClick={onClose} className='float-right cursor-pointer'>&times;</span>
        <h1 className='text-lg font-semibold text-orange-600'>{title}</h1>
        <p>{content}</p>
        <div className='pt-2 text-center'>
        <button onClick={onClick} className='px-5 text-red-500 font-bold'>Tiếp tục</button>
        <button onClick={onClose} className='px-5 font-bold'>Hủy</button>
        </div>
        </div>
    </div>
  )
}
