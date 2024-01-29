import style from "./__selectedFilter.module.scss";
import {ReactComponent as Close} from "./close.svg";

interface FiltersProps {
  params: string;
  onClick: (filterName: string) => void;
}

export default function SelectedFilter({params, onClick}: FiltersProps) {
  return (
    <div className={style.selectedFilter}>
      <span>{params.charAt(0).toLocaleUpperCase() + params.slice(1)}</span>
      <button>
        <Close onClick={() => onClick(params)} />
      </button>
    </div>
  );
}
