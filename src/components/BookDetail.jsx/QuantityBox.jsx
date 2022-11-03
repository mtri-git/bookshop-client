import React, { useRef } from 'react'

export default function QuantityBox({ className }) {
	const ref = useRef()
	const onIncrease = () => {
		ref.current.value++
	}
	const onDecrease = () => {
		if(ref.current.value > 0)
			ref.current.value--
	}
	
	return (
		<div className={className + ' p-2 text-center'}>
			<label className='pr-2'>Số lượng</label>
			<div className=' border inline-block justify-center w-20 px-2 text-xl'>
				<button className='float-right text-gray-600 font-bold' onClick={onIncrease}>+</button>
				<input className='w-3' defaultValue='1' ref={ref}/>
				<button className='float-left text-gray-600 font-bold' onClick={onDecrease}>-</button>
			</div>
		</div>
	)
}
