import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import CartItem from '../components/CartItem/CartItem';
import { formatPrice } from '../utils/format';
import { HOME_PATH, PAYMENT_PATH } from '../constants/path';
import { useCart } from '../redux/selectors/useCart';

export default function Cart() {
  const cart = useCart();
  const navigate = useNavigate();

  const checkoutItems = cart.cart.filter(cartItem => cartItem.checked);
  
  const totalWithSale = checkoutItems.reduce(
    (acc, cartItem) =>
      acc + (1 - cartItem.sale) * cartItem.price * cartItem.count,
    0
  );
  
  const total = cart.cart.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.count,
    0
  );

  const handlePayment = () => {
    navigate(PAYMENT_PATH);
  };

  const handleCheckItem = (productId) => {
    // checkItemInCart function needs to be implemented or imported
    console.log('Check item:', productId);
  };

  if (!cart.cart.length) {
    return (
      <main className="m-auto bg-white rounded-xl min-h-screen px-2 sm:px-4 py-4">
        <div className="p-10 m-auto w-fit text-center">
          <div className="p-2">Chưa có sản phẩm nào</div>
          <img 
            className="p-2 max-w-[180px] mx-auto" 
            src="/icons/ico_emptycart.svg" 
            alt="Empty cart"
          />
          <Link to={HOME_PATH}>
            <div className="p-2 border-2 border-orange-600 rounded-lg text-orange-700 hover:bg-orange-500 hover:text-white active:bg-orange-600 transition-colors">
              Mua ngay
            </div>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="m-auto bg-white rounded-xl min-h-screen px-2 sm:px-4 py-4">
      <div className="mx-auto my-5 font-normal text-xl max-w-3xl w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 text-base sm:text-lg rounded-xl border bg-gray-50">
          <div className="flex-1 text-center sm:text-right p-3 sm:p-5 font-semibold">
            Sản phẩm
          </div>
          <div className="flex-1 text-center sm:text-right p-3 sm:p-5 font-semibold">
            Số lượng
          </div>
          <div className="flex-1 text-center sm:text-right p-3 sm:p-5 font-semibold">
            Thành tiền
          </div>
        </div>

        {/* Cart Items */}
        <div className="border rounded-xl mt-5 bg-white">
          {cart.cart.map((cartItem) => (
            <CartItem key={uuidv4()} {...cartItem} />
          ))}
        </div>
      </div>

      {/* Checkout Section */}
      <div className="text-center max-w-3xl w-full mx-auto">
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-lg sm:text-xl font-bold">Thành tiền</span>
          <span className="text-lg sm:text-xl font-bold text-red-600">
            {formatPrice(totalWithSale)} đ
          </span>
          <span className="text-base sm:text-lg line-through font-bold text-gray-600">
            {formatPrice(total)} đ
          </span>
        </div>

        {checkoutItems.length > 0 ? (
          <button
            className="bg-red-600 text-white text-lg sm:text-xl px-5 py-2 rounded-xl w-full m-2 sm:m-5 hover:bg-red-700 transition-colors"
            onClick={handlePayment}
          >
            Thanh toán
          </button>
        ) : (
          <button
            className="bg-gray-300 text-white text-lg sm:text-xl cursor-not-allowed px-5 py-2 rounded-xl w-full m-2 sm:m-5"
            disabled
          >
            Thanh toán
          </button>
        )}
      </div>
    </main>
  );
}