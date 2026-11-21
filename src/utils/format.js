// Vietnamese money format: 22500 -> "22.500" (append " đ" at call site)
const formatPrice = (value) => Math.round(Number(value) || 0).toLocaleString('vi-VN')

export {formatPrice}