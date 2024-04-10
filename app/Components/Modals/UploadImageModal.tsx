'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useMemo, useState, ChangeEvent } from "react";
import useUploadImageModal from '@/app/hooks/useUploadImageModal';
import Modal from './Modal';
import ImageUpload from '../inputs/ImageUpload';
import Heading from '../Heading';
import InputContainer from '../inputs/InputContainer';




enum STEPS {
  IMAGES = 0,
  DESCRIPTION = 1,
}

const UploadImageModal = ({

}) => {

  const [imageSrcArray, setImageSrcArray] = useState<string[]>([]);
  const router = useRouter();
  const imageUploadModal = useUploadImageModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.IMAGES);
  

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      imageSrc: '',
      description: '',
    }
  });

  const imageSrc = watch('imageSrc');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }


  const handleImageChange = (value: string[]) => {
    setImageSrcArray(value);
  };
  /////////////////////////////////////////////////////
  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }
  // const onNext = () => {
  //   if (step === STEPS.IMAGES && (!imageSrc || imageSrc.length === 0)) {
  //       toast.error('Please upload an image', {
  //         style: {
  //           background: 'white',
  //           color: 'red',
  //         }
  //       });
  //       return;
  //     }
   
    // Check if put a title and description
  //   if (step === STEPS.DESCRIPTION && (!watch('title') || !watch('description'))) {
  //     toast.error('Please enter a enter a title and description', {
  //       style: {
  //         background: 'white',
  //         color: 'red',
  //       }
  //     });
  //     return;
  //   }
  //   setStep((value) => value + 1);
  // }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
        return onNext();
      }
      
    setIsLoading(true);
    axios.post('/api/uploadImage', data)
    .then(() => {
        toast.success('Image Uploaded!');
        router.refresh();
        reset();
        setStep(STEPS.IMAGES);
        imageUploadModal.onClose();
      })
      .catch(() => {
        toast.error('Something went wrong.');
      })
      .finally(() => {
        setIsLoading(false);
      })
    }

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return 'Upload'
    }

    return 'Next'
  }, [step]);

  ////////////////////////////////////////
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGES) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      {/* <Heading
        title="Show us that photo"
        subtitle="Upload an image"
      /> */}
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
      
      </div>
    </div>
  )

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <hr/>
     <Heading
          title="Add a photo"
          subtitle="Show us whats that photo looks like!"
        />
      <ImageUpload
      onChange={(value) => setCustomValue('imageSrc', value)}
      value={imageSrc}
      />
      </div> 
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
         <hr />
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
       
        <InputContainer
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }


return (
  <Modal
    disabled={isLoading}
    isOpen={imageUploadModal.isOpen}
    title={"Tech Barney"}
    actionLabel={actionLabel}
    onSubmit={handleSubmit(onSubmit)}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.IMAGES ? undefined : onBack}
    onClose={imageUploadModal.onClose}
    body={bodyContent}
  />
);
}

export default UploadImageModal;