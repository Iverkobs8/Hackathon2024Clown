'use client'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import {useCallback, useState} from "react";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import InputContainer from "../inputs/InputContainer";


const RegisterModal = () => {
    //hook ig open nato sa registerModal
    const registerModal = useRegisterModal();
    // we will use this if nag load pa atoang page or api connection
    const [isLoading, setIsLoading] = useState(false);

    //Form control
    const{
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            firstname: '',
            lastname: '',
            contactnumber: '',
            password:''
        }
    });

    //Function nato og mag submit nata og data
    const onSubmit : SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        //POST a data
        axios.post('/api/register', data)
        .then(() => {
            registerModal.onClose();
        })
        .catch((error) =>{
            console.log(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading 
            title = "Welcome to Tech Barney"
            subtitle="Create an account"
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
        <div className="flex flex-col gap-2 p-6">
          <div className="flex flex-row items-center gap-2 justify-center">
            <div>Already have an account?</div>
            <div
              onClick={() => {}}
              className="text-neutral-800 cursor-pointer hover:underline"
            >
              Log in
            </div>
          </div>
        </div>
      );


    return(
        <Modal
        disabled = {isLoading}
        isOpen = {registerModal.isOpen}
        title = "Sign up"
        actionLabel="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
        />
    );
}
export default RegisterModal;
