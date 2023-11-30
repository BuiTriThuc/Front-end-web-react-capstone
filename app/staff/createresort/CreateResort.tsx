'use client';

import React, { useEffect, useState } from 'react';
import InputCreateResort from './InputCreateResort';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import InputCreatePropertyType from './InputCreatePropertyType';
import InputAmenitiesType from './InputAmenitiesType';
import useAxiosAuthClient from '@/app/hooks/useAxiosAuthClient';
import { Textarea } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/lib/mapbox-gl-geocoder.css';
import 'mapbox-gl/dist/mapbox-gl.css';

import SelectRouterStaff from '@/app/components/staff/SelectRouterStaff';
import Input from '@/shared/Input';
import FormItem from '@/shared/FormItem';
import Label from '@/shared/Label';
import HeadingDashboard from '@/app/components/HeadingDashboard';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVuZ3BkMTcwNTAxIiwiYSI6ImNsbmMycGJldjBoNWUyeXBnZXM3aXhhYXEifQ.H-6U4cHRC5mRfJKH4GI0qQ';

export interface CreateResortProps {
  amenitiesArray?: any;
  propertyTypesArray?: any;
}

export interface Context {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  short_code?: string;
  text_en_US: string;
  language_en_US: string;
  text: string;
  language: string;
}

export interface Geometry {
  coordinates: number[];
  type?: string | undefined;
}

export interface Properties {
  foursquare: string;
  landmark: boolean;
  category: string;
}

export interface Place {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_en_US: string;
  place_name_en_US: string;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface District {
  code: string;
  name: string;
  type: string;
}

export interface StateOrProvince {
  code: string;
  name: string;
  type: string;
}

export interface Country {
  name: string;
  code: string;
}

export interface Location {
  addressLine: string;
  latitude: number;
  longitude: number;
  postalCode: string;
  locationFormattedName: string;
  locationDescription: string;
  locationCode: string;
  district: District;
  stateOrProvince: StateOrProvince;
  country: Country;
}

export function mapPlaceToLocation(place: Place): Location {
  return {
    addressLine:
      place.place_name
        ?.replace(` ${place?.context?.[0]?.text ?? ''}`, '')
        .replace(`${place?.text ?? ''},`, '')
        .trim() || '',
    latitude: place.geometry.coordinates[1] || 0,
    longitude: place.geometry.coordinates[0] || 0,
    locationFormattedName:
      place.place_name?.replace(` ${place?.context?.[0]?.text ?? ''}`, '') || '',
    locationDescription: '',
    locationCode: place.id || '',
    postalCode: place.context.find((ctx) => ctx.id.startsWith('postcode.'))?.text || '',
    district: {
      code: place.context?.[place.context.length - 3]?.id || '',
      name: place.context?.[place.context.length - 3]?.text || '',
      type: 'locality',
    },
    stateOrProvince: {
      code: place.context?.[place.context.length - 2]?.id || '',
      name: place.context?.[place.context.length - 2]?.text || '',
      type: 'region',
    },
    country: {
      name: place.context.find((ctx) => ctx.id.startsWith('country.'))?.text || '',
      code: place.context.find((ctx) => ctx.id.startsWith('country.'))?.id || '',
    },
  };
}

export type ContextType = 'country.' | 'postcode.';
export const createContextHandler =
  (type: ContextType) => (e: React.ChangeEvent<HTMLInputElement>, prevState: Place | undefined) => {
    let updatedContext = [...(prevState?.context || [])];
    let contextIndex = updatedContext.findIndex((ctx) => ctx?.id?.startsWith(type)) ?? -1;
    updatedContext[contextIndex].text = e.target.value ?? '';
    return {
      ...prevState,
      context: updatedContext,
    } as Place;
  };

export const createContextHandlerAdministrationLevel =
  (indexLevel: number) =>
  (e: React.ChangeEvent<HTMLInputElement>, prevState: Place | undefined) => {
    let updatedContext = [...(prevState?.context || [])];
    let contextIndexLength = updatedContext.length;
    updatedContext[contextIndexLength - indexLevel - 1].text = e.target.value ?? '';
    return {
      ...prevState,
      context: updatedContext,
    } as Place;
  };

const CreateResort: React.FC<CreateResortProps> = ({ amenitiesArray, propertyTypesArray }) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<any[]>([]);
  const [location, setLocation] = useState<Place>();
  const [locationContextLength, setLocationContextLength] = useState<number>(3);
  const router = useRouter();
  const handleCountryChange = createContextHandler('country.');
  const handlePostcodeChange = createContextHandler('postcode.');
  const handleDistrictChange = createContextHandlerAdministrationLevel(2);
  const handleProvinceChange = createContextHandlerAdministrationLevel(1);

