const Navigation = () => {
  return (
    <>
      <div className="container mx-auto">
        <div className="logo-home flex items-center">
          <div className="flex items-center">
            <img
              className="w-40 h-40 cursor-pointer text-white"
              src="/public/image/logo/shoes-logo-design-sneakers-logo-design-vector.svg"
              alt="logo"
            />
          </div>
          <div className="flex items-center w-full">
            <div className="navigation">
              {/* logo social media */}
              <ul className="flex items-center">
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/">
                    <img
                      className="w-40 h-40 cursor-pointer fill-current text-sky-500"
                      src="/public/image/logo/images.svg"
                      alt="facebook"
                    />
                  </a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/">
                    <img
                      className="w-40 h-40 cursor-pointer text-sky-500 fill-current"
                      src="/public/image/logo/zalo.svg"
                      alt="zalo"
                    />
                  </a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/">
                    <img
                      className="w-40 h-40 cursor-pointer text-white"
                      src="../../../public/image/logo/lazada.svg"
                      alt="lazada"
                    />
                  </a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/">
                    <img
                      className="w-40 h-40 cursor-pointer text-white"
                      src="../../../public/image/logo/tiktok.svg"
                      alt="tiktok"
                    />
                  </a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/">
                    <img
                      className="w-40 h-40 cursor-pointer text-white"
                      src="../../../public/image/logo/png-transparent-shopee-logo-thumbnail_1.svg"
                      alt="shoppe"
                    />
                  </a>
                </li>
              </ul>

              <ul className="flex items-center">
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/">Trang chủ</a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/products">Sản phẩm</a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/contact">Liên hệ</a>
                </li>
                <li className="mx-4 text-black cursor-pointer hover:text-red-500">
                  <a href="/about">Về chúng tôi</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Navigation
