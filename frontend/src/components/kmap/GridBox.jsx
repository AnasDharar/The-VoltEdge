import React from 'react'

export const GridBox = ({value, index, onClick}) => {
  return (
    <div className='border rounded-sm flex flex-col items-center justify-center bg-white hover:bg-slate-100 cursor-pointer select-none' onClick={onClick}>
        <span className='text-md text-neutral-800'>{value}</span>
        <span className='text-[10px] text-slate-400'>{index}</span>
    </div>
  )
}
