import React from 'react';
import InputPassword from './InputPassword';

export default function ResetPassword() {
  return (
    <div className="py-96 flex flex-row items-center justify-center">
      <div className="border border-gray-600 rounded-md py-10 px-10 flex flex-col items-center">
        <div className="text-common text-2xl font-bold">Update password</div>
        <div className="h-[1px] w-full bg-gray-300 mt-5 mb-10"></div>
        <div className="text-gray-600 mb-10">
          Must include at least one symbol or number and be at least 8 characters.
        </div>
        <div className="w-full">
          <InputPassword />
        </div>
        <div>
          <button className="bg-common text-white font-bold hover:bg-blue-600 rounded-md py-3 px-28 mt-10 w-full">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