  const handleChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles) {
      setFile(selectedFiles);
    }
  };

  const axiosAuthClient = useAxiosAuthClient();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

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

  const handleImageChange = (newImage: any[]) => {
    setCustomeValue('resortImage', newImage);
  };

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
    };
    const resortDataBlob = new Blob([JSON.stringify(requestData)], {
      type: 'application/json',
    });
    formData.append('resort', resortDataBlob);
    file.forEach((element) => {
      formData.append('resortImage', element);
    });
    const config = {
      headers: { Authorization: `Bearer ${session?.user.access_token}` },
    };
    console.log(mapPlaceToLocation(location as Place));
    axios
      .post(`https://holiday-swap.click/api/v1/resorts`, formData, config)
      .then(() => {
        toast.success('Create resort success');
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
    const mapboxglMap = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [106.660172, 10.762622],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker({ draggable: true, color: 'orange' });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      reverseGeocode: true,
      marker: false,
    });
    geocoder.setCountries('VN');//ISO 3166-1 alpha-2 country codes, separated by commas
    mapboxglMap.addControl(geocoder, 'top-left');
    geocoder.on('result', (e: any) => {
      setLocation(e.result as Place);
      setLocationContextLength(e.result.context.length);
      console.log(e.result);
      marker.setLngLat(e.result.geometry.coordinates).addTo(mapboxglMap);
    });

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
  }, []);

  return (
    <div>
      <HeadingDashboard
        routerDashboard="/staff"
        pageCurrentContent="Create resort"
        pageCurrentRouter="/staff/createresort"
      />
      <SelectRouterStaff />

      <div className="mb-14 mt-5">
        <div className="mb-3">Upload Image*</div>
        {/* <UploadImageResortCreate handleImageChange={handleImageChange} /> */}
        <div>
          <input
            {...register('resortImage', {
              required: 'Recipe picture is required',
            })}
            type="file"
            id="resortImage"
            multiple
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="w-[700px]">
        <div className=" flex flex-row mb-14">
          <InputCreateResort
            label="Resort Name*"
            placeholder="Resort Name"
            register={register}
            errors={errors}
            id="resortName"
            disabled={isLoading}
            required
          />
        </div>

        <div className=" flex flex-row mb-14">
          <div className="w-[277px] text-gray-700">Description</div>
          <textarea
            className="w-full rounded-md   border-2 border-gray-500"
            // label="Description*"
            {...register('resortDescription')}
            id="resortDescription"
            disabled={isLoading}
            required
          />
        </div>
        <div className=" flex flex-row mb-14">
          <div className="w-[277px] text-gray-700">Address*</div>
          <div id="map" className="w-full h-96"></div>
        </div>
        <FormItem label="Country">
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
            {location && (
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
        <div className="flex flex-row mb-14">
          <InputAmenitiesType
            amenities={amenitiesArray}
            handleAmenitiesChange={handleAmenitiesChange}
          />
        </div>
        <div className="flex flex-row mb-10">
          <InputCreatePropertyType
            propertyTypesResort={propertyTypesArray}
            handlePropertiesChange={handlePropertiesChange}
          />
        </div>
        

        {/* <div className=" flex flex-row mb-14">
          <div className="w-[277px] text-gray-700">Detail*</div>
          <textarea
            className="w-full border border-gray-500 px-2 py-2"
            name=""
            id=""
            cols={50}
            rows={10}
          ></textarea>
        </div> */}
        <div>
          <button
            onClick={handleSubmit(onSubmit)}
            className="bg-[#5C98F2] px-4 py-3 mb-10 rounded-md text-white hover:bg-blue-500"
          >
            Create Resort
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateResort;
