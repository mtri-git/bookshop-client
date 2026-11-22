import React, { useEffect, useState } from 'react'
import { useSetSessionUser, useUser } from '../../hooks/useUser'
import { changePassword, updateProfile } from '../../lib/auth'
import { toast_success, toast_error } from '../../utils/toastNotify'
import Icon from '../../components/Icon'

const CLOUDINARY_API = import.meta.env.VITE_CLOUDINARY_API || 'https://api.cloudinary.com/v1_1/du3l8upse/upload'
const CLOUDINARY_PRESET = import.meta.env.VITE_CLOUDINARY_PRESET || 'wb0t30bu'
const MAX_AVATAR_BYTES = 2 * 1024 * 1024

async function uploadAvatar(file) {
	const body = new FormData()
	body.append('file', file)
	body.append('upload_preset', CLOUDINARY_PRESET)
	const res = await fetch(CLOUDINARY_API, { method: 'POST', body })
	const data = await res.json().catch(() => null)
	if (!res.ok || !data?.secure_url) throw new Error('Tải ảnh lên thất bại')
	return data.secure_url
}

const toFormValue = (user) => ({
	fullname: user?.fullname || '',
	email: user?.email || '',
	address: user?.address || '',
	postalCode: user?.postalCode || '',
	phone: user?.phone || '',
})

const inputClass =
	'block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition'

function ChangePasswordCard() {
	const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirm: '' })
	const [saving, setSaving] = useState(false)
	const onField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

	const onSubmit = async (e) => {
		e.preventDefault()
		if (form.newPassword.length < 6) return toast_error('Mật khẩu mới phải có ít nhất 6 ký tự')
		if (form.newPassword !== form.confirm) return toast_error('Mật khẩu xác nhận không khớp')
		setSaving(true)
		try {
			await changePassword({ oldPassword: form.oldPassword, newPassword: form.newPassword })
			toast_success('Đổi mật khẩu thành công')
			setForm({ oldPassword: '', newPassword: '', confirm: '' })
		} catch (error) {
			toast_error(error?.message || 'Đổi mật khẩu thất bại')
		} finally {
			setSaving(false)
		}
	}

	return (
		<form onSubmit={onSubmit} className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-5 sm:p-8 mt-5">
			<h2 className="text-base font-bold text-gray-900">Đổi mật khẩu</h2>
			<p className="text-xs text-gray-500 mt-0.5 mb-4">Tài khoản đăng nhập bằng Google không cần mật khẩu.</p>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
				<input type="password" required autoComplete="current-password" placeholder="Mật khẩu hiện tại" value={form.oldPassword} onChange={onField('oldPassword')} className={inputClass} />
				<input type="password" required autoComplete="new-password" placeholder="Mật khẩu mới" value={form.newPassword} onChange={onField('newPassword')} className={inputClass} />
				<input type="password" required autoComplete="new-password" placeholder="Nhập lại mật khẩu mới" value={form.confirm} onChange={onField('confirm')} className={inputClass} />
			</div>
			<button type="submit" disabled={saving} className="mt-4 px-4 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors shadow-xs disabled:opacity-60">
				{saving ? 'Đang lưu...' : 'Cập nhật mật khẩu'}
			</button>
		</form>
	)
}

const INPUT_FIELD = ({ label, children, ...props }) => (
	<div>
		<label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
		{children || (
			<input
				{...props}
				className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition"
			/>
		)}
	</div>
)

