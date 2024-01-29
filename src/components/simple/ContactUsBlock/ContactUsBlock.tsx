import style from "./__contactUsBlock.module.scss";
import ContactUs from "../../ui/ContactUs/ContactUs";

export default function ContactUsBlock() {
  return (
    <div className={style.contactUsBlock}>
      <div className={style.text}>
        <h5>Do you still have questions? Contact us for answers.</h5>
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enim velit mollit.
        </p>
      </div>
      <div className={style.button}>
        <ContactUs version={"dark"} />
      </div>
    </div>
  );
}
