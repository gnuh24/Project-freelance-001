import Swal from 'sweetalert2'
import { updatePasswordApiThunk } from '../../reducers/auth/AccountSlice'
const alertSuccess = (message) => {
  Swal.fire({
    text: message || 'Operation successful!',
    icon: 'success',
  })
}

const alertError = (message) => {
  Swal.fire({
    text: message || 'Something went wrong!',
    icon: 'error',
  })
}

const alertSave = () => {
  Swal.fire({
    title: 'Bạn có muôn lưu thay đổi không?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Lưu',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Đã lưu!', '', 'success')
    }
  })
}

const alertDelete = () => {
  Swal.fire({
    title: 'Bạn có chắc muốn xóa không?',
    text: 'Hành động sẽ không thể quay lại!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Đã xóa!',
        text: 'Đã thực thi hành động xóa.',
        icon: 'success',
      })
    }
  })
}

const alertSubmitToken = (formData, dispatch) => {
  if (formData.action === 'updatePassword') {
    Swal.fire({
      title: 'Nhập token xác nhận (Vui lòng kiểm tra thư email!)',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      showLoaderOnConfirm: true,
      preConfirm: async (token) => {
        try {
          formData.tokenUpdatePassword = token
          dispatch(updatePasswordApiThunk(formData))
          return
        } catch (error) {
          Swal.showValidationMessage(`Yêu cầu thất bại: ${error.message}`)
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    })
  } else if (formData.action === 'udpateEmail') {
    return
  }
}

export { alertSuccess, alertError, alertSave, alertDelete, alertSubmitToken }
