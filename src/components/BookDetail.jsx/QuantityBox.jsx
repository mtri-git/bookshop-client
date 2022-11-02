import React from 'react'

export default function QuantityBox({ className }) {
	return (
		<div className={className + ' p-2 text-center'}>
			<label className='pr-2'>Số lượng</label>
			<div className=' border inline-block justify-center w-20 px-2 text-xl'>
				<button className='float-left text-gray-600 font-bold'>+</button>
				<input className='w-3' value='1' />
				<button className='float-right text-gray-600 font-bold'>-</button>
			</div>
		</div>
	)
}
