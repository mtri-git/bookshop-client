import React from 'react'

export default function CategoryCard({ title, description }) {
	return (
		<div className='p-2 m-2 border rounded'>
			<h2 className='text-2xl font-bold'>{title}</h2>
			<p>{description}</p>
		</div>
	)
}
