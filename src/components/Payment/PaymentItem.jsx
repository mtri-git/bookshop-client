import React from 'react'
import { generatePath, Link } from 'react-router-dom';
import { BOOK_DETAIL_PATH } from '../../constants/path';
import { formatPrice } from '../../utils/format';

export default function PaymentItem({_id, imageUrl, title, price, quantity, sale}) {
  const path = generatePath(BOOK_DETAIL_PATH, {id: _id})
	return (
		<div className="flex flex-col sm:flex-row gap-3 sm:gap-7 items-center border-y rounded-lg p-2 w-full overflow-x-auto">
      <Link to={path} className="w-20 h-24 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
        <img src={imageUrl || 'https://c8.alamy.com/comp/ECTX75/south-africa-20-twenty-rand-bank-note-ECTX75.jpg'} className="object-contain w-full h-full" alt={title} />
      </Link>
      <Link to={path} className="flex-1 font-medium text-gray-800 text-sm sm:text-base break-words w-full">{title || "title"}</Link>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-center flex-1 w-full">
        <div className="text-red-500 font-bold text-sm sm:text-base">{formatPrice(price*(1-sale)) ||"50.000"}đ</div>
        <div className="line-through text-xs sm:text-sm text-gray-400">{formatPrice(price) || "80.000"} đ</div>
        <div className="text-xs sm:text-sm">x {quantity || 1}</div>
      </div>
      <div className="flex flex-col items-end min-w-[90px]">
        <div className="text-orange-500 font-bold text-sm sm:text-base">{formatPrice(price*quantity*(1-sale)) || "100.000"}đ</div>
        <div className="line-through text-xs sm:text-sm text-gray-400">{formatPrice(price*quantity) || "100.000"}đ</div>
      </div>
    </div>
	)
}
