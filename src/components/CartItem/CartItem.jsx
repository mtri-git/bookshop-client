import React from 'react';
import { useDispatch } from 'react-redux';

import QuantityBox from '../BookDetail.jsx/QuantityBox';
import { formatPrice } from '../../utils/format';
import { checkItemInCart, removeFromCart } from '../../redux/actions/cartAction';

export default function CartItem({
  _id,
  thumbnailUrl,
  title,
  price,
  sale,
  count,
  checked = false
}) {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(_id));
  };

  const handleCheckChange = () => {
    dispatch(checkItemInCart(_id));
  };

  const discountedPrice = price * (1 - sale);
  const totalPrice = discountedPrice * count;
  const truncatedTitle = title.length > 41 ? `${title.slice(0, 40)}...` : title;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Mobile Layout */}
      <div className="block sm:hidden p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <input
            type="checkbox"
            className="accent-red-500 w-4 h-4 mt-1 cursor-pointer flex-shrink-0"
            checked={checked}
            onChange={handleCheckChange}
            aria-label={`Select ${title}`}
          />
          
          {/* Product Image */}
          <div className="w-20 h-20 flex-shrink-0">
            <img
              className="w-full h-full object-contain rounded-lg"
              src={thumbnailUrl}
              alt={title}
            />
          </div>
          
          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 leading-tight mb-2">
              {truncatedTitle}
            </h3>
            
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold text-red-600">
                {formatPrice(discountedPrice)} đ
              </span>
              {sale > 0 && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(price)} đ
                </span>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QuantityBox
                  product_id={_id}
                  count={count}
                  className="scale-90"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold text-red-500">
                  {formatPrice(totalPrice)} đ
                </div>
                <button
                  onClick={handleRemoveFromCart}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={`Remove ${title} from cart`}
                >
                  <img
                    className="w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
                    src="/icons/trashcan-icon.svg"
                    alt="Remove item"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center py-4 px-6 gap-6">
        {/* Checkbox */}
        <div className="flex-shrink-0">
          <input
            type="checkbox"
            className="accent-red-500 w-5 h-5 cursor-pointer"
            checked={checked}
            onChange={handleCheckChange}
            aria-label={`Select ${title}`}
          />
        </div>

        {/* Product Image */}
        <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
          <img
            className="max-w-full max-h-full object-contain"
            src={thumbnailUrl}
            alt={title}
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="text-lg font-medium text-gray-900 leading-tight mb-3">
            {truncatedTitle}
          </h3>
          
          <div className="space-y-1">
            <div className="text-xl font-semibold text-red-600">
              {formatPrice(discountedPrice)} đ
            </div>
            {sale > 0 && (
              <div className="text-sm text-gray-500 line-through">
                {formatPrice(price)} đ
              </div>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex-shrink-0">
          <QuantityBox
            product_id={_id}
            count={count}
          />
        </div>

        {/* Total Price */}
        <div className="flex-shrink-0 text-right min-w-[120px]">
          <div className="text-lg font-bold text-red-500">
            {formatPrice(totalPrice)} đ
          </div>
        </div>

        {/* Remove Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleRemoveFromCart}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
            aria-label={`Remove ${title} from cart`}
          >
            <img
              className="w-6 h-6 group-hover:opacity-70 transition-opacity"
              src="/icons/trashcan-icon.svg"
              alt="Remove item"
            />
          </button>
        </div>
      </div>
    </div>
  );
}