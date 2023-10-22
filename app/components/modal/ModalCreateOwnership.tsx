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
import { format } from "date-fns";
import CalendarAparment from "@/app/apartment/CalendarAparment";

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

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  key: "selection",
};

export default function ModalCreateOwnership() {
  const { data: session } = useSession();
  const router = useRouter();
  const createOwnershipModal = useCreateOwnershipModal();
  const dataResort = createOwnershipModal.dataResort;
  const currentUser = createOwnershipModal.currentUser;
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any[]>([]);
  const [resortId, setResortId] = useState();
  const [properties, setProperties] = useState<any[]>([]);
  const [propertyValue, setPropertyValue] = useState();
  const [visibleCalendar, setVisibleCalendar] = useState(false);
  const [dateRange, setDateRange] = useState(initialDateRange);
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

  const handleChangeResortId = (value: any) => {
    setResortId(value);
  };

  const handleChangePropertyValue = (value: any) => {
    setPropertyValue(value);
  };

  const handleVisibleCalendar = () => {
    setVisibleCalendar(!visibleCalendar);
  };

  useEffect(() => {
    const fetchProperty = async () => {
      if (resortId) {
        const data = await axios.get(
          `https://holiday-swap.click/api/v1/properties?resortId=${resortId}&numberGuest=0&pageNo=0&pageSize=10&sortBy=id`
        );
        setProperties(data.data.content);
      }
    };
    fetchProperty();
  }, [resortId]);

  useEffect(() => {
    setCustomeValue("propertyId", propertyValue);
  }, [propertyValue, file]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const formData = new FormData();

    const coOwnerId = {
      propertyId: data.propertyId as number,
      userId: currentUser.userId as number,
      roomId: data.roomId,
    };
    const coOwner = {
      endTime: dateRange.endDate,
      startTime: dateRange.startDate,
      type: "DEEDED",
      timeFrames: [
        {
          weekNumber: data.weekNumber as number,
        },
      ],
    };
    const coOwnerIdBlob = new Blob([JSON.stringify(coOwnerId)], {
      type: "application/json",
    });
    const coOwnerBlob = new Blob([JSON.stringify(coOwner)], {
      type: "application/json",
    });
    formData.append("coOwnerId", coOwnerIdBlob);
    formData.append("coOwner", coOwnerBlob);
    file.forEach((element) => {
      formData.append("contractImages", element);
    });

    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    };

    axiosAuthClient
      .post("https://holiday-swap.click/api/co-owners", formData)
      .then(() => {
        toast.success("Create ownership success!");
        reset();
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Select
          id="resortId"
          label="Resort"
          value={resortId}
          onChange={handleChangeResortId}
        >
          {dataResort?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.resortName}
            </Option>
          ))}
        </Select>
        <Select
          id="propertyId"
          label="Property"
          value={propertyValue}
          onChange={handleChangePropertyValue}
        >
          {properties?.map((item: any) => (
            <Option key={item.id} value={item.id}>
              {item.propertyName}
            </Option>
          ))}
        </Select>
      </div>
      <div onClick={handleVisibleCalendar} className="grid grid-cols-1 gap-4">
        <div
          className={`grid grid-cols-2 rounded-lg  ${
            visibleCalendar ? "border-2 border-black" : "border border-gray-600"
          } `}
        >
          <div className={`p-2 border-r border-gray-600`}>
            <div className="text-xs">Start-time</div>
            <input
              type="text"
              readOnly
              className="border-0 text-base text-gray-600 focus:outline-none w-full"
              value={`${format(new Date(dateRange.startDate), "dd/MM/yyyy")}`}
            />
          </div>
          <div className={`p-2 border-gray-600  `}>
            <div className="text-xs">End-time</div>
            <input
              type="text"
              readOnly
              className="border-0 text-base text-gray-600 focus:outline-none w-full"
              value={`${format(new Date(dateRange.endDate), "dd/MM/yyyy")}`}
            />
          </div>
        </div>
      </div>
      {visibleCalendar ? (
        <CalendarAparment
          value={dateRange}
          onChange={(value: any) => setDateRange(value.selection)}
          className="w-[700px] absolute top-36 -left-10 z-50 !text-[1em]"
        />
      ) : (
        ""
      )}
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="weekNumber"
          label="Week number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="roomId"
          label="Room Number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
      <div className="grid grid-cols-1">
        <label>Contract Image</label>
        <input
          {...register("contractImages", {
            required: "Recipe picture is required",
          })}
          type="file"
          id="contractImages"
          onChange={handleChangeImage}
          multiple
        />
      </div>
    </div>
  );

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