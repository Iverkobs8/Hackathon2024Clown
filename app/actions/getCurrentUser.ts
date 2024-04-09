import { getServerSession } from "next-auth/next";

import prisma from "@/app/Libs/Prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function getSession(){
    // sa auth ni nga ato ge create for user, mao ni atong ge export
    return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
    try{
        const session = await getSession();
    //check if naa bay email naka logged in
        if(!session?.user?.email){
            return null;
        }
        // e match nato ang email nga ni log in if naa ba sa DB
        const currentUser = await prisma.user.findUnique({
            where:{
                email : session.user.email as string
            }
        });

        if(!currentUser){
            return null;
        }
          //converting Date formats to String to avoid errors :)
          return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString()||null
        }
    }
    catch(error:any){
        return null;
    }
}