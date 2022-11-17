import { useSelector } from "react-redux";

const getCart = (store) => store.cart

export const useSelectUser = () => useSelector(getCart)
