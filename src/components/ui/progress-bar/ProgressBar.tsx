
interface Props{
  value:number,
  max:number,
  theme:string
}

const ProgressBar = ({value,max,theme}:Props) => {
  const size = 200;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / max) * circumference;
  
  return (

    <svg width={size} height={size}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={theme}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{ transition: "stroke-dashoffset 0.35s" }}
        />
         <text
          x="50%"
          y="45%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1rem"
          fill={'#11141A'}
        >
         Total Courses
        </text>

        <text
          x="50%"
          y="60%"
          textAnchor="middle"
          dy=".3em"
          fontSize="1.5rem"
          fill={'#11141A'}
        >
          {`${value}%`}
        </text>
      </svg>
  )
}

export default ProgressBar