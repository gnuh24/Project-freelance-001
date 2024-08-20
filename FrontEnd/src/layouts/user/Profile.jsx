import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAccountAndUserInformationByIdApiThunk,
  updateAccountInformationUserApiThunk,
  getTokenUpdatePasswordApiThunk,
  getTokenUpdateEmailApiThunk,
  checkEmailApiThunk,
} from '../../reducers/auth/AccountSlice'
import {
  alertError,
  alertSubmitToken,
  alertSuccess,
} from '../../components/sweeetalert/sweetalert'
const Profile = () => {
  const dispatch = useDispatch()
  const {
    data: dataAccount,
    accountDetail,
    checkEmail,
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
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [formDataEmail, setFormDataEmail] = useState({
    newEmail: '',
  })

  const handleChangePassword = (e) => {
    const { name, value } = e.target
    setFormDataPassword({ ...formDataPassword, [name]: value })
  }

  const handleChangeEmail = (e) => {
    const { name, value } = e.target
    setFormDataEmail({ ...formDataEmail, [name]: value })
  }

  useEffect(() => {
    setFormDataEmail({ newEmail: accountDetail?.email || '' })
  }, [setFormDataEmail, accountDetail])

  const handleSubmitPassword = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formDataPassword)

    if (formDataPassword.newPassword !== formDataPassword.confirmPassword) {
      alertError('Nhập sai mật khẩu xác nhận!')
      return
    }

    if (formDataPassword.newPassword === formDataPassword.oldPassword) {
      alertError('Mật khẩu mới không được trùng với mật khẩu cũ!')
      return
    }

    formDataPassword.action = 'updatePassword'
    dispatch(getTokenUpdatePasswordApiThunk())
  }

  const handleSubmitEmail = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formDataEmail)

    formDataEmail.action = 'updateEmail'

    // Dispatch checkEmailApiThunk first to verify if the email exists
    dispatch(checkEmailApiThunk(formDataEmail.newEmail))
      .unwrap()
      .then((result) => {
        if (result) {
          alertError('Email đã tồn tại')
        } else {
          dispatch(getTokenUpdateEmailApiThunk(formDataEmail))
        }
      })
      .catch((error) => {
        alertError('Lỗi hệ thống: ' + error)
      })
  }

  useEffect(() => {
    console.log('Status account:', statusAccount)
    console.log('Error account:', errorAccount)
    if (statusAccount === 'succeededGetTokenUpdatePassword') {
      alertSubmitToken(formDataPassword, dispatch)
    } else if (statusAccount === 'succeededUpdatePassword') {
      alertSuccess('Cập nhật mật khẩu thành công!')
    } else if (
      statusAccount === 'failedUpdatePassword' ||
      statusAccount === 'failedGetTokenUpdatePassword'
    ) {
      alertError('Lỗi hệ thống')
    } else if (statusAccount === 'succeededGetTokenUpdateEmail') {
      alertSubmitToken(formDataEmail, dispatch)
    } else if (statusAccount === 'succeededUpdateEmail') {
      alertSuccess('Cập nhật email thành công!')
    } else if (
      statusAccount === 'failedGetTokenUpdateEmail' ||
      statusAccount === 'failedUpdateEmail'
    ) {
      alertError('Lỗi hệ thống')
    }
  }, [dispatch, statusAccount, formDataPassword, formDataEmail, errorAccount])

  useEffect(() => {
    if (statusAccount === 'succeeded' && accountDetail) {
      setFormDataInformation({
        fullname: accountDetail.fullname || '',
        address: accountDetail.address || '',
        gender: accountDetail.gender || '',
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
            <form onSubmit={handleSubmitEmail}>
              <div className="grid grid-cols-1">
                <div className="col-span-6 sm:col-span-3 relative">
                  <label
                    htmlFor="new-email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email mới
                  </label>
                  <input
                    type="email"
                    name="newEmail"
                    id="new-email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="email@example.com"
                    value={formDataEmail.newEmail}
                    onChange={handleChangeEmail}
                    required
                  />
                </div>

                <div className="col-span-6 sm:col-full">
                  <button
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                  >
                    Thay đổi Email
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Password */}
        <div className="h-96 p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <h3 className="mb-4 text-xl font-semibold dark:text-white">
            Thay đổi mật khẩu
          </h3>
          <form onSubmit={handleSubmitPassword}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="old-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  name="oldPassword"
                  id="old-password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="••••••••"
                  value={formDataPassword.oldPassword}
                  onChange={handleChangePassword}
                  required
                />
              </div>

              <div className="col-span-6 sm:col-span-3 relative">
                <label
                  htmlFor="new-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mật khẩu mới
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
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Xác nhận mật khẩu
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
                  Thay đổi mật khẩu
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
