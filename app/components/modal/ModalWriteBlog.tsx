'use client';
import React from 'react';
import ModalBaseDetail from './ModalBaseDetail';
import useWriteBlogModal from '@/app/hooks/useWriteBlogModal';
import RichTextComponent from '../richtext/RichTextComponent';
import PrimeReactEditor from '../richtext/PrimeReactEditor';

const ModalWriteBlog = () => {
  const writeBlogModal = useWriteBlogModal();

  const bodyContent = (
    <div className="w-full">
      <div>
        {/* <RichTextComponent /> */}
        <PrimeReactEditor />
      </div>
      <div className="flex flex-row items-end justify-end my-3"></div>
    </div>
  );

  return (
    <ModalBaseDetail
      body={bodyContent}
      isOpen={writeBlogModal.isOpen}
      onClose={writeBlogModal.onClose}
    />
  );
};

export default ModalWriteBlog;
