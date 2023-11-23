'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface InputCreatePropertyTypeProps {
  propertyTypesResort?: any;
  handlePropertiesChange: (value: any[]) => void;
}

interface PropertyTypeProps {
  propertyTypesResort?: any;
  onPropertyValueChange: (value: string) => void;
}

const InputCreatePropertyType: React.FC<InputCreatePropertyTypeProps> = ({
  propertyTypesResort,
  handlePropertiesChange,
}) => {
  const [quantityPropertyType, setQuantityPropertyType] = useState(1);
  const [propertyValues, setPropertyValues] = useState<string[]>([]);
  const handlePropertyValueChange = (value: string) => {
    // Update the array of property values when a value is selected
    if (!propertyValues.includes(value)) {
      // Add the value to propertyValues
      setPropertyValues((prevValues) => [...prevValues, value]);
    }
    // Now, call handlePropertiesChange with the updated propertyValues
  };

  useEffect(() => {
    handlePropertiesChange(propertyValues);
    console.log('Check value', propertyValues);
  }, [propertyValues]);

  const [propertyTypes, setPropertyTypes] = useState([
    <PropertyType
      key={0}
      propertyTypesResort={propertyTypesResort}
      onPropertyValueChange={handlePropertyValueChange}
    />,
  ]);

  const handleAddPropertyType = () => {
    setQuantityPropertyType((value) => value + 1);
    setPropertyTypes((prevPropertyTypes) => [
      ...prevPropertyTypes,
      <PropertyType
        key={quantityPropertyType}
        propertyTypesResort={propertyTypesResort}
        onPropertyValueChange={handlePropertyValueChange}
      />,
    ]);
  };

  return (
    <div className="flex flex-row items-start">
      <Fragment>
        <div className="w-[198px] text-gray-700">Property Types</div>
        <div className="flex flex-col">
          {propertyTypes.map((propertyType, index) => (
            <Fragment key={index}>{propertyType}</Fragment>
          ))}
        </div>
      </Fragment>
      <button onClick={handleAddPropertyType}>
        <AiOutlinePlusCircle size={30} />
      </button>
    </div>
  );
};

const PropertyType: React.FC<PropertyTypeProps> = ({
  propertyTypesResort,
  onPropertyValueChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the selected value from the <select>
    const selectedValue = event.target.value;

    // Call the callback function to update the value in the parent component
    onPropertyValueChange(selectedValue);
  };

  return (
    <Fragment>
      <div className="flex flex-row mb-2">
        <select id="amenities" className="rounded-md" onChange={handleSelectChange}>
          <option value="">-</option>
          {propertyTypesResort?.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.propertyTypeName}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

export default InputCreatePropertyType;
