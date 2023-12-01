'use client';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';
import 'filepond-plugin-image-edit/dist/filepond-plugin-image-edit.css';
import UserApis, { User } from '@/app/actions/UserApis';
import dayjs, { Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { Skeleton } from 'antd';
import { toast } from 'react-hot-toast';
import { create } from '@/public/vendor/doka.esm.min';
import '@/public/vendor/doka.min.css';
import HeadingDashboard from '../HeadingDashboard';

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageEdit,
  FilePondPluginImageTransform
);

type FormData = {
  email?: string;
  fullName?: string;
  gender?: string;
  dob: Dayjs;
  phone?: string;
};

export default function EditProfileComponent() {
  const [selectedOption, setSelectedOption] = useState('');
  const [files, setFiles] = useState<any>([]);
  const [editFile, setEditFile] = useState<any>(null);
  const [user, setUser] = useState<User>();
  const [dob, setDob] = useState(dayjs());
  const [loading, setLoading] = React.useState<boolean>(true);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append('fullName', data?.fullName ?? '');
    formData.append('gender', data?.gender ?? 'OTHER');
    formData.append('dob', (data?.dob ?? dob).format('YYYY-MM-DD') ?? '');
    if (!(files.length > 0) || typeof files[0]?.source !== 'string') {
      formData.append('avatar', new File([editFile], editFile?.name) ?? files[0]?.file ?? '');
    }
    UserApis.updateCurrentUserProfile(formData)
      .then((res) => {
        toast.success('Profile updated');
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(formData);
  });

  useEffect(() => {
    setLoading(true);
    UserApis.getCurrentUserProfile()
      .then((res) => {
        setUser(res);
        setDob(dayjs(`${res.dob.join('-')}`));
        setFiles(res?.avatar ? [`${res.avatar}?stopGivingMeHeadaches=true`] : []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
            <option value="/dashboard">Dashboard</option>
            <option value="/dashboard/editProfile">Edit Profile</option>
            <option value="/dashboard/changePassword">Change password</option>
            <option value="/dashboard/ownership">Ownership</option>
            <option value="/dashboard/wallet">wallet</option>
            <option value="/dashboard/transfer">Transfer</option>
            <option value="/dashboard/myBooking">My Booking</option>
            <option value="/dashboard/chat">Chat</option>
          </select>
        </div>
        <div className="mt-7">
          <HeadingDashboard
            routerDashboard="/dashboard"
            pageCurrentContent="Edit profile"
            pageCurrentRouter="/dashboard/editProfile"
          />
        </div>
        {!loading ? (
          <form onSubmit={onSubmit}>
            <div className="p-4 flex flex-col-reverse flex-shrink-0 md:flex-row md:mt-8">
              <div className="md:basis-1/3">
                <div className="flex flex-col mb-6 md:max-w-[300px]">
                  <label htmlFor="Email" className="pb-2 text-sm text-gray-800 dark:text-gray-100">
                    Email*:
                  </label>
                  <div className="shadow-sm rounded flex">
                    <div className="px-6 py-3 dark:text-gray-100 flex items-center bg-[#F8F8F8] !border-[#6b7280] border border-solid box-border border-r-0 rounded-l">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-mail"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={3} y={5} width={18} height={14} rx={2} />
                        <polyline points="3 7 12 13 21 7" />
                      </svg>
                    </div>
                    <input
                      {...register('email')}
                      type="email"
                      defaultValue={user?.email}
                      readOnly
                      id="Email"
                      name="email"
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 bg-transparent text-gray-500 dark:text-gray-400 rounded-r"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div>
                    {user?.email_verified ? (
                      <div className="flex items-center pt-1 text-green-400 mt-1">
                        <p className="text-xs">Verified</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width={16}
                          height={16}
                        ></svg>
                      </div>
                    ) : (
                      <div className="flex items-center pt-1 text-amber-800 mt-1">
                        <p className="text-xs mt-0.5">Unverified</p>
                        <button className="text-xs text-blue-600 hover:text-blue-900 hover:underline hover:underline-offset-1 ml-2">
                          Resend verification email
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col mb-6 md:max-w-[300px]">
                  <label
                    htmlFor="FullName"
                    className="pb-2 text-sm text-gray-800 dark:text-gray-100"
                  >
                    Full name:
                  </label>
                  <div className="shadow-sm rounded flex">
                    <input
                      {...register('fullName')}
                      id="FullName"
                      defaultValue={user?.fullName ?? ''}
                      name="fullName"
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 bg-transparent text-gray-500 dark:text-gray-400 rounded !border-[#6b7280] border border-solid box-border"
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-6 md:max-w-[300px]">
                  <label htmlFor="Gender" className="pb-2 text-sm text-gray-800 dark:text-gray-100">
                    Gender*:
                  </label>
                  <div className="rounded flex">
                    <select
                      {...register('gender')}
                      id="Gender"
                      name="gender"
                      defaultValue={user?.gender}
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 bg-transparent text-gray-500 dark:text-gray-400 rounded max-w-[300px]"
                    >
                      <option value="MALE">Male</option>
                      <option value="FEMALE">Female</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col mb-6 max-w-[300px] profile-dob">
                  <label htmlFor="DOB" className="pb-2 text-sm text-gray-800 dark:text-gray-100">
                    Date of birth*:
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      defaultValue={dob}
                      sx={{ backgroundColor: '#F8F8F8' }}
                      onChange={(newValue: any) => {
                        setValue('dob', newValue);
                      }}
                      className={'text-gray-500'}
                      slotProps={{
                        textField: {
                          helperText: 'MM/DD/YYYY',
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>

                <div className="flex flex-col mb-6 md:max-w-[300px]">
                  <label htmlFor="Phone" className="pb-2 text-sm text-gray-800 dark:text-gray-100">
                    Phone*:
                  </label>
                  <div className="shadow-sm rounded flex">
                    <div className="px-6 py-3 dark:text-gray-100 flex items-center bg-[#F8F8F8] !border-[#6b7280] border border-solid box-border border-r-0 rounded-l">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </div>
                    <input
                      {...register('phone')}
                      type="tel"
                      defaultValue={user?.phone}
                      readOnly
                      id="Phone"
                      name="phone"
                      className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 bg-transparent text-gray-500 dark:text-gray-400 rounded-r"
                      placeholder="example@gmail.com"
                    />
                  </div>
                  <div className="flex items-center pt-1 text-green-400 mt-1">
                    <p className="text-xs">Verified</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width={16}
                      height={16}
                    >
                      <path
                        className="heroicon-ui"
                        d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-2.3-8.7l1.3 1.29 3.3-3.3a1 1 0 0 1 1.4 1.42l-4 4a1 1 0
                              0 1-1.4 0l-2-2a1 1 0 0 1 1.4-1.42z"
                        stroke="currentColor"
                        strokeWidth="0.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>

                <div>
                  <input
                    type="submit"
                    value="Update profile"
                    className="bg-[#5C98F2] px-4 py-3 my-5 md:my-5 lg:my-0 xl:my-0 rounded-md text-white hover:bg-blue-500"
                  />
                </div>
              </div>
              <div className={'flex flex-col mb-8 md:px-10 md:basis-1/3'}>
                <div className="w-[277px] text-gray-700 mb-4 text-sm">Profile picture:</div>
                <div className={'w-[220px] h-[220px]'}>
                  <FilePond
                    files={files}
                    allowReorder={true}
                    allowFileTypeValidation={true}
                    allowImageCrop={true}
                    allowImageExifOrientation={true}
                    allowImageResize={true}
                    allowImageTransform={true}
                    allowMultiple={false}
                    imagePreviewHeight={170}
                    imageCropAspectRatio={'1:1'}
                    imageResizeTargetWidth={200}
                    imageResizeTargetHeight={200}
                    stylePanelLayout={'compact circle'}
                    styleLoadIndicatorPosition={'center bottom'}
                    styleProgressIndicatorPosition={'right bottom'}
                    styleButtonRemoveItemPosition={'left bottom'}
                    styleButtonProcessItemPosition={'right bottom'}
                    onupdatefiles={setFiles}
                    onpreparefile={(file, output) => {
                      setEditFile(output);
                      console.log(file);
                      console.log(output);
                    }}
                    imageEditEditor={create()}
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </div>
              </div>
            </div>
          </form>
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}
