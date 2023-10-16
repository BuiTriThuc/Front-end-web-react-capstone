"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../input/Input";
import Modal from "./Modal";
import { toast } from "react-hot-toast";
import useCreatePlanModal from "@/app/hooks/useCreatePlanModal";
import { Select, Option, Textarea } from "@material-tailwind/react";
import useAxiosAuthClient from "@/app/hooks/useAxiosAuthClient";
import { useSession } from "next-auth/react";
import axios from "axios";
import useCreateOwnershipModal from "@/app/hooks/useCreateOwnershipModal";

export const priceType = [
  {
    id: 1,
    priceType: "ONE_TIME",
  },
  {
    id: 2,
    priceType: "RECURRING",
  },
];

export const planPriceInterval = [
  {
    id: 1,
    planPriceInterval: "MONTHLY",
  },
  {
    id: 2,
    planPriceInterval: "YEARLY",
  },
  {
    id: 3,
    planPriceInterval: "LIFETIME",
  },
  {
    id: 4,
    planPriceInterval: "NONE",
  },
];

export default function ModalCreateOwnership() {
  const { data: session } = useSession();
  const router = useRouter();
  const createOwnershipModal = useCreateOwnershipModal();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any[]>([]);
  const [priceTypeValue, setPriceTypeValue] = useState<any>();
  const [planPriceIntervalValue, setPlanPriceIntervalValue] = useState<any>();
  const axiosAuthClient = useAxiosAuthClient();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return null;
    } else {
      const selectedFile = Array.from(e.target.files);
      if (selectedFile) {
        setFile(selectedFile);
      }
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const setCustomeValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleChangePriceType = (value: any) => {
    setPriceTypeValue(value);
  };

  const handleChangePlanPriceInterval = (value: any) => {
    setPlanPriceIntervalValue(value);
  };

  useEffect(() => {
    setCustomeValue("priceType", priceTypeValue);
    setCustomeValue("planPriceInterval", planPriceIntervalValue);
  }, [priceTypeValue, planPriceIntervalValue, file]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("planName", data.planName);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("priceType", data.priceType);
    formData.append("planPriceInterval", data.planPriceInterval);
    formData.append(
      "image",
      new Blob([JSON.stringify(file)], { type: "image/jpeg" })
    );

    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    };

    axios
      .post("https://holiday-swap.click/api/v1/plan", formData, config)
      .then(() => {
        toast.success("Create plan success");
        reset();
        setPriceTypeValue(null);
        setPlanPriceIntervalValue(null);
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="planName"
          label="Plan Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="price"
          label="Price"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select
          id="priceType"
          label="Price Type"
          value={priceTypeValue}
          onChange={handleChangePriceType}
        >
          {priceType.map((item) => (
            <Option key={item.id} value={item.priceType}>
              {item.priceType}
            </Option>
          ))}
        </Select>
        <Select
          label="Plan Price Interval"
          id="planPriceInterval"
          value={planPriceIntervalValue}
          onChange={handleChangePlanPriceInterval}
        >
          {planPriceInterval.map((item) => (
            <Option key={item.id} value={item.planPriceInterval}>
              {item.planPriceInterval}
            </Option>
          ))}
        </Select>
      </div>
      <div className="grid grid-cols-1">
        <input
          {...register("image", {
            required: "Recipe picture is required",
          })}
          type="file"
          id="image"
          onChange={handleChangeImage}
        />
      </div>
      <div className="grid grid-cols-1">
        <div className="w-full">
          <Textarea
            label="Description"
            id="description"
            {...register("description")}
          />
        </div>
      </div>
    </div>
  );

  //   const footerContent = (
  //     <div className="grid grid-cols-1">
  //       <hr />
  //       <div className="text-neutral-500 text-center mt-4 font-light">
  //         <div className="flex flex-row justify-center items-center gap-2">
  //           <div>
  //             First time using{" "}
  //             <span className="font-bold text-black">
  //               Holiday<span className="text-common">Swap</span>
  //             </span>
  //             ?
  //           </div>
  //           <div
  //             onClick={toggle}
  //             className="text-neutral-800 cursor-pointer hover:underline"
  //           >
  //             Create an account
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <Modal
      disabled={isLoading}
      isOpen={createOwnershipModal.isOpen}
      title="Create Ownership"
      actionLabel="Submit"
      onClose={createOwnershipModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
}
