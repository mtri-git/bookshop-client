import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { toCartProduct } from './cart'

// Wishlist is stored per browser (no API endpoint exists for it yet).
export const useWishlist = create(
	persist(
		(set, get) => ({
			items: [],
			hydrated: false,
			has: (id) => get().items.some((item) => item._id === id),
			toggle: (book) => {
				const exists = get().has(book._id)
				set((state) => ({
					items: exists
						? state.items.filter((item) => item._id !== book._id)
						: [{ ...toCartProduct(book), sold: book.sold || 0 }, ...state.items],
				}))
				return !exists
			},
			remove: (id) => set((state) => ({ items: state.items.filter((item) => item._id !== id) })),
		}),
		{
			name: 'bookshop-wishlist',
			version: 1,
			storage: createJSONStorage(() => localStorage),
			skipHydration: true,
			partialize: (state) => ({ items: state.items }),
			onRehydrateStorage: () => () => useWishlist.setState({ hydrated: true }),
		}
	)
)
