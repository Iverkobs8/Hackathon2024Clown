'use client'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useCallback, useState} from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import InputContainer from "../inputs/InputContainer";
import useLoginModal from "@/app/hooks/useLoginModal";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";



const RegisterModal = () => {
    //hook ig open nato sa registerModal
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    // we will use this if nag load pa atoang page or api connection
    const [isLoading, setIsLoading] = useState(false);

const onToggleLogin = useCallback(() =>{
    registerModal.onClose();
    loginModal.onOpen();
},[registerModal, loginModal])

    //Form control
    const{
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email : '',
            firstname: '',
            lastname: '',
            contactnumber: '',
            password:''
        }
    });

    //Function nato og mag submit nata og data
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        //POST a data
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) =>{
            toast.error('Something went wrong.');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <InputContainer
            id="email"
            label="Email"
            disabled ={isLoading}
            register={register}
            errors={errors}
            required
            />
            <InputContainer
            id="firstname"
            label="First Name"
            disabled ={isLoading}
            register={register}
            errors={errors}
            required
            />
            <InputContainer
            id="lastname"
            label="Last Name"
            disabled ={isLoading}
            register={register}
            errors={errors}
            required
            />
            <InputContainer
            id="contactnumber"
            label="Contact Number"
            disabled ={isLoading}
            register={register}
            errors={errors}
            required
            />
            <InputContainer
            id="password"
            label="Password"
            disabled ={isLoading}
            register={register}
            errors={errors}
            required
            />
            <InputContainer
            id="confirmpassword"
            label="Confirm Password"
            disabled ={isLoading}
            register={register}
            errors={errors}
            required
            />
        </div>
    );
    const footerContent = (
        <div className="flex flex-col gap-4 items-center">
        <hr/>
        <Button 
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
        />
    
        <div className="text-neutral-500 text-center mt-4 font-light">
            <div className="flex flex-row items-center justify-center gap-2">
                <div>Already have an account?</div>
                <div 
                    onClick={onToggleLogin}
                    className="text-white cursor-pointer hover:underline"
                >
                    Log in
                </div>
            </div>
        </div>
    </div>
    
        );


    return(
        <Modal
        disabled = {isLoading}
        isOpen = {registerModal.isOpen}
        title = "Create you account"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}
export default RegisterModal;
