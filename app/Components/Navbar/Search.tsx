'use client';
import { IoSearch } from "react-icons/io5";
const Search = () => {
    return (
        <div className="relative w-96">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoSearch 
                size={30}
                color="gray"/>
              
            </div>
            <input 
                type="text" 
                id="simple-search" 
                className="bg-gray-50 border
                           border-gray-300
                           text-gray-900 
                             text-sm rounded-lg
                           focus:ring-blue-500
                           focus:border-blue-500
                             block
                             w-full
                             pl-10
                             py-2.5
                             white dark:border-gray-600
                           dark:placeholder-gray-400
                           dark:text-black
                           dark:focus:ring-[#76abae]
                           dark:focus:border-blue-500" 
                placeholder=" Search Tech Barney" 
                required 
/>

        </div>
    );
}
export default Search;