export default function Profile() {
	const userData = useUser() || {}
	const setSessionUser = useSetSessionUser()

	const [isEditable, setIsEditable] = useState(false)
	const [saving, setSaving] = useState(false)
	const [file, setFile] = useState(null)
	const [preview, setPreview] = useState(null)
	const [value, setValue] = useState(() => toFormValue(userData))

	// Free the object URL of the previous preview
	useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview])

	const onChange = (field) => (e) => {
		setValue((prev) => ({ ...prev, [field]: e.target.value }))
	}

	const onFileChange = (e) => {
		const f = e.target.files[0]
		if (!f) return
		if (!f.type.startsWith('image/')) return toast_error('Vui lòng chọn file ảnh')
		if (f.size > MAX_AVATAR_BYTES) return toast_error('Ảnh tối đa 2MB')
		setFile(f)
		setPreview(URL.createObjectURL(f))
	}

	const onCancel = () => {
		setIsEditable(false)
		setFile(null)
		setPreview(null)
		setValue(toFormValue(userData))
	}

	const onUpdateInfo = async () => {
		if (!value.fullname.trim()) return toast_error('Vui lòng nhập họ và tên')
		setSaving(true)
		try {
			const { email, ...updateData } = value
			if (file) updateData.avatarUrl = await uploadAvatar(file)
			const user = await updateProfile(updateData)
			await setSessionUser(user)
			setValue(toFormValue(user))
			toast_success('Cập nhật thông tin thành công!')
			setIsEditable(false)
			setFile(null)
			setPreview(null)
		} catch (error) {
			toast_error(error?.message || 'Có lỗi xảy ra khi cập nhật thông tin')
		} finally {
			setSaving(false)
		}
	}

	const FALLBACK_AVATAR = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80'

	return (
		<>
		<div className="bg-white rounded-xl border border-gray-200/80 shadow-xs overflow-hidden">
			{/* Header */}
			<div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-gray-100">
				<div>
					<h2 className="text-base font-bold text-gray-900">Thông tin cá nhân</h2>
					<p className="text-xs text-gray-500 mt-0.5">
						Quản lý thông tin tài khoản của bạn
					</p>
				</div>
				<div className="flex items-center gap-2">
					{isEditable ? (
						<>
							<button
								onClick={onCancel}
								className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
							>
								Hủy
							</button>
							<button
								onClick={onUpdateInfo}
								disabled={saving}
								className="px-4 py-2 text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors shadow-xs disabled:opacity-60 flex items-center gap-1.5"
							>
								{saving && (
									<Icon name='spinner' className="animate-spin w-3 h-3" />
								)}
								{saving ? 'Đang lưu...' : 'Lưu thay đổi'}
							</button>
						</>
					) : (
						<button
							onClick={() => setIsEditable(true)}
							className="px-4 py-2 text-xs font-semibold text-orange-600 hover:bg-orange-50 border border-orange-200 rounded-lg transition-colors flex items-center gap-1.5"
						>
							<Icon name='pencil' className="w-3.5 h-3.5" />
							Chỉnh sửa
						</button>
					)}
				</div>
			</div>

			{/* Content */}
			<div className="p-5 sm:p-8">
				{/* Avatar section */}
				<div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
					<div className="relative shrink-0">
						<img
							src={preview || userData.avatarUrl || FALLBACK_AVATAR}
							alt={userData.fullname}
							className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200 bg-gray-100"
							onError={(e) => { e.target.src = FALLBACK_AVATAR }}
						/>
						{isEditable && (
							<label
								htmlFor="avatar-upload"
								className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
								title="Thay đổi ảnh đại diện"
							>
								<Icon name='camera' className="w-5 h-5 text-white" />
								<input
									id="avatar-upload"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={onFileChange}
								/>
							</label>
						)}
					</div>
					<div>
						<p className="font-semibold text-gray-900 text-sm">{userData.fullname || 'Chưa cập nhật'}</p>
						<p className="text-xs text-gray-500 mt-0.5">{userData.email}</p>
						{isEditable && (
							<label
								htmlFor="avatar-upload-btn"
								className="mt-2 inline-block text-xs text-orange-600 hover:underline cursor-pointer font-medium"
							>
								<input
									id="avatar-upload-btn"
									type="file"
									accept="image/*"
									className="hidden"
									onChange={onFileChange}
								/>
								Thay đổi ảnh đại diện
							</label>
						)}
					</div>
				</div>

				{/* Form Fields */}
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
					<INPUT_FIELD label="Họ và tên">
						<input
							type="text"
							value={value.fullname}
							onChange={onChange('fullname')}
							disabled={!isEditable}
							placeholder="Nguyễn Văn A"
							className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition"
						/>
					</INPUT_FIELD>

					<INPUT_FIELD label="Địa chỉ email">
						<input
							type="email"
							value={value.email}
							readOnly
							disabled
							placeholder="name@example.com"
							className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition"
						/>
					</INPUT_FIELD>

					<INPUT_FIELD label="Số điện thoại">
						<input
							type="tel"
							value={value.phone}
							onChange={onChange('phone')}
							disabled={!isEditable}
							placeholder="0912 345 678"
							className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition"
						/>
					</INPUT_FIELD>

					<INPUT_FIELD label="Mã bưu điện">
						<input
							type="text"
							value={value.postalCode}
							onChange={onChange('postalCode')}
							disabled={!isEditable}
							placeholder="70000"
							className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition"
						/>
					</INPUT_FIELD>

					<div className="sm:col-span-2">
						<INPUT_FIELD label="Địa chỉ giao hàng">
							<textarea
								value={value.address}
								onChange={onChange('address')}
								disabled={!isEditable}
								placeholder="Số nhà, tên đường, phường, quận, tỉnh/thành phố..."
								rows={2}
								className="block w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 bg-white disabled:bg-gray-50 disabled:text-gray-500 transition resize-none"
							/>
						</INPUT_FIELD>
					</div>
				</div>
			</div>

		</div>
		<ChangePasswordCard />
		</>
	)
}
