import {PrismaAdapter} from "@next-auth/prisma-adapter"
import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/app/Libs/Prismadb";

//Next authentication for logging in
export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials){
                //check if the user input email or pass for logging in
                if(!credentials?.email || !credentials?.password){
                    throw new Error ('Invalid Credentials');
                }
                // find the email that the user input inside collection User
                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                });
                //if user input and email that doesn't match password inside the collection user
                if (!user || !user.hashedPassword) {
                    throw new Error ('Invalid Credentials');
            }
            // to compare if the password input by the user is the same with the hashedpassword inside the db if decoded
            const isCorrectPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword
            );
            if (!isCorrectPassword){
                throw new Error ('Invalid Credentials');
            }
            return user;
        }})
    ],
    pages:{
        signIn: '/',
    },
    //this will help us see errors in terminal that we cannot default see
    debug : process.env.NODE_ENV !== 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
    
};
export default NextAuth(authOptions);