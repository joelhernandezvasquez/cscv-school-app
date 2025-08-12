import style from './style.module.css';

const StudentActionMenu = () => {
  return (
   <div className={style.action_menu}>
       <ul className={style.menu}>
          <li>View Student</li>
          <li>Update Student</li>
          <li className={style.delete_item}>Delete Student</li>
       </ul>
    </div>
  )
}

export default StudentActionMenu