'use client';
import React from 'react';

export default function SelectRouterStaff() {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue) {
      window.location.href = selectedValue;
    }
  };
  return (
    <div>
      <div>
        <div className="block lg:hidden xl:hidden">
          <select
            className="w-full rounded-lg my-4"
            name=""
            id=""
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="/staff">Dashboard</option>
            <option value="/staff/listresort">List Resort</option>
            <option value="/staff/createresort">Create resort</option>
            <option value="/staff/listproperty">List Property</option>
            <option value="/staff/createproperty">Create Property</option>
            <option value="/staff/listmember">List membership</option>
            <option value="/staff/listapproveOwnership">Approve ownership</option>
          </select>
        </div>
      </div>
    </div>
  );
}
