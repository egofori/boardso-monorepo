"use client"

import { useAddBillboard, useEditBillboard, useGetBillboard, useGetImages } from "@/services/hooks"
import { useEffect, useMemo, useState } from "react"
import { BiPlus } from "react-icons/bi"
import { IoCloseSharp, IoLocationSharp } from "react-icons/io5"
import {
  hasError,
  notification,
  UIButton,
  UICard,
  UIDropdownButton,
  UIFieldError,
  UIForm,
  UIInput,
  UIMenuItem,
  UIMenuList,
  UIOption,
  UISelect,
  UISwitch,
  UITextarea,
  UITooltip,
  UITypography,
  useZodForm,
} from "ui"
import { object, number, string, literal } from "zod"
import AddLocationModal from "./AddLocationModal"
import { ModalHandler } from "@/types/Modal"
import { MarkerF } from "@react-google-maps/api"
import GoogleMapWrapper from "./GoogleMapWrapper"
import {
  billboardTypes,
  currencies,
  periods,
  unitsOfMeasurement,
  useProtectedRoute,
} from "../../utils"
import { ImageCard } from "@/components/ImageCard"
import { useDisableAddBillboard } from "@/utils/hooks"
import { useParams, useRouter } from "next/navigation"
import { UserStatus } from "@/types/User"
import { AxiosError } from "axios"
import { useGetUserStatus } from "@/services/hooks/users"
import InfoPopover from "@/components/InfoPopover"
import { twMerge } from "tailwind-merge"
import { Billboard } from "@/types/Billboard"
import Loader from "./Loader"

