import { Carousel } from 'flowbite-react'

const Carusel = () => {
  return (
    <>
      <div className="h-9/10-screen pt-3">
        <Carousel slideInterval={2000}>
          <img src="../../../public/image/banner.png" alt="..." />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
    </>
  )
}

export default Carusel
