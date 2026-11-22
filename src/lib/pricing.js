// Preview of the order pricing rules. The API (bookshop-api/src/utils/pricing.js)
// is the source of truth and re-prices every order; keep both files in sync.
export const STANDARD_SHIPPING_FEE = 25000
export const FREESHIP_THRESHOLD = 150000

export const VOUCHERS = {
	BOOK10K: { code: 'BOOK10K', type: 'amount', value: 10000, label: 'Giảm 10.000 đ' },
	FREESHIP: { code: 'FREESHIP', type: 'shipping', label: 'Miễn phí vận chuyển' },
}

export const findVoucher = (code) => {
	if (typeof code !== 'string') return null
	return VOUCHERS[code.trim().toUpperCase()] || null
}

export const unitPrice = (item) => Math.round((item.price || 0) * (1 - (item.sale || 0)))

export function priceCart(items, voucherCode) {
	const subtotalOriginal = items.reduce((acc, item) => acc + (item.price || 0) * item.count, 0)
	const itemsValue = items.reduce((acc, item) => acc + unitPrice(item) * item.count, 0)
	const voucher = findVoucher(voucherCode)
	const freeShipByAmount = itemsValue >= FREESHIP_THRESHOLD
	const shipFee = items.length === 0 || freeShipByAmount || voucher?.type === 'shipping' ? 0 : STANDARD_SHIPPING_FEE
	const voucherDiscount = voucher?.type === 'amount' ? Math.min(itemsValue, voucher.value) : 0

	return {
		subtotalOriginal,
		itemsValue,
		productSavings: subtotalOriginal - itemsValue,
		voucher,
		voucherDiscount,
		shipFee,
		freeShipByAmount,
		freeshipProgress: Math.min(100, Math.round((itemsValue / FREESHIP_THRESHOLD) * 100)),
		total: Math.max(0, itemsValue - voucherDiscount + shipFee),
	}
}
