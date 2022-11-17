import { CART_LS } from "./src/constants/localStorageConstants"
import { getLocalStorage } from "./src/utils/localStorage"


const cart = getLocalStorage(CART_LS)
const increaseItem = cart.find((cartItem) => cartItem._id === productId)