import React from 'react'
import CartItem from '../components/CartItem'

export default function Cart() {
	return (
		//   <body>
		//   <div class="container p-8 mx-auto">
		//     <div class="w-full overflow-x-auto">
		//       <div class="my-2">
		//         <h3 class="text-xl font-bold tracking-wider">Giỏ hàng của bạn</h3>
		//       </div>
		//       <table class="w-full shadow-inner">
		//         <thead>
		//           <tr class="bg-gray-100">
		//             <th class="px-6 py-3 font-bold whitespace-nowrap">Sản phẩm</th>
		//             <th class="px-6 py-3 font-bold whitespace-nowrap">Số lượng</th>
		//             <th class="px-6 py-3 font-bold whitespace-nowrap">Giá</th>
		//             <th class="px-6 py-3 font-bold whitespace-nowrap">Xóa</th>
		//           </tr>
		//         </thead>
		//         <tbody>
		//           <tr>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">Iphone 11</td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <div>
		//                 <button class="px-2 py-0 shadow">-</button>
		//                 <input
		//                   type="text"
		//                   name="qty"
		//                   value="2"
		//                   class="w-12 text-center bg-gray-100 outline-none"
		//                 />
		//                 <button class="px-2 py-0 shadow">+</button>
		//               </div>
		//             </td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">41,000 đ</td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <button class="px-2 py-0 text-red-100 bg-red-600 rounded">
		//                 x
		//               </button>
		//             </td>
		//           </tr>
		//           <tr>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">Iphone 12</td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <div>
		//                 <button class="px-2 py-0 shadow">-</button>
		//                 <input
		//                   type="text"
		//                   name="qty"
		//                   value="1"
		//                   class="w-12 text-center bg-gray-100 outline-none"
		//                 />
		//                 <button class="px-2 py-0 shadow">+</button>
		//               </div>
		//             </td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">41,000 đ</td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <button class="px-2 py-0 text-red-100 bg-red-600 rounded">
		//                 x
		//               </button>
		//             </td>
		//           </tr>
		//           <tr>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">Iphone 13</td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <div>
		//                 <button class="px-2 py-0 shadow">-</button>
		//                 <input
		//                   type="text"
		//                   name="qty"
		//                   value="1"
		//                   class="w-12 text-center bg-gray-100 outline-none"
		//                 />
		//                 <button class="px-2 py-0 shadow">+</button>
		//               </div>
		//             </td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">41,000 đ</td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <button class="px-2 py-0 text-red-100 bg-red-600 rounded">
		//                 x
		//               </button>
		//             </td>
		//           </tr>
		//           <tr>
		//             <td class="p-4 px-6 text-center whitespace-nowrap"></td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <div class="font-bold">Total Qty - 4</div>
		//             </td>
		//             <td class="p-4 px-6 font-extrabold text-center whitespace-nowrap">
		//               Total - 40,00 (include tax)
		//             </td>
		//             <td class="p-4 px-6 text-center whitespace-nowrap">
		//               <button class="px-4 py-1 text-red-600 bg-red-100">
		//                 Clear All
		//               </button>
		//             </td>
		//           </tr>
		//         </tbody>
		//       </table>
		//       <div class="flex justify-end mt-4 space-x-2">
		//         <button
		//           class="
		//             px-6
		//             py-3
		//             text-sm text-gray-800
		//             bg-gray-200
		//             hover:bg-gray-400
		//           "
		//         >
		//           Cannel
		//         </button>
		//         <button
		//           class="
		//             px-6
		//             py-3
		//             text-sm text-white
		//             bg-indigo-500
		//             hover:bg-indigo-600
		//           "
		//         >
		//           Proceed to Checkout
		//         </button>
		//       </div>
		//     </div>
		//   </div>
		// </body>
		<main>
			<div className='border-2 my-2 mx-5 rounded font-normal'>
				<div className='flex gap-5 text-lg'>
					<div className='flex-initial w-2/6 text-right'><span>Sản phẩm</span></div>
					<div className='flex-initial text-right w-4/12'><span>Số lượng</span></div>
					<div className='flex-initial text-right pl-10'><span>Thành tiền</span></div>
				</div>
				<CartItem />
				<CartItem />
				<CartItem />
			</div>
			<div className='text-center'>
				<div className='p-4'>
					<span className='text-xl font-bold p-4 '>Thành tiền</span>
					<span className='text-xl font-bold text-red-600 p-4'>200.000đ</span>
				</div>
				<button className='bg-red-600 text-white text-xl px-5 py-2 rounded-xl w-10/12 m-5'>Thanh toán</button>
			</div>
		</main>
	)
}
