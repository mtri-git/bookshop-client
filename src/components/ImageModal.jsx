import { useEffect, useRef, useState } from 'react';

export default function ImageModal({ src, isShow, onClick }) {
	const modalRef = useRef(null);
	const [isVisible, setIsVisible] = useState(false);
	
	// Handle visibility with animation timing
	useEffect(() => {
		if (isShow) {
			setIsVisible(true);
		} else {
			const timer = setTimeout(() => setIsVisible(false), 300);
			return () => clearTimeout(timer);
		}
	}, [isShow]);
	
	// Handle escape key press and prevent scrolling
	useEffect(() => {
		const handleEscKey = (event) => {
			if (event.key === 'Escape' && isShow) {
				onClick();
			}
		};
		
		// Prevent body scrolling when modal is open
		if (isShow) {
			document.body.style.overflow = 'hidden';
			document.addEventListener('keydown', handleEscKey);
		} else {
			document.body.style.overflow = 'auto';
		}
		
		return () => {
			document.body.style.overflow = 'auto';
			document.removeEventListener('keydown', handleEscKey);
		};
	}, [isShow, onClick]);
	
	// Handle click outside the image
	const handleBackdropClick = (e) => {
		if (e.target.id === 'image-modal-backdrop') {
			onClick();
		}
	};
	
	if (!isVisible && !isShow) return null;
	
	return (
		<div 
			id="image-modal-backdrop"
			className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-8 transition-opacity duration-300 ${isShow ? 'opacity-100' : 'opacity-0'}`}
			onClick={handleBackdropClick}
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-image-title"
		>
			<div 
				ref={modalRef}
				className={`relative max-w-5xl w-full max-h-[90vh] rounded-xl overflow-hidden shadow-[0_5px_30px_rgba(249,115,22,0.2)] transform transition-all duration-300 ${
					isShow ? 'scale-100 opacity-100 animate-slide-up' : 'scale-95 opacity-0'
				}`}
				tabIndex="-1"
			>
				{/* Hidden title for accessibility */}
				<h2 id="modal-image-title" className="sr-only">Image Preview</h2>
				
				{/* Image container with enhanced gradient border */}
				<div className="p-1.5 bg-gradient-to-br from-orange-500 via-orange-400 to-red-500 rounded-xl">
					<div className="relative bg-white/5 backdrop-blur-md rounded-lg overflow-hidden">
						<img 
							className="w-full h-auto max-h-[80vh] object-contain bg-white/5 backdrop-blur-md transition-all duration-300"
							src={src}
							alt="Expanded view"
							loading="eager"
						/>
					</div>
				</div>
				
				{/* Close button with improved styling */}
				<button
					onClick={onClick}
					className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full p-2.5 shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 z-10"
					aria-label="Close image"
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
					</svg>
				</button>
				
				{/* Image controls toolbar */}
				<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
					<button 
						className="bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg px-4 py-2 text-sm font-medium shadow-lg hover:bg-orange-500 hover:text-white transition-all duration-200 flex items-center"
						onClick={(e) => {
							e.stopPropagation();
							// Add zoom in functionality if needed
						}}
					>
						<svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
						</svg>
						Phóng to
					</button>
				</div>
			</div>
		</div>
	);
}
