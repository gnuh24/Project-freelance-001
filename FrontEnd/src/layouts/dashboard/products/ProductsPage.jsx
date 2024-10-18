import { useQuery } from "@tanstack/react-query";
import { useProductBrandsQuery } from "../../../hook/useProductBrandsQuery";
import { useProductColorsQuery } from "../../../hook/useProductColorsQuery";
import { useProductTypesQuery } from "../../../hook/useProductTypesQuery";
import AxiosAdmin from "../../../apis/AxiosAdmin";
import { useEffect, useState } from "react";
import qs from 'query-string';
import { LuLoader2 } from "react-icons/lu";
import TableProduct from "../../../components/admin/product/TableProduct";
import { Pagination, Stack } from '@mui/material'
import { ProductQuery } from "./components/ProductQuery";


const ITEM_PER_PAGE = 10
const DEFAULT_PAGE = 1;



export default function ProductsPage() {
    const { data: types, isLoading: isLoadingProductTypes, error: errorProductTypes } = useProductTypesQuery();
    const { data: brands, isLoading: isLoadingProductBrands, error: errorProductBrands } = useProductBrandsQuery();



    const [filterValues, setFilterValues] = useState({
        search: '',
        brandId: '',
        shoeTypeId: '',
        priority: '',
        minCreateDate: '',
        maxCreateDate: '',
        sort: 'shoeId,asc',
        pageNumber: DEFAULT_PAGE,
        pageSize: ITEM_PER_PAGE

    });

    const params = Object.fromEntries(Object.entries(filterValues).filter(([_, v]) => v));

    const { data: dataProducts, isLoading: isLoadingProducts, error: errorProducts } = ProductQuery({
        params: params
    });


    if (isLoadingProductTypes || isLoadingProductBrands || isLoadingProducts) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <LuLoader2 size={30} className="animate-spin" />
            </div>
        )
    }

    if (errorProductTypes) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-zinc-400 font-semibold text-md">{errorProductTypes.message}</p>
            </div>
        )
    }

    if (errorProductBrands) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-zinc-400 font-semibold text-md">{errorProductBrands.message}</p>
            </div>
        )
    }
    if (errorProducts) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-zinc-400 font-semibold text-md">{errorProducts.message}</p>
            </div>
        )
    }


    const handleChangePage = (e, p) => {
        setFilterValues({ ...filterValues, pageNumber: p })
    }



    return (
        <div>
            <div className="h-[90.2vh] space-y-5">
                <div className="p-4 bg-white block sm:flex items-center justify-between lg:mt-1.5 dark:bg-gray-700">
                    <div className="w-full mb-1">
                        <div className="mb-4">
                            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white">
                                Quản lý sản phẩm
                            </h1>
                        </div>
                        <div className="items-center justify-between flex gap-4 ">
                            <form className="sm:pr-3 w-full" >
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        name="email"
                                        id="products-search"
                                        value={filterValues.search}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Tìm sản phẩm ... "
                                        onChange={(e) => setFilterValues({ ...filterValues, search: e.target.value })}
                                    />
                                </div>
                            </form>


                            <div className='flex items-center gap-2 w-full'>
                                <label className="whitespace-nowrap tracking-tight text-sm font-semibold">Thương hiệu</label>
                                <select
                                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                                    onChange={(e) => setFilterValues({ ...filterValues, brandId: e.target.value })}
                                >
                                    <option value="">Tất cả </option>
                                    {brands?.map((brand, index) => (
                                        <option key={index} className="text-sm pr-2" value={brand.brandId}>{brand.brandName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex items-center gap-2 w-full'>
                                <label className="whitespace-nowrap tracking-tight text-sm font-semibold">Loại</label>
                                <select
                                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                                    onChange={(e) => setFilterValues({ ...filterValues, shoeTypeId: e.target.value })}
                                >
                                    <option value=""> Tất cả </option>
                                    {types.map((type, index) => (
                                        <option key={index} value={type.shoeTypeId} className="text-sm pr-2">{type.shoeTypeName}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex items-center gap-2 w-full '>
                                <label className="whitespace-nowrap tracking-tight text-sm font-semibold">Ưu tiên</label>
                                <select
                                    className="h-12 border border-gray-300 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none"
                                    onChange={(e) => setFilterValues({ ...filterValues, priority: e.target.value })}
                                >
                                    <option value="" className="text-sm pr-2">Tất cả</option>
                                    <option value="true" className="text-sm pr-2">Cao</option>
                                    <option value="false" className="text-sm pr-2">Thấp</option>
                                </select>
                            </div>



                            <div className="ml-1 sm:ml-2">
                                <button
                                    onClick={() => setIsAddOpen(true)}
                                    className="flex items-center justify-center h-12 bg-sky-600 hover:focus:ring-2 hover:focus-visible:ring-sky-800  hover:bg-sky-700 transition text-white text-base rounded-lg w-full py-2.5 px-4 focus:outline-none"
                                >
                                    <i className="fa-solid fa-plus text-center mr-2"></i>
                                    <span className="whitespace-nowrap tracking-tight font-semibold">Thêm sản phẩm</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <TableProduct key={filterValues.pageNumber} products={dataProducts?.content} filterValues={filterValues} onChangeFilter={setFilterValues} />


                <div className='flex items-center justify-center mt-10 pb-10'>
                    <Stack spacing={2}>

                        <Pagination
                            count={dataProducts.totalPages}
                            page={filterValues.pageNumber}
                            onChange={handleChangePage}
                            variant="outlined"
                            shape="rounded"
                        />


                    </Stack>

                </div>
            </div>

        </div>
    );
}
