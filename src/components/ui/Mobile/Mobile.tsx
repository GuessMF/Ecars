import React from "react";
import style from "./__mobile.module.scss";
interface Props {
  color: string;
  number: string | undefined;
}

export default function Mobile({color, number}: Props) {
  return (
    <div className={style.mobile}>
      <svg
        className={style.mobile__logo}
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.336 14.6667L2.23734 11.3547C1.64343 10.3366 1.3314 9.17866 1.33334 8C1.33334 4.318 4.318 1.33333 8 1.33333C11.682 1.33333 14.6667 4.318 14.6667 8C14.6667 11.682 11.682 14.6667 8 14.6667C6.82186 14.6686 5.66444 14.3568 4.64667 13.7633L1.336 14.6667ZM5.594 4.872C5.50791 4.87735 5.42379 4.90002 5.34667 4.93867C5.27435 4.97962 5.20833 5.03082 5.15067 5.09067C5.07067 5.166 5.02534 5.23133 4.97667 5.29467C4.73028 5.61533 4.59774 6.00895 4.6 6.41333C4.60134 6.74 4.68667 7.058 4.82 7.35533C5.09267 7.95667 5.54134 8.59333 6.134 9.18333C6.27667 9.32533 6.416 9.468 6.566 9.60067C7.3016 10.2483 8.17817 10.7154 9.126 10.9647L9.50534 11.0227C9.62867 11.0293 9.752 11.02 9.876 11.014C10.0702 11.004 10.2597 10.9514 10.4313 10.86C10.5186 10.815 10.6038 10.7661 10.6867 10.7133C10.6867 10.7133 10.7153 10.6947 10.77 10.6533C10.86 10.5867 10.9153 10.5393 10.99 10.4613C11.0453 10.404 11.0933 10.3367 11.13 10.26C11.182 10.1513 11.234 9.944 11.2553 9.77133C11.2713 9.63933 11.2667 9.56733 11.2647 9.52267C11.262 9.45133 11.2027 9.37733 11.138 9.346L10.75 9.172C10.75 9.172 10.17 8.91933 9.816 8.758C9.77868 8.74173 9.73868 8.73246 9.698 8.73067C9.65239 8.72598 9.6063 8.73111 9.56284 8.74572C9.51937 8.76032 9.47954 8.78406 9.446 8.81533V8.814C9.44267 8.814 9.398 8.852 8.916 9.436C8.88834 9.47317 8.85023 9.50127 8.80654 9.5167C8.76285 9.53214 8.71555 9.53421 8.67067 9.52267C8.62723 9.51105 8.58468 9.49635 8.54334 9.47867C8.46067 9.444 8.432 9.43067 8.37534 9.406L8.372 9.40467C7.99061 9.23815 7.63749 9.01323 7.32534 8.738C7.24134 8.66467 7.16334 8.58467 7.08334 8.50733C6.82106 8.25616 6.59248 7.97201 6.40334 7.662L6.364 7.59867C6.33575 7.55611 6.31291 7.5102 6.296 7.462C6.27067 7.364 6.33667 7.28533 6.33667 7.28533C6.33667 7.28533 6.49867 7.108 6.574 7.012C6.63673 6.93221 6.69525 6.84921 6.74934 6.76333C6.828 6.63667 6.85267 6.50667 6.81134 6.406C6.62467 5.95 6.43134 5.496 6.23267 5.04533C6.19334 4.956 6.07667 4.892 5.97067 4.87933C5.93467 4.87533 5.89867 4.87133 5.86267 4.86867C5.77314 4.86422 5.68343 4.86511 5.594 4.87133V4.872Z"
          fill={color}
        />
      </svg>
      <span className={style.mobile__data} style={{color: color}}>
        {number}
      </span>
    </div>
  );
}
