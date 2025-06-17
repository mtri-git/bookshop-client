import { createContext, useContext, useState } from "react";

const Context = createContext();

export const DialogProvider = ({ children }) => {
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [dialogData, setDialogData] = useState({
        title: '',
        content: '',
        confirmText: 'OK',
        cancelText: 'Hủy',
        showCancel: false,
        onConfirm: null
    });

    // Helper function to open dialog with common options
    const openDialog = (options) => {
        setDialogData({
            title: options.title || 'Thông báo',
            content: options.content || '',
            confirmText: options.confirmText || 'OK',
            cancelText: options.cancelText || 'Hủy',
            showCancel: options.showCancel || false,
            onConfirm: options.onConfirm || null
        });
        setIsOpenDialog(true);
    };

    // Specific helper for confirmation dialogs
    const openConfirmDialog = (options) => {
        openDialog({
            ...options,
            showCancel: true
        });
    };

    return (
        <Context.Provider value={{
            isOpenDialog, 
            setIsOpenDialog, 
            dialogData, 
            setDialogData,
            openDialog,
            openConfirmDialog
        }}>
            {children}
        </Context.Provider>
    );
};

export const useDialog = () => useContext(Context);