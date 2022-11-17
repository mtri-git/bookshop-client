import React from 'react'

export default function ProfileInput({children, defaultValue}) {
	return (
		<div className='flex p-2 justify-center '>
			<label className='px-2 w-1/12'>{children}: </label>
			<input className='px-2 w-2/12 border border-gray-500 rounded-sm' defaultValue={defaultValue}/>
		</div>
	)
}
