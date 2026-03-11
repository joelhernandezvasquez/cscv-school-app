import style from './style.module.css';

const EmptyCourses = () => {
  return (
    <div className={style.container}>
    <div className={style.empty_state}>
        <div className={style.empty_icon}>🎓</div>
            <h2 className={style.empty_title}>No Completed Courses Yet</h2>
            <p className={style.empty_subtitle}>
                Complete your first course to see your achievements here.
                Your learning journey starts with a single step!
            </p>

    </div>
    </div>

  )
}

export default EmptyCourses