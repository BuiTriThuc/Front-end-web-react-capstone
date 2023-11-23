'use client';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useCreateReviewModal from '@/app/hooks/useCreateReviewModal';
import ReactStars from 'react-stars';
import { Label, Textarea, Select } from 'flowbite-react';
import ModalCreateReviewBase from './ModalCreateReviewBase';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import toast from 'react-hot-toast';

const ratingType = [
  {
    label: 'Anonymous',
    value: 'PRIVATE',
  },
  {
    label: 'Public',
    value: 'PUBLIC',
  },
];

export default function ModalCreateReview() {
  const createReviewModal = useCreateReviewModal();
  const availableId = createReviewModal.availableId;
  const userId = createReviewModal.userId;
  const bookingId = createReviewModal.bookingId;
  const [isLoading, setIsLoading] = useState(false);
  const [starValue, setStarValue] = useState(5);
  const [ratingTypeValue, setRatingTypeValue] = useState(ratingType[0].value);
  const axiosAuthClient = useAxiosAuthClient();

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

  const ratingChanged = (newRating: number) => {
    setStarValue(newRating);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const ratingData = {
      comment: data.comment,
      rating: starValue,
      ratingType: ratingTypeValue,
      bookingId: bookingId,
    };

    const config = { headers: { 'Content-type': 'application/json' } };

    axiosAuthClient
      .post(`/rating/property/${availableId}/user/${userId}`, ratingData, config)
      .then(() => {
        toast.success('Review success!');
        createReviewModal.onClose();
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="w-full">
      <div className="flex flex-col pb-3">
        <div className="text-lg font-bold">Rating</div>
        <ReactStars size={30} value={starValue} onChange={ratingChanged} />
      </div>

      <div className="flex flex-col pb-3">
        <div className="text-lg font-bold">Do you want to remain anonymous?</div>
        <Select
          value={ratingTypeValue}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setRatingTypeValue(e.target.value)}
        >
          {ratingType.map((item: any, index: number) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </div>
      <div className="max-w-full">
        <div className="mb-2 block font-bold">
          <Label htmlFor="comment" value="Your comment" />
        </div>
        <Textarea
          id="comment"
          placeholder="Leave a comment..."
          required
          rows={4}
          {...register('comment', { required: true })}
        />
      </div>
    </div>
  );

  return (
    <ModalCreateReviewBase
      disabled={isLoading}
      isOpen={createReviewModal.isOpen}
      title="Review"
      actionLabel="Submit"
      onSubmit={handleSubmit(onSubmit)}
      onClose={createReviewModal.onClose}
      body={bodyContent}
    />
  );
}
