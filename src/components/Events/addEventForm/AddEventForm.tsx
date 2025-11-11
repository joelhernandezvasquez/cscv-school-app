import style from '../../../styles/forms.module.css';

interface Props{
  onClose:() => void
}
const AddEventForm = ({onClose}:Props) => {
  return (
    <form className={style.form} action={()=>{}}>
       <div className={style.form_field}>
          <label htmlFor='name'>Event Name</label>
          <input  type='text' name='name' id='name'/>
          {/* {data?.errors?.firstName && <ErrorMessage message='First Name is required.'/>} */}
       </div>

         <div className={style.form_field}>
              <label htmlFor='price'>Price</label>
              <input  type='number' name='price' id='price'/>
               {/* {data?.errors?.zipcode && <ErrorMessage message='Zip code is missing.'/>} */}
          </div>

         <div className={style.form_field}>
              <label htmlFor='price'>Price</label>
              <input  type='number' name='price' id='price'/>
               {/* {data?.errors?.zipcode && <ErrorMessage message='Zip code is missing.'/>} */}
          </div>
    </form>
  )
}

export default AddEventForm