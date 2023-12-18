import React, {useRef} from "react";
import Email from "../../ui/Email/Email";
import Mobile from "../../ui/Mobile/Mobile";
// import {ReactComponent as FaceBookIcon} from "../../../assets/icons/social/facebook.svg";
// import {ReactComponent as TwitterIcon} from "../../../assets/icons/social/twitter.svg";
// import {ReactComponent as YouTubeIcon} from "../../../assets/icons/social/youtube.svg";
// import {ReactComponent as InstagramIcon} from "../../../assets/icons/social/instagram.svg";
import Select from "react-select";
import {useAppSelector} from "hooks/redux-hooks";
import {useAppDispatch} from "hooks/redux-hooks";
import style from "./__topBar.module.scss";
import SocialIcons from "../../ui/SocialIcons/SocialIcons";

import {setCurrencyTerm} from "store/slices/currencySlice";

const white: string = "#FFFFFFB2";
const color: string = "rgba(255, 255, 255, 0.7)";
const opacity: string = "1";

// interface TopBarProps {
//   eurValue: number;
//   usdValue: number;
//   selectedCurrency: string;
//   onCurrencyChange: (obj: any) => void;
// }

export default function TopBar() {
  // const handleCurrencyChange = (currencyCode: string) => {
  //   onCurrencyChange(currencyCode);
  // };
  const usdValue = useAppSelector((state) => state.currValue.usdValue);
  const eurValue = useAppSelector((state) => state.currValue.eurValue);
  const dispatch = useAppDispatch();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const toggleMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  // const selectRef = useRef(null);

  const options = [
    {value: "RUB", label: "RUB"},
    {value: "USD", label: "USD"},
    {value: "EUR", label: "EUR"},
  ];
  const initialOption = options.find((option) => option.value === "RUB");
  const [selectedCurrency, setSelectedCurrency] = React.useState(initialOption);
  const onClickCurrency = (selectedOption: any) => {
    setSelectedCurrency(selectedOption);
    console.log(selectedOption.value);

    // onCurrencyChange(selectedOption);
    dispatch(setCurrencyTerm(selectedOption.value));
    setMenuIsOpen(false);
  };
  return (
    <div className={style.topBar}>
      <div className={style.topBar_left}>
        {/* <FaceBookIcon />
        <TwitterIcon />
        <YouTubeIcon />
        <InstagramIcon /> */}
        <div className={style.logos}>
          <SocialIcons color={color} opacity={opacity} />
        </div>

        <Mobile color={white} />
        <div className={style.logos}>
          <Email color={white} email={"segas95@yandex.ru"} />
        </div>
        {selectedCurrency?.value === "USD"
          ? selectedCurrency?.value + `: ${usdValue}`
          : selectedCurrency?.value === "EUR"
          ? selectedCurrency?.value + `: ${eurValue}`
          : "RUB"}
      </div>
      <div className={style.topBar_right}>
        <svg
          className={style.map_logo}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.2427 11.576L8 15.8187L3.75734 11.576C2.91823 10.7369 2.34679 9.66778 2.11529 8.5039C1.88378 7.34002 2.0026 6.13362 2.45673 5.03727C2.91086 3.94092 3.6799 3.00385 4.66659 2.34456C5.65328 1.68528 6.81332 1.33339 8 1.33339C9.18669 1.33339 10.3467 1.68528 11.3334 2.34456C12.3201 3.00385 13.0891 3.94092 13.5433 5.03727C13.9974 6.13362 14.1162 7.34002 13.8847 8.5039C13.6532 9.66778 13.0818 10.7369 12.2427 11.576ZM8 8.66667C8.35362 8.66667 8.69276 8.52619 8.94281 8.27614C9.19286 8.02609 9.33334 7.68696 9.33334 7.33333C9.33334 6.97971 9.19286 6.64057 8.94281 6.39052C8.69276 6.14048 8.35362 6 8 6C7.64638 6 7.30724 6.14048 7.05719 6.39052C6.80715 6.64057 6.66667 6.97971 6.66667 7.33333C6.66667 7.68696 6.80715 8.02609 7.05719 8.27614C7.30724 8.52619 7.64638 8.66667 8 8.66667Z"
            fill="white"
            fillOpacity="0.7"
          />
        </svg>
        <span className={style.shipTo}> Ship to:</span>
        <div className={style.shipTo_container}>
          <svg
            className={style.flag_canada}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_87_71)">
              <path
                d="M2.22222 2.77778C1.63285 2.77778 1.06762 3.0119 0.650874 3.42865C0.234126 3.8454 0 4.41063 0 5L0 15C0 15.5894 0.234126 16.1546 0.650874 16.5713C1.06762 16.9881 1.63285 17.2222 2.22222 17.2222H5.55556V2.77778H2.22222ZM17.7778 2.77778H14.4444V17.2222H17.7778C18.3671 17.2222 18.9324 16.9881 19.3491 16.5713C19.7659 16.1546 20 15.5894 20 15V5C20 4.41063 19.7659 3.8454 19.3491 3.42865C18.9324 3.0119 18.3671 2.77778 17.7778 2.77778Z"
                fill="#D52B1E"
              />
              <path
                d="M5.55554 2.77778H14.4444V17.2222H5.55554V2.77778Z"
                fill="#EEEEEE"
              />
              <path
                d="M10.3417 12.285C11.0073 12.3622 11.6039 12.4317 12.2689 12.5078L12.0995 11.9511C12.087 11.9032 12.0887 11.8527 12.1044 11.8058C12.1201 11.7588 12.1491 11.7175 12.1878 11.6867L14.1206 10.1122L13.7206 9.92389C13.5445 9.86111 13.5928 9.76167 13.6567 9.52278L13.9517 8.44722L12.8289 8.68444C12.7195 8.70111 12.6467 8.63167 12.63 8.565L12.485 8.05889L11.5973 9.05555C11.4711 9.21555 11.2156 9.21555 11.295 8.84667L11.6745 6.82778L11.165 7.09167C11.0223 7.17167 10.8795 7.185 10.8 7.04222L10.0973 5.72778V5.76056V5.72778L9.39448 7.04222C9.31448 7.185 9.1717 7.17167 9.02892 7.09167L8.52003 6.82778L8.89947 8.84667C8.97948 9.21555 8.72336 9.21555 8.59725 9.05555L7.70948 8.05944L7.56503 8.56556C7.54836 8.63222 7.47503 8.70167 7.36559 8.685L6.24281 8.44778L6.53781 9.52333C6.60059 9.76222 6.64948 9.86167 6.47336 9.92444L6.07336 10.1128L8.00614 11.6872C8.08281 11.7467 8.1217 11.8539 8.09392 11.9517L7.92448 12.5083L9.85225 12.2856C9.91114 12.2856 9.95003 12.3183 9.94948 12.3861L9.83059 14.4439H10.3617L10.2434 12.3861C10.2445 12.3178 10.2828 12.285 10.3417 12.285Z"
                fill="#D52B1E"
              />
            </g>
            <defs>
              <clipPath id="clip0_87_71">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <span className={style.countryName}> Canada</span>
        </div>

        <span className={style.currency}> Currency:</span>
        <div>
          <span className={style.currencySelected}>
            <Select
              classNamePrefix="top-bar__select"
              value={selectedCurrency}
              onChange={onClickCurrency}
              options={options}
              menuIsOpen={menuIsOpen}
              //menuIsOpen={true}
              onMenuOpen={toggleMenu}
            />
          </span>
          {/**  <button onClick={() => handleCurrencyChange("USD")}>USD</button>
          <button onClick={() => handleCurrencyChange("EUR")}>EUR</button>
          <button onClick={() => handleCurrencyChange("RUB")}>RUB</button> */}
        </div>
        <svg
          className={style.question_logo}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.00004 14.6667C4.31804 14.6667 1.33337 11.682 1.33337 8C1.33337 4.318 4.31804 1.33333 8.00004 1.33333C11.682 1.33333 14.6667 4.318 14.6667 8C14.6667 11.682 11.682 14.6667 8.00004 14.6667ZM7.33337 10V11.3333H8.66671V10H7.33337ZM8.66671 8.90333C9.20249 8.74185 9.66244 8.3933 9.96281 7.92116C10.2632 7.44902 10.384 6.8847 10.3032 6.33098C10.2224 5.77725 9.94545 5.27096 9.52272 4.9043C9.09999 4.53765 8.55962 4.33502 8.00004 4.33333C7.46061 4.33329 6.93782 4.5201 6.52057 4.86199C6.10332 5.20389 5.81738 5.67975 5.71137 6.20867L7.01937 6.47067C7.05649 6.28495 7.14559 6.1136 7.27628 5.97654C7.40698 5.83949 7.57392 5.74236 7.75766 5.69647C7.9414 5.65058 8.13439 5.65781 8.31419 5.71731C8.49398 5.77682 8.65318 5.88616 8.77326 6.03261C8.89334 6.17906 8.96937 6.35659 8.99249 6.54456C9.01562 6.73253 8.98489 6.9232 8.90389 7.09439C8.82288 7.26558 8.69493 7.41024 8.53492 7.51155C8.37491 7.61286 8.18943 7.66665 8.00004 7.66667C7.82323 7.66667 7.65366 7.7369 7.52864 7.86193C7.40361 7.98695 7.33337 8.15652 7.33337 8.33333V9.33333H8.66671V8.90333Z"
            fill="white"
            fillOpacity="0.7"
          />
        </svg>
        <span className={style.help}>Help</span>
      </div>
    </div>
  );
}
