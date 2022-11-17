import { useState } from "react"

export const useDialog = () => {
    const [open, setIsOpen] = useState(null)
    
    return [open, setIsOpen]
}