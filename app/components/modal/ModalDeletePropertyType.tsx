'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import useDeletePropertyTypeModal from '@/app/hooks/useDeletePropertyTypeModal';
import DeletePropertyTypeStaff from '@/app/actions/DeletePropertyTypeStaff';
import { message } from 'antd';
export default function ModalDeletePropertyType() {
  const [isLoading, setIsLoading] = useState(false);
  const deletePropertyTypeModal = useDeletePropertyTypeModal();

  const onSubmit = () => {
    DeletePropertyTypeStaff(deletePropertyTypeModal.item.id)
      .then((rs) => {
        deletePropertyTypeModal.isSuccess = !deletePropertyTypeModal.isSuccess;
        deletePropertyTypeModal.onClose();
        message.success('Edit success!.');
      })
      .catch((err) => {
        message.error('Edit Faild!.');
      });
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <b className="text-center">Are you sure to delete this property type?</b>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={deletePropertyTypeModal.isOpen}
      title="Delete property type"
      actionLabel="Continue"
      secondaryActionLabel="Cancel"
      secondaryAction={deletePropertyTypeModal.onClose}
      onClose={deletePropertyTypeModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
}
