'use client';
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    console.log(currentUser);

    return(
        <div className="fixed w-full z-30 h-25" style={{ backgroundColor: '#31363F' }}>
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="
                    flex
                    flex-row
                    items-center
                    justify-between
                    gap-3
                    md:gap-0">
                        <Logo/>
                        <div className="flex gap-10 text-white text-sm md:text-base">
                            <a href="#" className="hover:text-[#76abae] font-semibold">Home</a>
                            <a href="#" className="hover:text-[#76abae] font-semibold">Services</a>
                            <a href="#" className="hover:text-[#76abae] font-semibold">About Us</a>
                        </div>
                        <Search/>
                 <UserMenu currentUser = {currentUser}/>
                        
                    </div>
                </Container>
            </div>
            </div>
    );
}
export default Navbar;