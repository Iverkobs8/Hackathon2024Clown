import prisma from "@/app/Libs/Prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
request : Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }
    const body = await request.json();
    const {
     imageSrc,
     description
    } = body;


    const image = await prisma.image.create({
        data:{
           imageSrc,
           description,
           userId: currentUser.id

        }
    });

    return NextResponse.json(image);
}