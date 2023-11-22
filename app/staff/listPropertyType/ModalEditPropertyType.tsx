import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Input,
  Textarea,
} from '@material-tailwind/react';
import UpdatePropertyTypeStaff from '@/app/actions/UpdatePropertyTypeStaff';
import { message } from 'antd';
interface ModalEditPropertyTypeProps {
  id: number;
  propertyTypeItem: any;
  callback: (id?: number | undefined) => Promise<void>;
}
interface elementF {
  propertyTypeName: {
    propertyTypeName: string;
    error: boolean;
    messageError: string;
  };
  propertyTypeDescription: {
    propertyTypeDescription: string;
    error: boolean;
    messageError: string;
  };
}
export default function ModalEditPropertyType({
  id,
  propertyTypeItem,
  callback,
}: ModalEditPropertyTypeProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = React.useState<boolean>(false);
  const [propertyTypeUpdate, setPropertyTypeUpdate] = useState<elementF>({
    propertyTypeName: {
      propertyTypeName: '',
      error: false,
      messageError: '',
    },
    propertyTypeDescription: {
      propertyTypeDescription: '',
      error: false,
      messageError: '',
    },
  });
  const handleOpen = () => {
    setPropertyTypeUpdate({
      propertyTypeName: {
        propertyTypeName: propertyTypeItem.propertyTypeName,
        error: false,
        messageError: '',
      },
      propertyTypeDescription: {
        propertyTypeDescription: propertyTypeItem.propertyTypeDescription,
        error: false,
        messageError: '',
      },
    });
    setOpen(!open);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (
      propertyTypeUpdate.propertyTypeName.propertyTypeName === '' ||
      propertyTypeUpdate.propertyTypeDescription.propertyTypeDescription == ''
    ) {
      setDisableSubmit(true);
    } else {
      e.preventDefault();
      const resutl = await UpdatePropertyTypeStaff(id, {
        propertyTypeName: propertyTypeUpdate.propertyTypeName.propertyTypeName,
        propertyTypeDescription: propertyTypeUpdate.propertyTypeDescription.propertyTypeDescription,
      })
        .then((rs) => {
          message.success('Update success!.');
          setOpen(!open);
          callback();
        })
        .catch((er) => {
          message.success('Update faild!.');
        });
    }
  }

  function handleChangePropertyDescription(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    setPropertyTypeUpdate({
      ...propertyTypeUpdate,
      propertyTypeDescription: {
        propertyTypeDescription: e.target.value,
        error: e.target.value === '',
        messageError: e.target.value == '' ? 'Please input property type description!.' : '',
      },
    });
    setDisableSubmit(e.target.value == '' ? true : false);
  }

  function handleChangePropertyName(e: React.ChangeEvent<HTMLInputElement>): void {
    setPropertyTypeUpdate({
      ...propertyTypeUpdate,
      propertyTypeName: {
        propertyTypeName: e.target.value,
        error: e.target.value === '',
        messageError: e.target.value == '' ? 'Please input property type name!.' : '',
      },
    });
    setDisableSubmit(e.target.value == '' ? true : false);
  }

  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={open} size={'xs'} handler={handleOpen} style={{ width: '50%' }}>
        <DialogHeader>Edit Property Type.</DialogHeader>
        <DialogBody className="justify-items-center">
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Property Type Name
              </Typography>
              <Input
                name="propertyTypeName"
                value={propertyTypeUpdate.propertyTypeName.propertyTypeName}
                onChange={(e) => handleChangePropertyName(e)}
                error={propertyTypeUpdate.propertyTypeName.error}
                size="lg"
                placeholder="Input property name."
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography color="red">
                {propertyTypeUpdate.propertyTypeName.messageError}
              </Typography>
            </div>
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Property Type Descripstion
              </Typography>
              <Textarea
                name="propertyTypeDescription"
                value={propertyTypeUpdate.propertyTypeDescription.propertyTypeDescription}
                onChange={(e) => handleChangePropertyDescription(e)}
                error={propertyTypeUpdate.propertyTypeDescription.error}
                placeholder="Input property descripstion."
                // className=" !border-t-blue-gray-200 focus:!border-t-gray-900"

                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
              />
              <Typography color="red">
                {propertyTypeUpdate.propertyTypeDescription.messageError}
              </Typography>
            </div>
            <div className="mb-1 flex flex-col-2 gap-6">
              <Button type="submit" disabled={disableSubmit}>
                Submit
              </Button>
              <Button onClick={handleOpen}>Cancel</Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </>
  );
}
