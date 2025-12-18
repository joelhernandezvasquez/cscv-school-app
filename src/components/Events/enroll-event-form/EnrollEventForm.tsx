
import style from './style.module.css';
import { LuSearch } from 'react-icons/lu';

const EnrollEventForm = () => {
  return (
    <section className={style.enrollment_form}>
      <div className={style.enrollment_form_search}>
         <LuSearch size={25} />
         <input type='text' name='search' id='search' placeholder='Search By Name'/>
      </div>
    </section>
  )
}

export default EnrollEventForm