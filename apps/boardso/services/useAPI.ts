import axios from "axios"
import useSWR from "swr"

const fetcher = (args: any) => axios.get(args).then(res => res.data)

export const useGetCountries: any = () => {
    const value = useSWR("https://restcountries.com/v3.1/all?fields=name,cca2,flags", fetcher)
    return value
}
