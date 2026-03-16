import style from './style.module.css';

const EmptyStudentPerformance = () => {
return (
    <div className={style.container}>
        <div className={style.empty_state}>
            <div className={style.empty_icon}>
                <div className={style.chart_placeholder}>
                    <div className={style.circle_dashed}></div>
                    <div className={style.inner_circle}>
                        <div className={style.chart_icon}>📊</div>
                    </div>
                    <div className={style.sparkles}>
                        <div className={style.sparkle}></div>
                        <div className={style.sparkle}></div>
                        <div className={style.sparkle}></div>
                        <div className={style.sparkle}></div>
                    </div>
                </div>
            </div>

            <h2 className={style.empty_title}>Your Journey Begins Here</h2>
            <p className={style.empty_subtitle}>Start a course to see your progress and performance metrics</p>

        </div>
    </div>
)
}

export default EmptyStudentPerformance