import { useProductTypesQuery } from "../../../../hook/useProductTypesQuery"




export default function AddProductPage(){

    const { data, isLoading, error } = useProductTypesQuery()
    
    console.log(data)


    return (
        <div>
            add product page
        </div>
    )
} 