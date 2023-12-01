'use client';

import ReactSelect, { StylesConfig } from 'react-select';
import Image from 'next/image';


type Props = {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options?: Record<string, any>[];
  disabled?: boolean;
  avatar?: string;
};

const filterOptions = (
  option: { label: string; value: string; data: any },
  input: string
) => {
  return option?.data?.label.toLowerCase().includes(input.toLowerCase());
};

function MemberSelect({ label, value, options, disabled, onChange }: Props) {
  const colorStyles: StylesConfig = {
    option: (styles) => ({
      ...styles,
      color: '#000',
      cursor: 'pointer',
    }),
    singleValue: (styles) => ({
      ...styles,
      color: '#000',
      cursor: 'pointer',
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  };

  return (
    <div className='z-[100]'>
      <label className='block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100'>
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={colorStyles}
          isSearchable={true}
          filterOption={filterOptions}
          classNames={{
            control: () => 'text-sm',
          }}
          getOptionLabel={(option: any) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className='relative inline-block rounded-full overflow-hidden h-8 w-8 md:h-10 md:w-10'>
                <Image alt='Avatar' src={`${option?.avatar ?? '/images/placeholder.jpg'}`} fill />
              </div>
              <span style={{ marginLeft: 8 }}>{option.label}</span>
            </div>
          ) as unknown as string}
        />
      </div>
    </div>
  );
}

export default MemberSelect;