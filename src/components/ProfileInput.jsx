import React from 'react'

export default function ProfileInput({ children, defaultValue, type, isEditable = false, onChange }) {
	return (
		<div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 py-2 w-full">
			<label className="w-full sm:w-1/4 font-semibold text-gray-700 text-left mb-1 sm:mb-0">{children}:</label>
			<input
				type={type}
				readOnly={!isEditable}
				className={`w-full sm:w-3/4 px-3 py-2 border ${isEditable ? 'border-orange-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200' : 'border-gray-300 bg-gray-100'} rounded-lg text-gray-800 transition-all duration-150 outline-none`}
				defaultValue={defaultValue}
				onChange={onChange}
			/>
		</div>
	)
}
