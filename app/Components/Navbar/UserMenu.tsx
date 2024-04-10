'use client';
import { AiOutlineMenu } from "react-icons/ai";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import useUploadImageModal from "@/app/hooks/useUploadImageModal";
import { TbPhotoPlus } from 'react-icons/tb'


interface UserMenuProps{
    currentUser?: SafeUser | null
}


const UserMenu: React.FC<UserMenuProps>= ({
    currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);
    // e reverse ra nato ang current value sa setIsOpen
    const toggleOpen = useCallback(() => {
        setIsOpen((value) => !value);
    },[])
    //hook for registerModal 
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const uploadImageModal = useUploadImageModal();
    return(
        
        <div className="relative">
        <div className="flex flex-row items-center gap-3">
        <div
  onClick={() => currentUser ? uploadImageModal.onOpen() : loginModal.onOpen()}
  className="
    hidden
    md:flex
    items-center
    text-sm
    font-semibold
    py-3
    px-4
    rounded-full
    hover:bg-[#76abae]
    text-white
    transition
    text-color-white
    cursor-pointer"
>
  <TbPhotoPlus size={30} color="white" />
</div>
            <div
             onClick={toggleOpen}
                 className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 bg-white text-black flex flex-row items-center gap-3 rounded-full cursor-pointer hover:bg-[#76abae] transition"
                            >  {currentUser ? (
                                <>
                                <div className="text-bold">Hi! {currentUser.firstname}</div>
                                </>
                            ):(
                                <>
                                Tech Barney
                                </>
                            )}
                             <AiOutlineMenu
                             color="Black"
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
                                    {currentUser ? (
                                         <>
                                         <MenuItem
                                         onClick = {() => {}}
                                         label = "Sample"/>
                                         <MenuItem
                                          onClick = {() => {}}
                                         label = "Sample"/>
                                         <hr/>
                                        <MenuItem
                                          onClick = {() => signOut()}
                                         label = "Logout"/>
                                         </>
                                    ):(
                                    <>
                                    <MenuItem
                                    onClick = {loginModal.onOpen}
                                    label = "Login"/>
                                    <MenuItem
                                    onClick = {registerModal.onOpen}
                                    label = "Signup "/>
                                    </>
                                    )}
                                    
                                </div>
                                
                                
            </div>
        )}
    </div>
    );
}
export default UserMenu;