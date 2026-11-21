import React from 'react'

// Builds the page list with ellipses, e.g. 1 … 4 5 6 … 20
function getPages(current, total, siblings = 1) {
	const pages = []
	const start = Math.max(2, current - siblings)
	const end = Math.min(total - 1, current + siblings)
	pages.push(1)
	if (start > 2) pages.push('start-ellipsis')
	for (let p = start; p <= end; p++) pages.push(p)
	if (end < total - 1) pages.push('end-ellipsis')
	if (total > 1) pages.push(total)
	return pages
}

const baseBtn =
	'min-w-9 h-9 px-3 inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors'

export default function Pagination({ current, totalPage, onChange }) {
	if (totalPage <= 1) return null

	const go = (page) => {
		if (page >= 1 && page <= totalPage && page !== current) onChange(page)
	}

	return (
		<nav aria-label='Phân trang' className='flex items-center gap-1.5'>
			<button
				type='button'
				onClick={() => go(current - 1)}
				disabled={current === 1}
				aria-label='Trang trước'
				className={`${baseBtn} border border-gray-200 bg-white text-gray-600 hover:border-orange-500 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600`}>
				‹
			</button>
			{getPages(current, totalPage).map((page) =>
				typeof page === 'string' ? (
					<span key={page} className='px-1 text-gray-400'>
						…
					</span>
				) : (
					<button
						key={page}
						type='button'
						onClick={() => go(page)}
						aria-current={page === current ? 'page' : undefined}
						className={`${baseBtn} ${
							page === current
								? 'bg-orange-500 text-white shadow-sm'
								: 'border border-gray-200 bg-white text-gray-700 hover:border-orange-500 hover:text-orange-500'
						}`}>
						{page}
					</button>
				)
			)}
			<button
				type='button'
				onClick={() => go(current + 1)}
				disabled={current === totalPage}
				aria-label='Trang sau'
				className={`${baseBtn} border border-gray-200 bg-white text-gray-600 hover:border-orange-500 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-600`}>
				›
			</button>
		</nav>
	)
}
