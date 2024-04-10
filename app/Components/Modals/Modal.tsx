'use client';

import { useState, useEffect, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {

    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen])

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }
        secondaryAction();
    }, [disabled, secondaryAction])

    if (!isOpen) {
        return null;
    }

    return (
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none bg-gray-900 bg-opacity-40">
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-3/4 my-6 mx-auto max-h-full max-w-3xl flex">
                {/* Left Section */}
                <div className="w-1/2 px-4">
                    <div className="h-full border-0 rounded-3xl shadow-lg relative flex flex-col justify-between w-full outline-none bg-gray-900 bg-opacity-90">
                        {/*HEADER */}
                        <div className="flex items-center rounded-t pt-5 justify-center relative">
                            <button onClick={handleClose} className="p-1 border-0 hover:opacity-70 transition absolute right-4">
                                <IoMdClose size={18} color="white" />
                            </button>
                            <div className="text-3xl font-bold font-inter text-white">
                                {title}
                            </div>
                        </div>
                        {/*Body */}
                        <div className="relative p-6 flex-auto">
                            {body}
                        </div>
                    </div>
                </div>
                {/* Right Section */}
                <div className="w-1/2 px-4">
                    <div className="h-full border-0 rounded-3xl shadow-lg relative flex flex-col justify-between w-full outline-none bg-gray-900 bg-opacity-90">
                        {/*Footer */}
                        <div className="flex flex-col p-4">
                            <div className="flex flex-row items-center justify-end gap-2 w-full">
                                {secondaryAction && secondaryActionLabel && (
                                    <Button
                                        outline
                                        disabled={disabled}
                                        label={secondaryActionLabel}
                                        onClick={handleSecondaryAction}
                                    />)}
                                <Button
                                    disabled={disabled}
                                    label={actionLabel}
                                    onClick={handleSubmit}
                                />
                            </div>
                            {footer}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