export default function AddEditBillboardCard() {
  const { uid } = useParams<{ uid: string }>()

  const { trigger: addBillboardTrigger, isLoading: addBillboardLoading } = useAddBillboard()
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const [openLocationModal, setOpenLocationModal] = useState(false)

  const handleOpen: ModalHandler = () => setOpenLocationModal((cur) => !cur)

  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0])

  const [selectedPeriod, setSelectedPeriod] = useState(periods[0])

  const [selectedUnitOfMeasurement, setSelectedUnitOfMeasurement] = useState(unitsOfMeasurement[0])

  const [selectedBillboardType, setSelectedBillboardType] = useState(billboardTypes[0])

  const [locationDetails, setLocationDetails] = useState<any>(null)

  const disableAddBillboard = useDisableAddBillboard()

  const router = useRouter()

  const [maxImages, setMaxImages] = useState(5)

  const [showPrice, setShowPrice] = useState(true)

  const { data: statusData }: { data: UserStatus; error: AxiosError; isLoading: boolean } =
    useGetUserStatus()

  // check if user hasn't exhausted their limit
  useEffect(() => {
    if (disableAddBillboard) {
      notification("info", "Subscribe to add more billboard listings")
      router.push("/")
    }
  }, [disableAddBillboard, router])

  useEffect(() => {
    if (statusData) {
      if (statusData.isSubscriptionActive) setMaxImages(10)
    }
  }, [statusData])

  const amountSchema = number({
    coerce: true,
    invalid_type_error: "Invalid price value",
  }).gt(0, "Invalid price value")

  const billboardSchema = object({
    title: string().min(1, { message: "Title must not be empty" }),
    width: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    }).gt(0, "Invalid dimension value"),
    height: number({
      coerce: true,
      invalid_type_error: "Invalid dimension value",
    }).gt(0, "Invalid dimension value"),
    description: string().optional(),
    amount: showPrice ? amountSchema : amountSchema.optional().or(literal("")),
  })

  const form = useZodForm({
    schema: billboardSchema,
    mode: "all",
  })
    
    console.log("form", form.formState.errors)

  const menu = (data: Array<any>, onClick: Function) => (
    <UIMenuList className="max-h-[500px] max-w-[100px] rounded-xl">
      {data.map((row: any) => (
        <UIMenuItem key={row.value} onClick={() => onClick(row)}>
          <UITypography className="text-tertiary-800">{row.label}</UITypography>
        </UIMenuItem>
      ))}
    </UIMenuList>
  )

  const onSelectImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files

    if (files) {
      if (files.length + selectedImages.length > maxImages) {
        notification("error", `Users can upload up to ${maxImages} images`, { autoClose: 4000 })
        return
      }
      let filesArray = Array.from(files)
      let images = filesArray.map((file) => URL.createObjectURL(file))

      setSelectedImages([...selectedImages, ...filesArray])
      setImagePreviews([...imagePreviews, ...images])
    }
  }

  const onAddBillboardSubmit = (data: any) => {
    if (!locationDetails) {
      notification("error", "Add location")
      return
    }
    if (selectedImages.length === 0) {
      notification("error", "Add at least one image")
      return
    }
    const formData = new FormData()
    selectedImages.map((image) => formData.append("images", image))
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("width", data.width)
    formData.append("height", data.height)
    formData.append("price", data.amount ?? null)
    formData.append("rate", selectedPeriod.value)
    formData.append("currency", selectedCurrency.value)
    formData.append("type", selectedBillboardType.value)
    formData.append("location", JSON.stringify(locationDetails))
    formData.append("dimensionUnit", selectedUnitOfMeasurement.value)

    addBillboardTrigger(
      {
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      },
      () => {
        // reset form
        form.reset()
        // clear location data
        setLocationDetails(null)
        // clear images
        setSelectedImages([])
        setImagePreviews([])
        notification("success", "Billboard added successfully")
      },
      (error: any) => {
        notification(
          "error",
          error.response?.data?.message || "Error occurred while adding billboard"
        )
      }
    )
  }

  // remove an image from image list
  const removeImage = (i: number) => {
    setImagePreviews((images: any[]) => images.filter((x, j) => j !== i))
    setSelectedImages((images: any[]) => images.filter((x, j) => j !== i))
  }

  //Edit Billboard

  const { data: billboard }: { data: Billboard | null; [x: string]: any } = useGetBillboard({ uid })

  const { trigger: editBillboardTrigger, isLoading: editBillboardLoading } = useEditBillboard(
    billboard?.id
  )

  const billboardImages = useMemo(
    () => billboard?.images?.filter((image) => image.id !== billboard.thumbnailId),
    [billboard]
  )
  const imageURLs = useMemo(
    () => billboardImages?.map((image) => image.url) || [],
    [billboardImages]
  )

  const {
    data: billboardImagesData,
    isLoading: imagesLoading,
    error: billboardImagesError,
  } = useGetImages(imageURLs)

  useEffect(() => {
    if (billboardImagesError)
      notification("error", "Could not load the images. Reload the page to try again.")
  }, [billboardImagesError])

  const onEditBillboardSubmit = (data: any) => {
    if (!locationDetails) {
      notification("error", "Add location")
      return
    }
    if (selectedImages.length === 0) {
      notification("error", "Add at least one image")
      return
    }
    const formData = new FormData()
    selectedImages.map((image) => formData.append("images", image))
    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("width", data.width)
    formData.append("height", data.height)
    formData.append("price", data.amount ?? null)
    formData.append("rate", selectedPeriod.value)
    formData.append("currency", selectedCurrency.value)
    formData.append("type", selectedBillboardType.value)
    formData.append("location", JSON.stringify(locationDetails))
    formData.append("dimensionUnit", selectedUnitOfMeasurement.value)

    editBillboardTrigger(
      {
        data: formData,
        config: {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      },
      () => {
        notification("success", "Billboard edited successfully")
      },
      (error: any) => {
        notification(
          "error",
          error.response?.data?.message || "Error occurred while adding billboard"
        )
      }
    )
  }

  useEffect(() => {
    if (billboard) {
      form.setValue("title", billboard.title)
      if (billboard.price) form.setValue("amount", billboard.price)
      else setShowPrice(false)
      form.setValue("description", billboard.description)
      form.setValue("height", billboard.height)
      form.setValue("width", billboard.width)
      const { lat, lng, ...rest } = billboard.billboardLocation
      setLocationDetails({ coordinates: { lat, lng }, ...rest })
      if (billboardImagesData) {
        const files =
          billboardImagesData.map((imageData, i) => {
            const image = billboardImages?.at(i)
            return new File([imageData], `${image?.name}${image?.extension}`, {
              type: image?.mime,
            })
          }) || []
        setSelectedImages(files)
        const images = files.map((file) => URL.createObjectURL(file))
        setImagePreviews(images)
      }
    }
  }, [billboard, billboardImages, billboardImagesData, form])

  useEffect(() => {
    if (!showPrice) form.setValue("amount", "")
  }, [showPrice])

  return (
    <>
      <UICard className="mx-auto my-5 max-w-3xl p-5 sm:p-10 bg-white">
        <UITypography variant="h3" className="page-card-title">
          {uid ? "Edit Billboard" : "Add Billboard"}
        </UITypography>
        <UIForm
          form={form}
          onSubmit={(data: any) => (uid ? onEditBillboardSubmit(data) : onAddBillboardSubmit(data))}
          className="flex flex-col gap-6 mt-5 sm:mt-10"
        >
          <div>
            <label>
              Add images ({selectedImages.length}/{maxImages})
            </label>
            <div className="pb-4 h-[230px] sm:h-[262px] w-full flex flex-row gap-6 overflow-x-auto">
              {imagePreviews.map((image, i) => (
                <ImageCard key={i} image={image} remove={() => removeImage(i)} />
              ))}
              {/* Owners can upload up to the max number of images */}
              {selectedImages.length! < maxImages && (
                <UITooltip content="Click to add images">
                  <label
                    htmlFor="dropzone-file"
                    className="overflow-hidden flex flex-col items-center justify-center gap-3 w-full h-full min-w-[256px] rounded-lg cursor-pointer bg-primary-100 hover:brightness-[0.98] active:brightness-90"
                  >
                    <div className="bg-primary-200 rounded-full p-1">
                      {imagesLoading ? (
                        <Loader className="text-primary-400 text-4xl" />
                      ) : (
                        <BiPlus className="text-primary-400 text-7xl" />
                      )}
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      multiple
                      accept="image/*"
                      onChange={onSelectImages}
                    />
                  </label>
                </UITooltip>
              )}
            </div>
          </div>
          <div>
            <label>Title</label>
            <UIInput {...form.register("title")} error={hasError(form, "title")} />
            <UIFieldError name="title" />
          </div>
          <div>
            <div className="flex flex-row gap-5 items-center">
              <div className="flex flex-row gap-1 items-center">
                <label>Price</label>
                <InfoPopover content="Toggle the switch to control whether or not the price should be displayed" />
              </div>
              <UISwitch
                color="green"
                checked={showPrice}
                onChange={(e) => setShowPrice(e.target.checked)}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className={twMerge("flex-col w-full", showPrice ? "flex" : "hidden")}>
                <div className="flex">
                  <UIDropdownButton
                    menu={menu(currencies, setSelectedCurrency)}
                    className="border border-r-0 border-gray-200 rounded-r-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case">
                      {selectedCurrency.label}
                    </UITypography>
                  </UIDropdownButton>
                  <UIInput
                    type="text"
                    placeholder="amount"
                    {...form.register("amount")}
                    error={hasError(form, "amount")}
                    className="rounded-l-none rounded-r-none"
                  />
                  <UIDropdownButton
                    menu={menu(periods, setSelectedPeriod)}
                    className="border border-l-0 border-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case whitespace-nowrap">
                      {selectedPeriod.label}
                    </UITypography>
                  </UIDropdownButton>
                </div>
                <div className="h-4">
                  <UIFieldError name="amount" />
                </div>
              </div>
              <UITypography variant="paragraph" className={showPrice ? "hidden" : "block"}>
                No price to display
              </UITypography>
            </div>
          </div>
          <div>
            <label>Type</label>
            <UISelect placeholder="Select billboard type" value={selectedBillboardType.label}>
              {billboardTypes.map((data) => (
                <UIOption
                  key={data.value}
                  value={data.value}
                  onClick={() => setSelectedBillboardType(data)}
                >
                  {data.label}
                </UIOption>
              ))}
            </UISelect>
          </div>
          <div>
            <label>Dimension</label>
            <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
              <div className="flex flex-col w-full">
                <div className="flex">
                  <UIInput
                    type="text"
                    placeholder="width"
                    {...form.register("width")}
                    error={hasError(form, "width")}
                    className="rounded-r-none"
                  />
                  <UIDropdownButton
                    menu={menu(unitsOfMeasurement, setSelectedUnitOfMeasurement)}
                    className="border border-l-0 border-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case">
                      {selectedUnitOfMeasurement.label}
                    </UITypography>
                  </UIDropdownButton>
                </div>
                <div className="h-4">
                  <UIFieldError name="width" />
                </div>
              </div>
              <div className="h-8 w-8 -mt-4 hidden sm:inline-block">
                <IoCloseSharp className="text-3xl text-slate-500" />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex">
                  <UIInput
                    type="text"
                    placeholder="height"
                    {...form.register("height")}
                    error={hasError(form, "height")}
                    className="rounded-r-none"
                  />
                  <UIDropdownButton
                    menu={menu(unitsOfMeasurement, setSelectedUnitOfMeasurement)}
                    className="border border-l-0 border-gray-200 rounded-l-none bg-slate-100 py-1 px-2"
                  >
                    <UITypography className="font-normal normal-case">
                      {selectedUnitOfMeasurement.label}
                    </UITypography>
                  </UIDropdownButton>
                </div>
                <div className="h-4">
                  <UIFieldError name="height" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Description</label>
            <UITextarea {...form.register("description")} error={hasError(form, "description")} />
            <UIFieldError name="description" />
          </div>
          <div
            onMouseDown={(event: React.MouseEvent<HTMLDivElement>) => {
              event.stopPropagation()
              setOpenLocationModal(true)
            }}
          >
            <label>Choose location</label>
            <UITooltip content="Click to add location" dismiss={{ enabled: true }}>
              <div>
                {locationDetails ? (
                  <GoogleMapWrapper
                    center={locationDetails.coordinates}
                    zoom={16}
                    mapContainerClassName="w-full !h-[214px] sm:!h-64 rounded-lg"
                    options={{
                      fullscreenControl: false,
                      streetViewControl: false,
                      zoomControl: false,
                      mapTypeControl: false,
                    }}
                  >
                    <MarkerF position={locationDetails.coordinates} draggable={false} />
                  </GoogleMapWrapper>
                ) : (
                  <div className="cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3 w-full h-[214px] sm:h-64 rounded-lg bg-secondary-100 hover:brightness-[0.98] active:brightness-90">
                    <div className="bg-secondary-200 rounded-full p-3">
                      <IoLocationSharp className="text-secondary-400 text-6xl" />
                    </div>
                  </div>
                )}
              </div>
            </UITooltip>
          </div>
          <div className="flex gap-2">
            <UIButton variant="outlined" className="w-full">
              CANCEL
            </UIButton>
            <UIButton
              type="submit"
              className="w-full"
              loading={addBillboardLoading || editBillboardLoading}
            >
              SUBMIT
            </UIButton>
          </div>
        </UIForm>
      </UICard>
      <AddLocationModal
        open={openLocationModal}
        handleOpen={handleOpen}
        setLocationDetails={setLocationDetails}
        locationDetailsCoordinates={locationDetails?.coordinates}
      />
    </>
  )
}
