import { GoogleMap, GoogleMapProps, useJsApiLoader } from "@react-google-maps/api"
import { FunctionComponent, useEffect } from "react"
import Loader from "./Loader"
import { twMerge } from "tailwind-merge"

interface Props extends GoogleMapProps {
  setIsLoaded?: Function
}

const GoogleMapWrapper: FunctionComponent<Props> = ({
  children,
  setIsLoaded,
  mapContainerClassName,
  mapContainerStyle,
  ...rest
}) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAqq7eY78AXBKm_HGmapE-LU4TTFiPvoVs",
    libraries: ["places"],
  })

  useEffect(() => {
    if (setIsLoaded) setIsLoaded(isLoaded)
  }, [isLoaded, setIsLoaded])

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={mapContainerClassName}
      mapContainerStyle={mapContainerStyle}
      {...rest}
    >
      {children}
    </GoogleMap>
  ) : (
    <div
      className={twMerge(mapContainerClassName, "flex flex-row justify-center items-center")}
      style={mapContainerStyle}
    >
      <Loader size="40px" />
    </div>
  )
}

export default GoogleMapWrapper
