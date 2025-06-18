import { useCallback, useState } from "react"

export const useModal = () => {
    const [open, setOpen] = useState(false);
    const onShow = useCallback(() => {
        setOpen(true);
    }, []);
    const onClose = useCallback(() => {
        setOpen(false);
    }, []);
    return {
        open,
        onShow,
        onClose
    }
}