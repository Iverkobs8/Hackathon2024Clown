'use client';
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    // e reverse ra nato ang current value sa setIsOpen
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[])
    //hook for registerModal 
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    return(
        
        <div className="relative">
        <div className="flex flex-row items-center gap-3">
            <div
            onClick={() => {}}
             className="hidden
                            md:flex
                            items-center
                            text-sm
                            font-semibold
                            py-3
                            px-4
                            rounded-full
                          hover:bg-[#76abae]
                          text-white transition 
                            text-color-white
                            cursor-pointer">
            </div>
            <div
             onClick={toggleOpen}
                 className="p-4
                            md:py-1
                            md:px-2
                            border-[1px]
                            border-neutral-200
                            text-white
                            flex
                            flex-row
                            items-center
                            gap-3
                            rounded-full
                            cursor-pointer
                            hover:bg-[#76abae]
                            transition
                            "
                            >  Tech Barney
                             <AiOutlineMenu
                             color="white"
                              size={15}
                             />        
            </div>
        </div>
        {isOpen && (
            <div 
                 className="absolute
                            rounded-xl
                            shadow-md
                            w-[40vw]
                            md:w-3/4
                            bg-white
                            overflow-hidden
                            rigth-0
                            top-12
                            text-sm"
                            >
                                <div className=" flex flex-col cursor-pointer">
                                    <>
                                    <MenuItem
                                    onClick = {loginModal.onOpen}
                                    label = "Login"/>
                                    <MenuItem
                                    onClick = {registerModal.onOpen}
                                    label = "Signup "/>
                                    </>
                                    
                                </div>
            </div>
        )}
    </div>
    );
}
export default UserMenu;