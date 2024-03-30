'use client';

import React, { Children, useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}
const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {

//Para check nato og na mount ba ang component or not
    const [hasMounted, setHasMounted] = useState(false);
    //Matic nani if ma call ang componentn ma true dayon
useEffect(() =>{
    setHasMounted(true);
},[])

if(!hasMounted){
    return null;
}

return (
    <>
{children}
    </>
)

}
export default ClientOnly;