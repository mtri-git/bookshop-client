import React from 'react'
import { Link } from '../Link'

export default function DropDownMenuItem({ children, link, onClick }) {
	return (
		<Link
			to={link}
			role="menuitem"
			onClick={onClick}
			className="block w-full px-4 py-2 text-base text-gray-700 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors duration-150 text-center focus:bg-orange-100 focus:text-orange-700 focus:outline-none">
			{children}
		</Link>
	)
}
