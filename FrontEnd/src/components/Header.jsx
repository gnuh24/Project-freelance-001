import { useEffect, useState } from 'react'

const Header = () => {
  const [descriptionSale, setDescriptionSale] = useState('')
  useEffect(() => {
    setDescriptionSale('Khu vực khuyến mãi')
  }, [])
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold hotline"></div>
        <div className="flex items-center programSale">
          {{ descriptionSale }}
        </div>
        <div className="flex items-center search"></div>
        <div className="flex items-center feature"></div>
      </div>
    </header>
  )
}

export default Header
