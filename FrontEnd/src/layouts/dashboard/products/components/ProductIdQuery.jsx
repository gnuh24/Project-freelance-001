
import queryString from 'query-string';
import AxiosAdmin from '../../../../apis/AxiosAdmin'
import { useQuery } from '@tanstack/react-query';






export const ProductIdQuery = (queryKey) => {

    const queryString = queryString.stringifyUrl({
        url: `/Shoe/Admin/${queryKey}`,
    })



    return useQuery({
        queryKey: ["productId", queryKey],
        queryFn: async () => {
            const { data } = await AxiosAdmin.get(queryString);
            return data;
        },
        staleTime: false
    })
}