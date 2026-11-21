import React, { useMemo, useRef, useState } from 'react'
import { Parser } from 'html-to-react'

const parser = new Parser()

export default function DescriptionBox({ content }) {
	const [isExpand, setIsExpand] = useState(false)
	const boxRef = useRef(null)
	const parsed = useMemo(() => parser.parse(content || ''), [content])

	const collapse = () => {
		setIsExpand(false)
		boxRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
	}

	return (
		<div ref={boxRef} className='scroll-mt-20'>
			<div
				className={`description whitespace-pre-line text-sm leading-relaxed text-gray-700 ${
					isExpand ? '' : 'line-clamp-6'
				}`}>
				{parsed}
			</div>
			<div className='mt-3 text-center'>
				<button
					type='button'
					onClick={isExpand ? collapse : () => setIsExpand(true)}
					className='inline-flex items-center gap-1 rounded-lg border border-orange-300 px-4 py-1.5 text-sm font-medium text-orange-600 transition-colors hover:border-orange-600 hover:bg-orange-600 hover:text-white'>
					{isExpand ? 'Thu gọn' : 'Xem thêm'}
				</button>
			</div>
		</div>
	)
}
