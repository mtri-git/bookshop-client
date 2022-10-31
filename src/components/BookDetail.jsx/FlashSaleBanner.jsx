import React from "react";
import CountDown from "./CountDown";
import QuantityBox from "./QuantityBox";

export default function FlashSaleBanner() {
  return (
    <div className="flash-sale">
      <div className="flashsale-product">
        <div className="flash-sale-banner">
          <img src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/flashsale/label-flashsale.svg?q=101564" />
          <CountDown />
        </div>
        <div className="flash-sale-last">
          <div className="progress-bar" style={{ width: "20%" }}></div>
          <div className="flashsale-progress-value">Đã bán: 10</div>
        </div>
      </div>
      <div className="price-box-block">
        <div className="price-box pb-2">
          <span className="special m-2 text-3xl text-red-600 font-bold"> 35.000đ</span>
          <span className="old m-2 line-through"> 35.000đ</span>
          <span className="discount m-2 p-0.5 text-center bg-red-500 text-white font-bold rounded">-40%</span>
        </div>
      </div>
      <QuantityBox />
      <div className="message-error">Hết hàng</div>
      <div className="butto-handle">
        <button className=" border border-red-600 m-3">
          Thêm vào giỏ hàng
        </button>
        <button className="bg-red-500 m-3">Mua ngay</button>
      </div>
    </div>
  );
}
