'use client';
import React from 'react';

export default function SelectRouterAdmin() {
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
            <option value="/admin">Dashboard</option>
            <option value="/admin/liststaff">List Staff</option>
            <option value="/admin/createstaff">Create Staff</option>
            <option value="/admin/point">Point</option>
            <option value="/admin/plan">Plan</option>
          </select>
        </div>
      </div>
    </div>
  );
}
