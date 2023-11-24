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

mapboxgl.accessToken =
  'pk.eyJ1IjoiaHVuZ3BkMTcwNTAxIiwiYSI6ImNsbmMycGJldjBoNWUyeXBnZXM3aXhhYXEifQ.H-6U4cHRC5mRfJKH4GI0qQ';

interface CreateResortProps {
  amenitiesArray?: any;
  propertyTypesArray?: any;
}

interface Context {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  short_code?: string;
  text_en_US: string;
  language_en_US: string;
  text: string;
  language: string;
}

interface Geometry {
  coordinates: number[];
  type?: string | undefined;
}

interface Properties {
  foursquare: string;
  landmark: boolean;
  category: string;
}

interface Place {
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

interface District {
  code: string;
  name: string;
  type: string;
}

interface StateOrProvince {
  code: string;
  name: string;
  type: string;
}

interface Country {
  name: string;
  code: string;
}

interface Location {
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

function mapPlaceToLocation(place: Place): Location {
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

type ContextType = 'country.' | 'postcode.';
const createContextHandler =
  (type: ContextType) => (e: React.ChangeEvent<HTMLInputElement>, prevState: Place | undefined) => {
    let updatedContext = [...(prevState?.context || [])];
    let contextIndex = updatedContext.findIndex((ctx) => ctx?.id?.startsWith(type)) ?? -1;
    updatedContext[contextIndex].text = e.target.value ?? '';
    return {
      ...prevState,
      context: updatedContext,
    } as Place;
  };

const createContextHandlerAdministrationLevel =
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

interface EditResortProps {
  resortDetail: any;
  amineties: any;
  propertyTypes: any;
}

const EditResort: React.FC<EditResortProps> = ({ resortDetail, amineties, propertyTypes }) => {
  const [resortNameValue, setResortNameValue] = useState(resortDetail.resortName);
  const [isLoading, setIsLoading] = useState(false);
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
      <div className="mb-14">
        <div className="mb-3">Upload Image*</div>
        <UploadImageResortEdit
          resortImages={images}
          handleAddOldImages={handleAddOldImages}
          handeChangeNewImages={handeChangeNewImages}
        />
      </div>
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