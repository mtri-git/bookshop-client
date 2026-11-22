// Cart lives in the browser (localStorage). The store starts empty on both the
// server and the client and is rehydrated after mount (see StoreHydrator), so
// SSR markup and the first client render always match.
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const LEGACY_KEY = 'cart' // pre-migration format: a bare JSON array
const MAX_QUANTITY = 99

const clampQuantity = (n) => Math.min(MAX_QUANTITY, Math.max(1, Math.floor(Number(n) || 1)))

// Only keep what the cart UI needs; prices are re-checked by the API at checkout
export const toCartProduct = (book) => ({
	_id: book._id,
	title: book.title,
	price: book.price,
	sale: book.sale || 0,
	thumbnailUrl: book.thumbnailUrl || book.imageUrl,
})

export const useCart = create(
	persist(
		(set, get) => ({
			items: [],
			voucher: null,
			hydrated: false,

			addItem: (book, quantity = 1) =>
				set((state) => {
					const existing = state.items.find((item) => item._id === book._id)
					if (existing) {
						return {
							items: state.items.map((item) =>
								item._id === book._id ? { ...item, count: clampQuantity(item.count + quantity) } : item
							),
						}
					}
					return { items: [...state.items, { ...toCartProduct(book), count: clampQuantity(quantity), checked: true }] }
				}),
			setQuantity: (id, quantity) =>
				set((state) => ({
					items: state.items.map((item) => (item._id === id ? { ...item, count: clampQuantity(quantity) } : item)),
				})),
			removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item._id !== id) })),
			toggleItem: (id) =>
				set((state) => ({
					items: state.items.map((item) => (item._id === id ? { ...item, checked: !item.checked } : item)),
				})),
			setAllChecked: (checked) => set((state) => ({ items: state.items.map((item) => ({ ...item, checked })) })),
			removeChecked: () => set((state) => ({ items: state.items.filter((item) => !item.checked) })),
			// Drop items whose book no longer exists (e.g. API rejected the order)
			removeIds: (ids) => set((state) => ({ items: state.items.filter((item) => !ids.includes(item._id)) })),
			setVoucher: (code) => set({ voucher: code }),
			checkedItems: () => get().items.filter((item) => item.checked),
		}),
		{
			name: 'bookshop-cart',
			version: 1,
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
			partialize: (state) => ({ items: state.items, voucher: state.voucher }),
			onRehydrateStorage: () => (state) => {
				if (!state) {
					useCart.setState({ hydrated: true })
					return
				}
				// One-time import of the old Redux cart
				try {
					const legacy = JSON.parse(localStorage.getItem(LEGACY_KEY) || 'null')
					if (Array.isArray(legacy) && legacy.length && state.items.length === 0) {
						state.items = legacy
							.filter((item) => item?._id && !String(item._id).startsWith('fb-'))
							.map((item) => ({ ...toCartProduct(item), count: clampQuantity(item.count), checked: Boolean(item.checked) }))
					}
					localStorage.removeItem(LEGACY_KEY)
					localStorage.removeItem('user')
					localStorage.removeItem('login')
				} catch {
					// ignore unreadable legacy data
				}
				useCart.setState({ items: state.items, hydrated: true })
			},
		}
	)
)

export const useCartCount = () => useCart((state) => state.items.reduce((acc, item) => acc + item.count, 0))
