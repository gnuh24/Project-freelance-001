import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAccountAndUserInformationByIdApiThunk,
  updateAccountInformationUserApiThunk,
} from '../../reducers/auth/AccountSlice'
const Profile = () => {
  const dispatch = useDispatch()
  const {
    data: dataAccount,
    accountDetail,
    status: statusAccount,
    error: errorAccount,
  } = useSelector((state) => state.accountReducer)
  const ACCOUNT_ID = localStorage.getItem('id')

  useEffect(() => {
    dispatch(getAccountAndUserInformationByIdApiThunk(ACCOUNT_ID))
  }, [dispatch, ACCOUNT_ID])

  const convertDateFormat = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
  }

  const convertDateFormatFormData = (dateStr) => {
    if (!dateStr) return ''
    const [day, month, year] = dateStr.split('-')
    return `${year}/${month}/${day}`
  }

  const [formDataInformation, setFormDataInformation] = useState({
    fullname: '',
    address: '',
    gender: '',
    email: '',
    birthday: '',
    phoneNumber: '',
  })

  const handleChangeInformation = (e) => {
    const { name, value } = e.target
    setFormDataInformation({ ...formDataInformation, [name]: value })
  }

  const handleSubmitInformation = (e) => {
    e.preventDefault()
    const formattedBirthday = convertDateFormatFormData(
      formDataInformation.birthday,
    )

    const payload = {
      ...formDataInformation,
      birthday: formattedBirthday,
      accountId: ACCOUNT_ID,
    }

    console.log(payload)
    dispatch(updateAccountInformationUserApiThunk(payload))
  }

  const [formDataPassword, setFormDataPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChangePassword = (e) => {
    const { name, value } = e.target
    setFormDataPassword({ ...formDataPassword, [name]: value })
  }

  const handleSubmitPassword = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formDataPassword)

    // dispatch(updatePassword(formDataPassword))
  }

  useEffect(() => {
    if (statusAccount === 'succeeded' && accountDetail) {
      setFormDataInformation({
        fullname: accountDetail.fullname || '',
        address: accountDetail.address || '',
        gender: accountDetail.gender || '',
        email: accountDetail.email || '',
        birthday: convertDateFormat(accountDetail.birthday) || '',
        phoneNumber: accountDetail.phoneNumber || '',
      })
    }
  }, [accountDetail, statusAccount])

  return (
    <div className="container grid grid-cols-1 px-4 pt-6 xl:grid-cols-3 xl:gap-4 dark:bg-gray-900">
      {/* Right Content */}
      <div className="col-span-full xl:col-auto">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="items-center sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <img
              className="mb-4 rounded-lg w-28 h-28 sm:mb-0 xl:mb-4 2xl:mb-0"
              src="https://flowbite-admin-dashboard.vercel.app/images/users/bonnie-green-2x.png"
              alt="Jese picture"
            />
            <div>
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                Profile picture
              </h3>
              <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                JPG, GIF or PNG. Max size of 800K
              </div>
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <i className="fa-solid fa-upload w-4 h-4 mr-2 -ml-1"></i>
                  Upload picture
                </button>
                <button
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Password */}
        <div className="h-96 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Password information
          </h3>
          <form onSubmit={handleSubmitPassword}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="current-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Current password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  id="current-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  value={formDataPassword.currentPassword}
                  onChange={handleChangePassword}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="new-password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="••••••••"
                  value={formDataPassword.newPassword}
                  onChange={handleChangePassword}
                  required
                />
                <div
                  id="popover-password"
                  role="tooltip"
                  className="absolute z-10 inline-block text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 opacity-0 invisible"
                >
                  <div className="p-3 space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Must have at least 6 characters
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                      <div className="h-1 bg-orange-300 dark:bg-orange-400"></div>
                      <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                      <div className="h-1 bg-gray-200 dark:bg-gray-600"></div>
                    </div>
                    <p>It’s better to have:</p>
                    <ul>
                      <li className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 mr-2 text-green-400 dark:text-green-500"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Upper &amp; lower case letters
                      </li>
                      <li className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        A symbol (#$&amp;)
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2 text-gray-300 dark:text-gray-400"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        A longer password (min. 12 chars.)
                      </li>
                    </ul>
                  </div>
                  <div
                    data-popper-arrow=""
                    style={{
                      position: 'absolute',
                      left: '0px',
                      transform: 'translate(139px)',
                    }}
                  ></div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  value={formDataPassword.confirmPassword}
                  onChange={handleChangePassword}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-full">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="submit"
                >
                  Save all
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="col-span-2">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Thông tin tài khoản
          </h3>
          <form onSubmit={handleSubmitInformation}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tên
                </label>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Nguyễn Văn A"
                  value={formDataInformation.fullname}
                  onChange={handleChangeInformation}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="user@example.com"
                  value={formDataInformation.email}
                  onChange={handleChangeInformation}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  id="phoneNumber"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="123-456-7890"
                  value={formDataInformation.phoneNumber}
                  onChange={handleChangeInformation}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Địa chỉ
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="123 Main St"
                  value={formDataInformation.address}
                  onChange={handleChangeInformation}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="birthday"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Ngày sinh
                </label>
                <input
                  type="date"
                  name="birthday"
                  id="birthday"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formDataInformation.birthday}
                  onChange={handleChangeInformation}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Giới tính
                </label>
                <select
                  name="gender"
                  id="gender"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={formDataInformation.gender}
                  onChange={handleChangeInformation}
                  required
                >
                  <option value="Male">Nam</option>
                  <option value="Female">Nữ</option>
                  <option value="Other">Khác</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
