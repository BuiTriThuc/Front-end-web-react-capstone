'use client';

import { Checkbox, Label } from 'flowbite-react';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface InputCreatePropertyTypeProps {
  propertyTypesResort?: any;
  handlePropertiesChange: (value: any[]) => void;
}

const InputCreatePropertyType: React.FC<InputCreatePropertyTypeProps> = ({
  propertyTypesResort,
  handlePropertiesChange,
}) => {
  const [propertyTypeValue, setPropertyTypeValue] = useState<any>([]);

  const handleChangeProperties = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setPropertyTypeValue((prev: any) => [...prev, e.target.value]);
    } else {
      setPropertyTypeValue((prev: any) => prev.filter((item: any) => item !== e.target.value));
    }
  };

  useEffect(() => {
    handlePropertiesChange(propertyTypeValue);
  }, [propertyTypeValue]);

  return (
    <div className="flex flex-row gap-5">
      <div>Property type</div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6 p-3 border border-slate-300 rounded-md">
        {propertyTypesResort.map((item: any, index: number) => (
          <div key={item.id} className="flex flex-row items-center gap-2">
            <Checkbox
              onChange={handleChangeProperties}
              id="promotion"
              color={'#5C98F2'}
              value={item.id}
            />
            <Label htmlFor="promotion">{item.propertyTypeName}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputCreatePropertyType;
