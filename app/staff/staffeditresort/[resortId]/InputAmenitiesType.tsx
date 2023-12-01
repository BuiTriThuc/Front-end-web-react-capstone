'use client';

import { Checkbox, Label } from 'flowbite-react';
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react';

interface InputAmenitiesTypeProps {
  amenities?: any;
  handleAmenitiesChange: (value: any[]) => void;
  amenitiesArray: any;
}

const InputAmenitiesType: React.FC<InputAmenitiesTypeProps> = ({
  amenities,
  handleAmenitiesChange,
  amenitiesArray,
}) => {
  const [amenitiesValue, setAmenitiesValue] = useState<any[]>([]);
  const [amenitiesArrayValue, setAmenitiesArrayValue] = useState<any[]>(amenitiesArray);

  useEffect(() => {
    setAmenitiesValue(amenitiesArray.map((item: any) => item.id.toString()));
  }, []);

  const handleChangeAmenities = (e: ChangeEvent<HTMLInputElement>, itemValue: any) => {
    if (e.target.checked) {
      setAmenitiesValue((prev: any) => [...prev, e.target.value]);
      setAmenitiesArrayValue((prev: any) => [...prev, itemValue]);
    } else {
      setAmenitiesValue((prev: any) => prev.filter((item: any) => item !== e.target.value));
      setAmenitiesArrayValue((prev: any) => prev.filter((item: any) => item.id !== itemValue.id));
    }
  };

  useEffect(() => {
    handleAmenitiesChange(amenitiesValue);
  }, [amenitiesValue]);

  console.log('Check amenitiesArray', amenitiesValue);

  return (
    <div className="flex flex-row gap-5">
      <div>Resort Amenities</div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 p-3 border border-slate-300 rounded-md">
        {amenities.map((item: any, index: number) => (
          <div key={item.id} className="flex flex-row items-center gap-2">
            <Checkbox
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeAmenities(e, item)}
              id="promotion"
              color={'#5C98F2'}
              value={item.id}
              checked={amenitiesArrayValue.some((element: any) => element.id === item.id)}
            />
            <Label htmlFor="promotion">{item.resortAmenityName}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputAmenitiesType;
