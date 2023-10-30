declare module "*.module.css";
declare module "*.module.scss";

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module "*.jpg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare module "*.webp" {
  const value: any;
  export default value;
}
declare module "*.png" {
  const value: any;
  export default value;
}

// declare module "*.svg" {
//   import {ReactElement, SVGProps} from "react";
//   const content: (props: SVGProps<SVGElement>) => ReactElement;
//   export default content;
// }
declare module "*.svg" {
  import {ReactElement, SVGProps} from "react";
  const ReactComponent: (props: SVGProps<SVGElement>) => ReactElement;
  export {ReactComponent};
}
