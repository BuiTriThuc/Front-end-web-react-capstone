'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface InputAmenitiesTypeProps {
  amenities?: any;
  handleAmenitiesChange: (value: any[]) => void;
}

interface AmenityTypeProps {
  amenities?: any;
  onAmenityValueChange: (value: string) => void;
}

const InputAmenitiesType: React.FC<InputAmenitiesTypeProps> = ({
  amenities,
  handleAmenitiesChange,
}) => {
  const [quantityAmenitiesType, setQuantityAmenitiesType] = useState(1);

  const [aminetyValue, setAminetyValue] = useState<string[]>([]);
  const handleAmenityValueChange = (value: string) => {
    // Update the array of property values when a value is selected
    if (!aminetyValue.includes(value)) {
      // Add the value to aminetyValue
      setAminetyValue((prevValues) => [...prevValues, value]);
    }
  };

  useEffect(() => {
    handleAmenitiesChange(aminetyValue);
  }, [aminetyValue]);
  const [ameniteisTypes, setameniteisTypes] = useState([
    <AmeniteisType key={0} amenities={amenities} onAmenityValueChange={handleAmenityValueChange} />,
  ]);

  const handleAddPropertyType = () => {
    setQuantityAmenitiesType((value) => value + 1);
    setameniteisTypes((prevPropertyTypes) => [
      ...prevPropertyTypes,
      <AmeniteisType
        key={quantityAmenitiesType}
        amenities={amenities}
        onAmenityValueChange={handleAmenityValueChange}
      />,
    ]);
  };

  return (
    <Fragment>
      <div className="w-[198px] text-gray-700">Amenity</div>
      <div className="flex flex-col">
        {ameniteisTypes.map((propertyType, index) => (
          <Fragment key={index}>{propertyType}</Fragment>
        ))}
      </div>

      <button onClick={handleAddPropertyType}>
        <AiOutlinePlusCircle size={30} />
      </button>
    </Fragment>
  );
};

const AmeniteisType: React.FC<AmenityTypeProps> = ({ amenities, onAmenityValueChange }) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Get the selected value from the <select>
    const selectedValue = event.target.value;

    // Call setCustomeValue to update the value
    onAmenityValueChange(selectedValue); // Assuming you want to set it as an array
  };
  return (
    <Fragment>
      <div className="flex flex-row mb-2">
        <select id="amenities" onChange={handleSelectChange} className="rounded-md">
          <option value="">-</option>
          {amenities?.map((item: any) => (
            <option key={item.id} value={item.id}>
              {item.resortAmenityTypeName}
            </option>
          ))}
        </select>
      </div>
    </Fragment>
  );
};

export default InputAmenitiesType;
