import qs from 'query-string'
import AxiosAdmin from '../../../../apis/AxiosAdmin'
import { useQuery } from '@tanstack/react-query'










export const ProductQuery = ({
    params
}) => {

    const fetchProduct = async () => {
        const queryString = qs.stringifyUrl({
            url: '/Shoe/Admin',
            query: params
        })

        console.log(queryString)
        const { data } = await AxiosAdmin.get(queryString)
        console.log(data)
        return data;
    }


    return useQuery({
        queryKey: ['products', params],  
        queryFn: fetchProduct,
        staleTime: 60000,  
        cacheTime: 300000, 
    });
    
}