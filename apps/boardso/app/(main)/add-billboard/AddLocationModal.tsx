"use client"

import { ModalHandler } from "@/types/Modal"
import {
  UIButton,
  UIConnectInput,
  UIDropdown,
  UIForm,
  UIList,
  UIListItem,
  UIModal,
  UIModalBody,
  UIModalFooter,
  UIModalHeader,
  UITypography,
  hasError,
  notification,
  useZodForm,
} from "ui"
import { MarkerF } from "@react-google-maps/api"
import { useEffect, useState } from "react"
import { object, string } from "zod"
import { BiSearch } from "react-icons/bi"
import GoogleMapWrapper from "../../components/GoogleMapWrapper"
import { LocationCoordinates } from "@/types/index"

type Props = {
  open: boolean
  handleOpen: ModalHandler
  setLocationDetails: Function
}

export default function AddLocationModal({ open, handleOpen, setLocationDetails }: Props) {
  const [autocompletePlaces, setAutocompletePlaces] = useState<
    google.maps.places.AutocompletePrediction[]
  >([])
  const [autocompleteMenuOpen, setAutocompleteMenuOpen] = useState(false)

  const [map, setMap] = useState<google.maps.Map>()

  // defaults to Tema
  const [center, setCenter] = useState<LocationCoordinates>({
    lat: 5.709749,
    lng: 0.018562,
  })

  const [markerCoordinates, setMarkerCoordinates] = useState<LocationCoordinates>({
    lat: 5.709749,
    lng: 0.018562,
  })

  const [autocompleteLoading, setAutocompleteLoading] = useState(false)

  const [saveLoading, setSaveLoading] = useState(false)

  const searchPlaceSchema = object({
    place: string().min(1, { message: "Enter a place to continue" }),
  })

  const form = useZodForm({
    schema: searchPlaceSchema,
    mode: "onSubmit",
  })

  // prompt user for permission to access their location if supoorted by the browser
  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude

          setCenter({ lat, lng })
          setMarkerCoordinates({ lat, lng })
        },
        (error) => {
          notification("error", `Error getting user location: ${error.message}`)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
        }
      )
    }
  }

  useEffect(() => {
    getUserLocation()
  }, [])

  // load autocomplete predictions
  const onSearch = ({ place }: { place: string }) => {
    setAutocompleteLoading(true)
    const autocomplete = new google.maps.places.AutocompleteService()
    autocomplete.getPlacePredictions({ input: place }, (predictions, status) => {
      if (status === "OK" && predictions !== null) {
        setAutocompletePlaces(predictions)
        setAutocompleteMenuOpen(true)
      } else {
        notification("error", "An error occurred while loading autocomplete predictions. Try again")
      }
      setAutocompleteLoading(false)
    })
  }

  const processLocation = (result: google.maps.GeocoderResult) => {
    let location: any = {}
    const locationTypes = [
      { name: "route", key: "route" },
      { name: "neighbourhood", key: "neighbourhood" },
      { name: "sublocality", key: "sublocality" },
      { name: "locality", key: "locality" },
      { name: "administrative_area_level_3", key: "administrativeAreaLevel3" },
      { name: "administrative_area_level_2", key: "administrativeAreaLevel2" },
      { name: "administrative_area_level_1", key: "administrativeAreaLevel1" },
      { name: "country", key: "country" },
    ]
    const addressComponents = result["address_components"]
    locationTypes.forEach((type) => {
      for (let i = 0; i < addressComponents.length; i++) {
        if (addressComponents[i].types.includes(type.name)) {
          location[type.key] = addressComponents[i].long_name
          addressComponents.splice(i, 1)
        }
      }
    })

    location = { ...location, address: result["formatted_address"], coordinates: markerCoordinates }

    setLocationDetails(location)
  }

  // runs when a user clicks on an autocomplete prediction
  const onAutocompleteOptionClick = (place: google.maps.places.AutocompletePrediction): void => {
    const { place_id: placeId, description } = place
    // set the search input value to the selected prediction
    form.setValue("place", description)
    setAutocompleteLoading(true)
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode(
      { placeId },
      function (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) {
        if (status === "OK" && results !== null) {
          const location: google.maps.LatLng = results[0].geometry.location
          setCenter(location.toJSON())
          setMarkerCoordinates(location.toJSON())
        } else {
          notification("error", "An error occurred while searching the place. Try again")
        }
        setAutocompleteLoading(false)
        setAutocompleteMenuOpen(false)
      }
    )
  }

  // runs when user clicks on save button
  const onSave = (location: LocationCoordinates) => {
    setSaveLoading(true)
    const geocoder = new google.maps.Geocoder()
    geocoder.geocode(
      { location },
      (results: google.maps.GeocoderResult[] | null, status: google.maps.GeocoderStatus) => {
        if (status === "OK" && results !== null) {
          processLocation(results[0])
          form.reset()
          handleOpen(false)
          notification("success", "Location added successfully")
        } else {
          notification("error", "An error occurred while adding location. Try again")
        }
        setSaveLoading(false)
      }
    )
  }

  return (
    <UIModal size="lg" className="min-w-[300px]" open={open} handler={handleOpen}>
      <UIModalHeader className="flex flex-col  gap-2">
        <div className="flex flex-row justify-between items-center w-full">
          <UITypography variant="h4" color="blue-gray" className="font-medium">
            Add Location
          </UITypography>
          <div className="flex  flex-row gap-1">
            <UIButton variant="text" size="md" onClick={() => handleOpen(false)}>
              Cancel
            </UIButton>
            <UIButton size="md" loading={saveLoading} onClick={() => onSave(markerCoordinates)}>
              Save
            </UIButton>
          </div>
        </div>
        <div className="w-full flex flex-row justify-center">
          <UIForm
            form={form}
            onSubmit={onSearch}
            className="flex flex-row items-center justify-start gap-1 w-max"
          >
            <div className="flex">
              <div className="relative">
                <UIDropdown
                  isOpen={autocompleteMenuOpen}
                  setIsOpen={setAutocompleteMenuOpen}
                  list={
                    <UIList className="overflow-y-auto">
                      {autocompletePlaces.map((place) => (
                        <UIListItem
                          key={place.description}
                          onClick={() => onAutocompleteOptionClick(place)}
                        >
                          <UITypography className="text-xs">{place.description}</UITypography>
                        </UIListItem>
                      ))}
                    </UIList>
                  }
                >
                  <UIConnectInput
                    type="text"
                    placeholder="Search places"
                    className="bg-white !w-[250px] rounded-r-none"
                    name="place"
                    error={hasError(form, "place")}
                  />
                </UIDropdown>
              </div>
              <UIButton
                className="rounded-l-none text-[22px] py-1 px-3"
                type="submit"
                loading={autocompleteLoading}
                icon={<BiSearch />}
              >
              </UIButton>
            </div>
          </UIForm>
        </div>
      </UIModalHeader>
      <UIModalBody className="p-0">
        <GoogleMapWrapper
          mapContainerClassName="w-full h-[400px]"
          center={center}
          zoom={16}
          onLoad={(map) => {
            setMap(map)
          }}
          onDrag={() => {
            const location: google.maps.LatLng | undefined = map?.getCenter()
            setMarkerCoordinates({ ...markerCoordinates, ...location?.toJSON() })
          }}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
          }}
        >
          <MarkerF
            position={markerCoordinates}
            draggable
            onDragEnd={(e: google.maps.MapMouseEvent) => {
              let coordinates = e?.latLng?.toJSON()
              if (coordinates) {
                setCenter(coordinates)
                setMarkerCoordinates(coordinates)
              }
            }}
          />
        </GoogleMapWrapper>
      </UIModalBody>
      <UIModalFooter className="flex flex-row items-center ">
        <div className="flex flex-row items-center">
          <UITypography variant="small" className="font-bold">
            Latitude:
          </UITypography>
          <UITypography variant="small" className="ml-1">
            {markerCoordinates.lat}
          </UITypography>
        </div>
        <div className="flex flex-row items-center ml-2">
          <UITypography variant="small" className="font-bold">
            Longitude:
          </UITypography>{" "}
          <UITypography variant="small" className="ml-1">
            {markerCoordinates.lng}
          </UITypography>
        </div>
      </UIModalFooter>
    </UIModal>
  )
}
