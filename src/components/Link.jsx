import { forwardRef } from 'react'
import { Link as RouterLink, useMatchRoute } from '@tanstack/react-router'

// Lets components keep writing <Link to="/search?category=x">: the query part is
// turned into TanStack Router's `search` object.
function splitTo(to = '/') {
	const [pathname, query] = String(to).split('?')
	return { pathname: pathname || '/', search: query ? Object.fromEntries(new URLSearchParams(query)) : undefined }
}

export const Link = forwardRef(function Link({ to, search, ...props }, ref) {
	const target = splitTo(to)
	return <RouterLink ref={ref} to={target.pathname} search={search ?? target.search} {...props} />
})

// className may be a function of { isActive }; `end` = exact match
export const NavLink = forwardRef(function NavLink({ to, end = false, className, ...props }, ref) {
	const matchRoute = useMatchRoute()
	const { pathname } = splitTo(to)
	const isActive = Boolean(matchRoute({ to: pathname, fuzzy: !end }))
	return (
		<Link
			ref={ref}
			to={to}
			className={typeof className === 'function' ? className({ isActive }) : className}
			aria-current={isActive ? 'page' : undefined}
			{...props}
		/>
	)
})

export default Link
