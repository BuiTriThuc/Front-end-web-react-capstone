'use client';

import axios from 'axios';
import { CldUploadButton } from 'next-cloudinary';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import useConversation from '@/app/hooks/useConverastion';
import MessageInput from './MessageInput';
import MessageApis from '@/app/actions/MessageApis';
import React, { useEffect, useRef, useState } from 'react';

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview);


type Props = {
  currentUser?: Object | any | null;
};

function Form({ currentUser }: Props) {
  const { conversationId } = useConversation();
  const imageInput = useRef<FilePond>(null);
  const [files, setFiles] = useState<any>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    const formData = new FormData();
    formData.append('text', data.message);
    formData.append('authorId', currentUser?.userId);
    if (files[0]?.file){
      formData.append("image", files[0]?.file??"");
    }
    MessageApis.sendMessage(conversationId, formData).then((response) => {
      console.log('result', JSON.stringify(response.data));
    }).catch((err) => {
      console.log(err);
    });
    setFiles([]);
  };


  return (
    <>
      <div className={`bg-transparent w-full chat-image-preview ${files && files?.length?'':'hidden'}`}>
        <FilePond
          allowMultiple={false}
          allowReorder={true}
          maxFiles={1}
          instantUpload={false}
          credits={false}
          ref={imageInput}
          files={files}
          onupdatefiles={setFiles}
          labelIdle={""}
          // server="/api"
        />
      </div>
    <div
      className='py-4 px-4 bg-white dark:bg-black border-t dark:border-t-gray-600 flex items-center gap-2 lg:gap-4 w-full'>
      {imageInput&&<button className="filepond--label-action" onClick={() => {
        console.log("a");
        if (imageInput) imageInput?.current?.browse();
      }}>
        <HiPhoto size={30} className='text-sky-500'/>
      </button>}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex items-center gap-2 lg:gap-4 w-full'
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          placeholder='Write a message'
        />
        <button
          type='submit'
          className='rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition'
        >
          <HiPaperAirplane size={18} className='text-white' />
        </button>
      </form>
    </div>
    </>
  );
}

export default Form;