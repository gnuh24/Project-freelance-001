import Swal from 'sweetalert2'
const alertSuccess = () => {
  Swal.fire({
    title: 'Good job!',
    text: 'You clicked the button!',
    icon: 'success',
  })
}

const alertError = () => {
  Swal.fire({
    title: 'Oops...',
    text: 'Something went wrong!',
    icon: 'error',
  })
}

const alertSave = () => {
  Swal.fire({
    title: 'Do you want to save the changes?',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Save',
    denyButtonText: `Don't save`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }
  })
}

const alertDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      })
    }
  })
}

export { alertSuccess, alertError, alertSave, alertDelete }
