import api from '../constants/api'

// Fallback curated books when API is offline or returns empty data
export const FALLBACK_BOOKS = [
	{
		_id: 'fb-book-1',
		title: 'Cây Cam Ngọt Của Tôi - Tái Bản Đặc Biệt',
		price: 108000,
		sale: 0.25,
		sold: 842,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/c/a/cay-cam-ngot-cua-toi_bia-mem_1.jpg',
		author: 'José Mauro de Vasconcelos',
		category: 'Văn học'
	},
	{
		_id: 'fb-book-2',
		title: 'Nhà Giả Kim (The Alchemist) - Bản Dịch Mới',
		price: 79000,
		sale: 0.2,
		sold: 1420,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_36793.jpg',
		author: 'Paulo Coelho',
		category: 'Văn học'
	},
	{
		_id: 'fb-book-3',
		title: 'Đắc Nhân Tâm - How to Win Friends and Influence People',
		price: 88000,
		sale: 0.3,
		sold: 2315,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/d/a/dac-nhan-tam-kho-lon_1.jpg',
		author: 'Dale Carnegie',
		category: 'Kỹ năng sống'
	},
	{
		_id: 'fb-book-4',
		title: 'Tâm Lý Học Về Tiền - Morgan Housel',
		price: 189000,
		sale: 0.15,
		sold: 690,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/t/a/tam-ly-hoc-ve-tien_bia-ao.jpg',
		author: 'Morgan Housel',
		category: 'Kinh tế'
	},
	{
		_id: 'fb-book-5',
		title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu? - Rosie Nguyễn',
		price: 80000,
		sale: 0.2,
		sold: 1870,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/t/u/tuoi-tre-dang-gia-bao-nhieu_1.jpg',
		author: 'Rosie Nguyễn',
		category: 'Kỹ năng sống'
	},
	{
		_id: 'fb-book-6',
		title: 'Atomic Habits - Thay Đổi Tí Hon Hiệu Quả Bất Ngờ',
		price: 169000,
		sale: 0.2,
		sold: 1140,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/a/t/atomic-habits---thay-doi-ti-hon-hieu-qua-bat-ngo.jpg',
		author: 'James Clear',
		category: 'Kỹ năng sống'
	},
	{
		_id: 'fb-book-7',
		title: 'Cha Giàu Cha Nghèo (Tập 1) - Robert Kiyosaki',
		price: 115000,
		sale: 0.22,
		sold: 980,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/c/h/cha-giau-cha-ngheo-tap-1.jpg',
		author: 'Robert T. Kiyosaki',
		category: 'Kinh tế'
	},
	{
		_id: 'fb-book-8',
		title: 'Hiểu Về Trái Tim - Thiền sư Minh Niệm',
		price: 145000,
		sale: 0.18,
		sold: 1250,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/h/i/hieu-ve-trai-tim_tai-ban-2020.jpg',
		author: 'Minh Niệm',
		category: 'Tâm lý'
	},
	{
		_id: 'fb-book-9',
		title: 'Muôn Kiếp Nhân Sinh - Tập 1 (Nguyên Phong)',
		price: 168000,
		sale: 0.25,
		sold: 1940,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/m/u/muon-kiep-nhan-sinh-tap-1.jpg',
		author: 'Nguyên Phong',
		category: 'Tâm linh'
	},
	{
		_id: 'fb-book-10',
		title: 'Khéo Ăn Nói Sẽ Có Được Thiên Hạ',
		price: 95000,
		sale: 0.35,
		sold: 2100,
		imageUrl: 'https://cdn0.fahasa.com/media/catalog/product/k/h/kheo-an-noi-se-co-duoc-thien-ha_1.jpg',
		author: 'Trác Nhã',
		category: 'Kỹ năng sống'
	}
]

const bookService = {
	async getBook() {
		try {
			return await api.get('/book')
		} catch (error) {
			console.warn('API Error in getBook, returning fallback data')
			return { data: { data: FALLBACK_BOOKS } }
		}
	},
	async getNewBook() {
		try {
			const res = await api.get('/book/new')
			if (res.data?.book && res.data.book.length > 0) {
				return res
			}
			return { data: { book: FALLBACK_BOOKS.slice(0, 5) } }
		} catch (error) {
			console.warn('API Error in getNewBook, returning fallback data')
			return { data: { book: FALLBACK_BOOKS.slice(0, 5) } }
		}
	},
	async getBestSellerBook() {
		try {
			const res = await api.get('/book/best-seller')
			if (res.data?.book && res.data.book.length > 0) {
				return res
			}
			return { data: { book: FALLBACK_BOOKS.slice(5, 10) } }
		} catch (error) {
			console.warn('API Error in getBestSellerBook, returning fallback data')
			return { data: { book: FALLBACK_BOOKS.slice(5, 10) } }
		}
	},
	getBookById(id) {
		return api.get(`/book/${id}`)
	},
	searchBook(query) {
		return api.get(`/book/search?${query}`)
	},
}

export default bookService
