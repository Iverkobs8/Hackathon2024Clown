'use client';
import axios from 'axios';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import InputContainer from '../inputs/InputContainer';
import Modal from './Modal';
import { useCallback, useState } from 'react';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SafeUser } from '@/app/types';
import { FcGoogle } from 'react-icons/fc';
import Button from '../Button';

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);

    const onToggleSignUp= useCallback(() =>{
        loginModal.onClose();
        registerModal.onOpen();
      
    },[registerModal, loginModal])

    //form control
    const{
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email: '',
            password: '',
        }
    });

    //fucntion for submissionsa form data

    const onSubmit : SubmitHandler<FieldValues> = async (data) =>{
        setIsLoading(true);
       
        signIn('credentials',{
            ...data,
            redirect : false,
        })
        .then((callback) => {
            setIsLoading(false);

            if(callback?.ok){
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }

            if(callback?.error){
                toast.error(callback.error);
            }
        })
        
         
    }

    const bodyContent = (
        <div className=" flex flex-col gap-4">

            <InputContainer
            id = "email"
            label = "Email"
            disabled = {isLoading}
            register={register}
            errors={errors}
            required/>
                  <InputContainer
            id = "password"
            label = "password"
            disabled = {isLoading}
            register={register}
            errors={errors}
            required/>


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
                    onClick={onToggleSignUp}
                    className="text-white cursor-pointer hover:underline"
                >
                    Sign Up
                </div>
            </div>
        </div>
    </div>
    
        );

  
    return(
<Modal
disabled= {isLoading}
isOpen={loginModal.isOpen}
title = "Login"
actionLabel = "Continue"
onClose = {loginModal.onClose}
onSubmit={handleSubmit(onSubmit)}
body = {bodyContent}
footer = {footerContent}/>
    );
    
}
export default LoginModal;


