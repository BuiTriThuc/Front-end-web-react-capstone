'use client';

import InputComponent from '@/app/components/input/Input';
import UploadImageResortEdit from '@/app/components/staff/UploadImageResortEdit';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputAmenitiesType from './InputAmenitiesType';
import InputCreatePropertyType from './InputCreatePropertyType';
import { Textarea } from 'flowbite-react';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import SelectRouterStaff from '@/app/components/staff/SelectRouterStaff';
import Input from '@/shared/Input';
import FormItem from '@/shared/FormItem';
import Label from '@/shared/Label';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import {
  Place,
  createContextHandler,
  createContextHandlerAdministrationLevel,
  mapPlaceToLocation,
} from '@/app/staff/createresort/CreateResort';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVuZ3BkMTcwNTAxIiwiYSI6ImNsbmMycGJldjBoNWUyeXBnZXM3aXhhYXEifQ.H-6U4cHRC5mRfJKH4GI0qQ';

interface CreateResortProps {
  amenitiesArray?: any;
  propertyTypesArray?: any;
}

interface EditResortProps {
  resortDetail: any;
  amineties: any;
  propertyTypes: any;
  fetchLocation: Place;
}

const EditResort: React.FC<EditResortProps> = ({
  resortDetail,
  amineties,
  propertyTypes,
  fetchLocation,
}) => {
  const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;
  const [resortNameValue, setResortNameValue] = useState(resortDetail.resortName);
  const [isLoading, setIsLoading] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [resortDescriptionValue, setResortDescriptionValue] = useState(
    resortDetail.resortDescription
  );
  const [images, setImages] = useState<any>(resortDetail.resortImages);
  const [oldImages, setOldImages] = useState<any[]>(resortDetail.resortImages);
  const [amenitiesValue, setAmeniteisValue] = useState<any[]>(resortDetail.resortAmenityTypes);
  const [propertyTypesValue, setPropertyTypesValue] = useState<any[]>(resortDetail.propertyTypes);
  const [newImages, setNewImages] = useState<any[]>([]);
  const { data: session } = useSession();
  const [location, setLocation] = useState<Place>();
  const [locationContextLength, setLocationContextLength] = useState<number>(3);
  const router = useRouter();
  const handleCountryChange = createContextHandler('country.');
  const handlePostcodeChange = createContextHandler('postcode.');
  const handleDistrictChange = createContextHandlerAdministrationLevel(2);
  const handleProvinceChange = createContextHandlerAdministrationLevel(1);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const formData = new FormData();

    const requestData = {
      resortName: data.resortName,
      resortDescription: data.resortDescription,
      locationId: null,
      location: mapPlaceToLocation(location as Place),
      amenities: data.amenities,
      propertyTypes: data.propertyTypes,
      oldImages: oldImages.map((item: any) => item.link),
    };

    const resortDataBlob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json',
    });

    formData.append('resortRequest', resortDataBlob);

    newImages.forEach((element) => {
      formData.append('resortImage', element);
    });
    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    };
    console.log(mapPlaceToLocation(location as Place));
    axios
      .put(`https://holiday-swap.click/api/v1/resorts/${resortDetail.id}`, formData, config)
      .then(() => {
        toast.success('Update resort success');
        reset();
        router.push('/staff/listresort');
      })
      .catch((response) => {
        toast.error(response.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setMapLoaded(false);
    const mapboxglMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [106.660172, 10.762622],
      zoom: 14,
    });

    resortDetail?.longitude &&
      resortDetail?.latitude &&
      mapboxglMap.setCenter([resortDetail?.longitude, resortDetail?.latitude]);
    const marker = new mapboxgl.Marker({ draggable: true, color: 'orange' });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      reverseGeocode: true,
      marker: false,
    });
    marker &&
      resortDetail?.longitude &&
      resortDetail?.latitude &&
      marker.setLngLat([resortDetail?.longitude, resortDetail?.latitude]).addTo(mapboxglMap);
    mapboxglMap.addControl(geocoder, 'top-left');
    geocoder.setCountries('VN'); //ISO 3166-1 alpha-2 country codes, separated by commas
    geocoder.on('result', (e: any) => {
      setLocation(e.result as Place);
      setLocationContextLength(e.result.context.length);
      marker.setLngLat(e.result.geometry.coordinates).addTo(mapboxglMap);
    });
    setLocation(fetchLocation);
    setLocationContextLength(fetchLocation?.context?.length ?? 3);
    marker.on('dragend', () => {
      const lngLat = marker.getLngLat();
      setLocation((prev) => {
        return {
          ...prev,
          geometry: {
            ...prev?.geometry,
            coordinates: [lngLat.lng, lngLat.lat],
          },
        } as Place;
      });
    });
    setMapLoaded(true);
  }, []);

  const setCustomeValue = (id: string, value: any[]) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const handleAmenitiesChange = (newAmenities: any[]) => {
    setCustomeValue('amenities', newAmenities);
  };

  const handlePropertiesChange = (newProperties: any[]) => {
    setCustomeValue('propertyTypes', newProperties);
  };

  const handleAddOldImages = (image: any) => {
    if (image) {
      setOldImages(oldImages.filter((prev) => prev.id !== image.id));
    }
  };

  const handeChangeNewImages = (image: any) => {
    if (image) {
      setNewImages((old) => [...old, image]);
    }
  };

  return (
    <div className="py-10">
      <div className="w-[700px]">
        <div className=" flex flex-row mb-10">
          <InputComponent
            value={resortNameValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setResortNameValue(e.target.value)}
            id="resortName"
            register={register}
            errors={errors}
            label="Resort Name"
          />
        </div>
        <div className=" flex flex-col mb-14">
          <label>Resort description</label>
          <Textarea
            id="resortDescription"
            value={resortDescriptionValue}
            placeholder="Leave a comment..."
            required
            rows={10}
            {...register('resortDescription', {
              onChange: (e) => {
                setResortDescriptionValue(e.target.value);
              },
            })}
          />
        </div>
      </div>
      <div className="mb-14">
        <div className="mb-3">Upload Image*</div>
        <UploadImageResortEdit
          resortImages={images}
          handleAddOldImages={handleAddOldImages}
          handeChangeNewImages={handeChangeNewImages}
        />
      </div>
      <div className="w-[700px]">
        <div className=" flex flex-row mb-14">
          <div className="w-[277px] text-gray-700">Address*</div>
          <div id="map" className="w-full h-96"></div>
        </div>
        <FormItem label="Country" className="hidden">
          <Input
            placeholder="..."
            value={location?.context?.find((ctx) => ctx.id.startsWith('country.'))?.text}
            onChange={(e: any) => setLocation((prevState) => handleCountryChange(e, prevState))}
          />
        </FormItem>
        <FormItem label="Address Line">
          <Input
            placeholder="..."
            value={location?.place_name
              ?.replace(
                ` ${location?.context?.find((ctx) => ctx.id.startsWith('postcode.'))?.text ?? ''},`,
                ''
              )
              .replace(`${location?.text ?? ''},`, '')
              .trim()}
            onChange={(e: any) =>
              setLocation((prevState) => {
                return {
                  ...prevState,
                  place_name: e.target.value ?? '',
                } as Place;
              })
            }
          />
        </FormItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-5">
          <FormItem label="District/City">
            {locationContextLength && (
              <Input
                value={location?.context[locationContextLength - 3]?.text ?? ''}
                onChange={(e: any) =>
                  setLocation((prevState) => handleDistrictChange(e, prevState))
                }
              />
            )}
          </FormItem>
          <FormItem label="Province/State">
            {locationContextLength && (
              <Input
                value={location?.context[locationContextLength - 2]?.text ?? ''}
                onChange={(e: any) =>
                  setLocation((prevState) => handleProvinceChange(e, prevState))
                }
              />
            )}
          </FormItem>
          <FormItem label="Postal code">
            <Input
              value={location?.context?.find((ctx) => ctx.id.startsWith('postcode.'))?.text}
              onChange={(e: any) => setLocation((prevState) => handlePostcodeChange(e, prevState))}
            />
          </FormItem>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-5">
          <FormItem label="Longtitude">
            <Input
              value={location?.geometry?.coordinates?.[0]}
              onChange={(e: any) =>
                setLocation((prevState) => {
                  let lngLat = prevState?.geometry?.coordinates;
                  lngLat
                    ? (lngLat[0] = Number(e.target.value))
                    : ([] = e.target.value ? [e.target.value] : []);
                  return {
                    ...prevState,
                    geometry: {
                      ...prevState?.geometry,
                      coordinates: lngLat,
                    },
                  } as Place;
                })
              }
            />
          </FormItem>
          <FormItem label="Latitude">
            <Input
              value={location?.geometry?.coordinates?.[1]}
              onChange={(e: any) =>
                setLocation((prevState) => {
                  let lngLat = prevState?.geometry?.coordinates;
                  lngLat
                    ? (lngLat[1] = Number(e.target.value))
                    : ([] = e.target.value ? [e.target.value] : []);
                  return {
                    ...prevState,
                    geometry: {
                      ...prevState?.geometry,
                      coordinates: lngLat,
                    },
                  } as Place;
                })
              }
            />
          </FormItem>
        </div>
        <div className="mb-10">
          <Label>Detailed address</Label>
          <span className="block w-full mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            {mapLoaded && location && (
              <span>
                {`${location?.text ?? ''}, ` +
                  location?.place_name
                    ?.replace(
                      ` ${
                        location?.context?.find((ctx) => ctx.id.startsWith('postcode.'))?.text ?? ''
                      },`,
                      ''
                    )
                    .replace(`${location?.text ?? ''},`, '')
                    .trim()}
              </span>
            )}
          </span>
        </div>

        <div className="flex flex-row items-center mb-10">
          <InputAmenitiesType
            amenities={amineties}
            handleAmenitiesChange={handleAmenitiesChange}
            amenitiesArray={amenitiesValue}
          />
        </div>

        <div className="flex flex-row items-center mb-10">
          <InputCreatePropertyType
            propertyTypesResort={propertyTypes}
            handlePropertiesChange={handlePropertiesChange}
            propertyTypesArray={propertyTypesValue}
          />
        </div>

        <div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#5C98F2] px-4 py-3 mb-10 rounded-md text-white hover:bg-blue-500"
          >
            Update Resort
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditResort;
