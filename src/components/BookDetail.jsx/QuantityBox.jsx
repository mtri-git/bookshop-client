import React from 'react'

export default function QuantityBox({ className }) {
	return (
		<div className={className + ' p-2'}>
			<label className='pr-2'>Số lượng</label>
			<div className='border inline-block justify-center w-20 px-2'>
				<button className='float-left'>+</button>
				<input className='w-3' value='1' />
				<button className='float-right'>-</button>
			</div>
		</div>
	)
}
