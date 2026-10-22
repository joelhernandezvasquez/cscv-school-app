import style from "./style.module.css";

interface Props {
  text: string;
}

const Spinner = ({ text }: Props) => {
  return (
    <span className={style.spinner_container}>
      <span>{text}</span>
      <span className={style.spinner} aria-hidden="true"></span>
    </span>
  );
};

export default Spinner;
