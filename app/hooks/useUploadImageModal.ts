'use client'; 

import {create} from 'zustand';

interface UploadImageModallStore{
    isOpen: boolean
    onOpen: () => void;
    onClose : () => void;
}

const useUploadImageModal = create<UploadImageModallStore>
((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export default useUploadImageModal;