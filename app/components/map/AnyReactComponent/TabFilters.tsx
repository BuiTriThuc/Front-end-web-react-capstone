'use client';

import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import NcInputNumber from './NcInputNumber';
import ButtonPrimary from '@/shared/ButtonPrimary';
import ButtonThird from '@/shared/ButtonThird';
import ButtonClose from '@/shared/ButtonClose';
import Checkbox from '@/shared/Checkbox';
import Slider from 'rc-slider';
import convertNumbThousand from '@/utils/convertNumbThousand';
import {
  InRoomAmenityType,
  InRoomAmenityTypeResponse,
  PropertyType,
  PropertyView,
  SearchApartmentForRentParams,
} from '@/app/components/map/type';
import GetInRoomAmenityType from '@/app/actions/getInRoomAmenityType';
import InRoomAmenityTypeApis from '@/app/components/map/apis/InRoomAmenityTypeApis';
import PropertyTypeApis from '@/app/components/map/apis/PropertyTypeApis';
import PropertyViewApis from '@/app/components/map/apis/PropertyViewApis';
import { useDispatch, useSelector } from 'react-redux';
import { setApartmentForRentParams } from '@/app/redux/slices/searchApartmentForRentSlice';
import { log } from 'util';

const TabFilters = () => {
  const dispatch = useDispatch();
  const params = useSelector((state: any) => state.apartmentForRent.searchParams);
  const [isOpenMoreFilter, setisOpenMoreFilter] = useState(false);
  const [isOpenMoreFilterMobile, setisOpenMoreFilterMobile] = useState(false);
  const [rangePrices, setRangePrices] = useState([params.min ?? 1, params.max ?? 9999]);
  const [inRoomAmenityType, setInRoomAmenityType] = useState<InRoomAmenityType[]>([]);
  const [propertyType, setPropertyType] = useState<PropertyType[]>([]);
  const [propertyView, setPropertyView] = useState<PropertyView[]>([]);

  //
  const closeModalMoreFilter = () => setisOpenMoreFilter(false);
  const openModalMoreFilter = () => setisOpenMoreFilter(true);
  //
  const closeModalMoreFilterMobile = () => setisOpenMoreFilterMobile(false);
  const openModalMoreFilterMobile = () => setisOpenMoreFilterMobile(true);

  useEffect(() => {
    InRoomAmenityTypeApis.getAll()
      .then((res) => {
        setInRoomAmenityType(res.content as InRoomAmenityType[]);
      })
      .catch((err) => console.error(err));
    PropertyTypeApis.getAll()
      .then((res) => {
        setPropertyType(res.content as PropertyType[]);
      })
      .catch((err) => console.error(err));
    PropertyViewApis.getAll()
      .then((res) => {
        setPropertyView(res.content as PropertyView[]);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleParamChange = (
    paramName: string,
    id: number,
    checked: boolean,
    updateList: (list: number[] | undefined, id: number, checked: boolean) => number[],
  ) => {
    const currentList = params[paramName];
    const updatedList = updateList(currentList, id, checked);
    const updatedParams = {
      ...params,
      [paramName]: updatedList,
    };
    console.log(updatedParams);
    dispatch(setApartmentForRentParams(updatedParams));
  };

  const updateList = (list: number[] | undefined, id: number, checked: boolean): number[] => {
    if (checked) {
      return [...(list || []), id];
    } else {
      return list?.filter((itemId) => itemId !== id) || [];
    }
  };

  const handlePropertyTypeChange = (id: number, checked: boolean) => {
    handleParamChange('listOfPropertyType', id, checked, updateList);
  };

  const handlePropertyViewChange = (id: number, checked: boolean) => {
    handleParamChange('listOfPropertyView', id, checked, updateList);
  };

  const handleAmenitiesChange = (id: number, checked: boolean) => {
    handleParamChange('listOfInRoomAmenity', id, checked, updateList);
  };

  const handlePriceChange = (values: number[]) => {
    dispatch(setApartmentForRentParams({ ...params, min: values[0], max: values[1] }));
  };

  const handleClear = (type: string) => {
    const updatedParams =
      type === 'moreFilter'
        ? { ...params, listOfInRoomAmenity: [], listOfPropertyView: [] }
        : { ...params, listOfPropertyType: [] };
    dispatch(setApartmentForRentParams(updatedParams));
  };

  useEffect(() => {
    console.log(params);
  }, [params]);

  const renderXClear = (type?: string) => {
    return (
      <span
        onClick={() => handleClear(type ?? '')}
        className='w-4 h-4 rounded-full bg-primary-500 text-white flex items-center justify-center ml-3 cursor-pointer'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3 w-3'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </span>
    );
  };

  const renderTabsTypeOfPlace = () => {
    return (
      <Popover className='relative'>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none ${
                open ? '!border-primary-800 ' : ''
              } ${params?.listOfPropertyType?.length > 0 ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-300'
              }`}
            >
              <span>Type of apartment</span>
              {params?.listOfPropertyType?.length > 0 && renderXClear()}
              <i className='las la-angle-down ml-2'></i>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute z-20 w-screen max-w-sm max-h-80 px-4 mt-3 left-0 sm:px-0 lg:max-w-md'>
                <div
                  className=' rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700'>
                  <div className='max-h-80 overflow-y-auto h-screen relative flex flex-col px-5 py-6 space-y-5'>
                    {propertyType.map((item) => (
                      <div key={item.id} className=''>
                        <Checkbox
                          name={item.propertyTypeName}
                          label={item.propertyTypeName}
                          subLabel={item.propertyTypeDescription}
                          defaultChecked={params && params.listOfPropertyType?.includes(item.id)}
                          onChange={(checked) => handlePropertyTypeChange(item.id, checked)}
                        />
                      </div>
                    ))}
                  </div>
                  <div
                    className='p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                    <ButtonThird onClick={close} sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass='px-4 py-2 sm:px-5'
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };


  const renderTabsPriceRage = () => {
    return (
      <Popover className='relative ' style={{ zIndex: 1500 }}>
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`flex items-center justify-center px-4 py-2 text-sm border border-primary-500 bg-primary-50 text-primary-700 focus:outline-none `}
            >
              <span>
                {`P${convertNumbThousand(
                  rangePrices[0],
                )} - P${convertNumbThousand(rangePrices[1])}`}{' '}
              </span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-200'
              enterFrom='opacity-0 translate-y-1'
              enterTo='opacity-100 translate-y-0'
              leave='transition ease-in duration-150'
              leaveFrom='opacity-100 translate-y-0'
              leaveTo='opacity-0 translate-y-1'
            >
              <Popover.Panel className='absolute z-20 w-screen max-w-sm px-4 mt-3 left-0 sm:px-0'>
                <div
                  className='rounded-2xl shadow-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 custom-translate'>
                  <div className='relative flex flex-col px-5 py-6 space-y-8'>
                    <div className='space-y-5'>
                      <span className='font-medium'>Price per day</span>
                      <Slider
                        range
                        className='text-red-400'
                        min={1}
                        max={9999}
                        defaultValue={[rangePrices[0], rangePrices[1]]}
                        allowCross={false}
                        onChange={(e) => {
                          setRangePrices(e as number[]);
                          handlePriceChange(e as number[]);
                        }}
                      />
                    </div>

                    <div className='flex justify-between space-x-5'>
                      <div>
                        <label
                          htmlFor='minPrice'
                          className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
                        >
                          Min price
                        </label>
                        <div className='mt-1 relative rounded-md'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <span className='text-neutral-500 sm:text-sm'>
                              P
                            </span>
                          </div>
                          <input
                            type='text'
                            name='minPrice'
                            disabled
                            id='minPrice'
                            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900'
                            value={rangePrices[0]}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor='maxPrice'
                          className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
                        >
                          Max price
                        </label>
                        <div className='mt-1 relative rounded-md'>
                          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                            <span className='text-neutral-500 sm:text-sm'>
                              P
                            </span>
                          </div>
                          <input
                            type='text'
                            disabled
                            name='maxPrice'
                            id='maxPrice'
                            className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900'
                            value={rangePrices[1]}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className='p-5 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                    <ButtonThird onClick={close} sizeClass='px-4 py-2 sm:px-5'>
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={close}
                      sizeClass='px-4 py-2 sm:px-5'
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderMoreFilterItem = (
    data: {
      id: number;
      name: string;
      defaultChecked?: boolean;
    }[],
    type?: string,
  ) => {
    const list1 = data.filter((_, i) => i < data.length / 2);
    const list2 = data.filter((_, i) => i >= data.length / 2);
    return (
      <div className='grid grid-cols-2 gap-8'>
        <div className='flex flex-col space-y-5'>
          {list1.map((item) => (
            <Checkbox
              key={item.id}
              name={item.name}
              label={item.name}
              defaultChecked={params &&
                (type === 'inRoomAmenities' ? params?.listOfInRoomAmenity?.includes(item.id)
                  : params?.listOfPropertyView?.includes(item.id))}
              onChange={(checked) => type === 'inRoomAmenities' ? handleAmenitiesChange(item.id, checked) : handlePropertyViewChange(item.id, checked)}
            />
          ))}
        </div>
        <div className='flex flex-col space-y-5'>
          {list2.map((item) => (
            <Checkbox
              key={item.name}
              name={item.name}
              label={item.name}
              defaultChecked={params &&
                (type === 'inRoomAmenities' ? params?.listOfInRoomAmenity?.includes(item.id)
                  : params?.listOfPropertyView?.includes(item.id))}
              onChange={(checked) => type === 'inRoomAmenities' ? handleAmenitiesChange(item.id, checked) : handlePropertyViewChange(item.id, checked)}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderTabMoreFilter = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none
          ${(params?.listOfInRoomAmenity?.length > 0 || params?.listOfPropertyView?.length > 0) ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-300'
          }`}
          onClick={openModalMoreFilter}
        >
          <span>
          More filters{' '}
            {params?.listOfInRoomAmenity?.length && params?.listOfPropertyView?.length
              ? `(${(params.listOfInRoomAmenity.length || 0) + (params.listOfPropertyView.length || 0)})`
              : ''}
          </span>
          {(params?.listOfInRoomAmenity?.length > 0 || params?.listOfPropertyView?.length > 0) && renderXClear('moreFilter')}
        </div>

        <Transition show={isOpenMoreFilter} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 overflow-y-auto rounded-b-xl'
            onClose={closeModalMoreFilter}
            style={{ zIndex: 1500 }}
          >
            <div className='min-h-screen text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='inline-block h-screen align-middle'
                aria-hidden='true'
              >
                &#8203;
              </span>
              <Transition.Child
                className='inline-block py-8 px-2 h-screen w-full max-w-4xl'
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <div
                  className='inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full'>
                  <div
                    className='relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      More filters
                    </Dialog.Title>
                    <span className='absolute left-3 top-3'>
                      <ButtonClose onClick={closeModalMoreFilter} />
                    </span>
                  </div>

                  <div className='flex-grow overflow-y-auto'>
                    <div className='px-10 divide-y divide-neutral-200 dark:divide-neutral-800'>
                      {
                        propertyView && (
                          <div className='py-7'>
                            <h3 className='text-xl font-medium'>Apartment View</h3>
                            <div className='mt-6 relative '>
                              {renderMoreFilterItem(
                                propertyView.map((res) => ({ id: res.id, name: res.propertyViewName })),
                                'propertyView',
                              )}
                            </div>
                          </div>
                        )
                      }
                      {
                        inRoomAmenityType && inRoomAmenityType?.map((item) => (
                          <div className='py-7' key={item.id}>
                            <h3 className='text-xl font-medium'>{item.inRoomAmenityTypeName}</h3>
                            <div className='mt-6 relative '>
                              {renderMoreFilterItem(
                                item.inRoomAmenities.map((res) => ({ id: res.id, name: res.inRoomAmenityName })),
                                'inRoomAmenities',
                              )}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div
                    className='p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between rounded-b-xl'>
                    <ButtonThird
                      onClick={closeModalMoreFilter}
                      sizeClass='px-4 py-2 sm:px-5'
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilter}
                      sizeClass='px-4 py-2 sm:px-5'
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  const renderTabMoreFilterMobile = () => {
    return (
      <div>
        <div
          className={`flex items-center justify-center px-4 py-2 text-sm border border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-6000 focus:outline-none
          ${(params?.listOfInRoomAmenity?.length > 0 || params?.listOfPropertyView?.length > 0) ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-neutral-300'
          }`}
          onClick={openModalMoreFilterMobile}
        >
          <span>More filter</span>
          {(params?.listOfInRoomAmenity?.length > 0 || params?.listOfPropertyView?.length > 0) && renderXClear('moreFilter')}
        </div>

        <Transition appear show={isOpenMoreFilterMobile} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 z-50 overflow-y-auto'
            onClose={closeModalMoreFilterMobile}
          >
            <div className='min-h-screen text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Dialog.Overlay className='fixed inset-0 bg-black bg-opacity-40 dark:bg-opacity-60' />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span
                className='inline-block h-screen align-middle'
                aria-hidden='true'
              >
                &#8203;
              </span>
              <Transition.Child
                className='inline-block py-8 px-2 h-screen w-full max-w-4xl'
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <div
                  className='inline-flex flex-col w-full max-w-4xl text-left align-middle transition-all transform rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full'>
                  <div
                    className='relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      More filters
                    </Dialog.Title>
                    <span className='absolute left-3 top-3'>
                      <ButtonClose onClick={closeModalMoreFilterMobile} />
                    </span>
                  </div>

                  <div className='flex-grow overflow-y-auto'>
                    <div className='px-4 sm:px-6 divide-y divide-neutral-200 dark:divide-neutral-800'>
                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Type of apartment</h3>
                        <div className='mt-6 relative '>
                          {renderMoreFilterItem(propertyType.map(res => ({ name: res.propertyTypeName, description: res.propertyTypeDescription, id: res.id })))}
                        </div>
                      </div>

                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Range Prices</h3>
                        <div className='mt-6 relative '>
                          <div className='relative flex flex-col space-y-8'>
                            <div className='space-y-5'>
                              <Slider
                                range
                                className='text-red-400'
                                min={0}
                                max={2000}
                                defaultValue={[0, 1000]}
                                allowCross={false}
                                onChange={(e) => setRangePrices(e as number[])}
                              />
                            </div>

                            <div className='flex justify-between space-x-5'>
                              <div>
                                <label
                                  htmlFor='minPrice'
                                  className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
                                >
                                  Min price
                                </label>
                                <div className='mt-1 relative rounded-md'>
                                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <span className='text-neutral-500 sm:text-sm'>
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type='text'
                                    name='minPrice'
                                    disabled
                                    id='minPrice'
                                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900'
                                    value={rangePrices[0]}
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor='maxPrice'
                                  className='block text-sm font-medium text-neutral-700 dark:text-neutral-300'
                                >
                                  Max price
                                </label>
                                <div className='mt-1 relative rounded-md'>
                                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <span className='text-neutral-500 sm:text-sm'>
                                      $
                                    </span>
                                  </div>
                                  <input
                                    type='text'
                                    disabled
                                    name='maxPrice'
                                    id='maxPrice'
                                    className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-3 sm:text-sm border-neutral-200 rounded-full text-neutral-900'
                                    value={rangePrices[1]}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ---- */}
                      <div className='py-7'>
                        <h3 className='text-xl font-medium'>Rooms and beds</h3>
                        <div className='mt-6 relative flex flex-col space-y-5'>
                          <NcInputNumber label='Beds' max={10} />
                          <NcInputNumber label='Bedrooms' max={10} />
                          <NcInputNumber label='Bathrooms' max={10} />
                        </div>
                      </div>
                      {
                        inRoomAmenityType && inRoomAmenityType?.map((item) => (
                          <div className='py-7' key={item.id}>
                            <h3 className='text-xl font-medium'>{item.inRoomAmenityTypeName}</h3>
                            <div className='mt-6 relative '>
                              {renderMoreFilterItem(item.inRoomAmenities.map((res) => ({ id: res.id, name: res.inRoomAmenityName })))}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div
                    className='p-4 sm:p-6 flex-shrink-0 bg-neutral-50 dark:bg-neutral-900 dark:border-t dark:border-neutral-800 flex items-center justify-between'>
                    <ButtonThird
                      onClick={closeModalMoreFilterMobile}
                      sizeClass='px-4 py-2 sm:px-5'
                    >
                      Clear
                    </ButtonThird>
                    <ButtonPrimary
                      onClick={closeModalMoreFilterMobile}
                      sizeClass='px-4 py-2 sm:px-5'
                    >
                      Apply
                    </ButtonPrimary>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  };

  return (
    <div className='flex lg:space-x-4'>
      <div className='hidden lg:flex space-x-4'>
        {renderTabsTypeOfPlace()}
        {renderTabsPriceRage()}
        {inRoomAmenityType && renderTabMoreFilter()}
      </div>
    </div>
  );
};

export default TabFilters;