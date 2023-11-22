import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Input,
  Textarea,
  DialogFooter,
} from '@material-tailwind/react';
import UpdatePropertyTypeStaff from '@/app/actions/UpdatePropertyTypeStaff';
import { message } from 'antd';
import DeletePropertyTypeStaff from '@/app/actions/DeletePropertyTypeStaff';
interface ModalDeletePropertyTypeProps {
  id: number;
  propertyTypeItem: any;
  callback: (id?: number | undefined) => Promise<void>;
}

export default function ModalDeletePropertyType({
  id,
  propertyTypeItem,
  callback,
}: ModalDeletePropertyTypeProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const resutl = await DeletePropertyTypeStaff(id)
      .then((rs) => {
        message.success('Delete success!.');
        setOpen(!open);
        callback();
      })
      .catch((er) => {
        message.success('Delete faild!.');
      });
  }

  return (
    <>
      <Button onClick={handleOpen}>Delete</Button>
      <Dialog open={open} size={'xs'} handler={handleOpen} style={{ width: '50%' }}>
        <DialogHeader>Delete Property Type.</DialogHeader>
        <DialogBody className="justify-items-center">
          Are you sure to delete this property type?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
            <span>Cancel</span>
          </Button>
          <Button color="green" onClick={(e: any) => handleSubmit(e)}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
