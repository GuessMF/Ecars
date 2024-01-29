import style from "./__FAQ.module.scss";

import {useState} from "react";
import ContactUsBlock from "../../components/simple/ContactUsBlock/ContactUsBlock";
import {ReactComponent as DownArrow} from "./downArrow.svg";
import {ReactComponent as UpArrow} from "./upArrow.svg";

export default function FAQ() {
  const [openedIndex, setOpenedIndex] = useState<number | null>(null);
  const openMenu = (index: number) => {
    setOpenedIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  return (
    <div className={style.FAQ}>
      <h1>Frequently asked questions</h1>
      <div className={style.questions}>
        <li onClick={() => openMenu(0)}>
          <div className={style.question}>
            <span>What are the guarantees?</span>
            {openedIndex === 0 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 0 ? style.answer_opened : style.answer_closed
            }
          >
            We provide various guarantees based on the type of car and services.
            Warranty details can be discussed during the purchase process.
          </div>
        </li>
        <li onClick={() => openMenu(1)}>
          <div className={style.question}>
            <span>How much does shipping cost?</span>
            {openedIndex === 1 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 1 ? style.answer_opened : style.answer_closed
            }
          >
            Shipping varies depending on the car you are buying as its
            calculated by the dimensions of each unit. There is RORO and
            Container so depending on your choice we will be able to give you an
            estimate, closer to the shipping date we will share an exact quote.
          </div>
        </li>
        <li onClick={() => openMenu(2)}>
          <div className={style.question}>
            <span>Are you a car dealer?</span>
            {openedIndex === 2 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 2 ? style.answer_opened : style.answer_closed
            }
          >
            Yes, we are a reputable car dealer with a wide range of vehicles
            available for purchase.
          </div>
        </li>
        <li onClick={() => openMenu(3)}>
          <div className={style.question}>
            <span>Do I have to buy a car from Dubicars only?</span>
            {openedIndex === 3 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 3 ? style.answer_opened : style.answer_closed
            }
          >
            While we recommend Dubicars for quality, you are free to explore
            other options. However, our services are optimized for Dubicars
            purchases.
          </div>
        </li>
        <li onClick={() => openMenu(4)}>
          <div className={style.question}>
            <span>
              How long does it take from the time I sign up to shipping time?
            </span>
            {openedIndex === 4 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 4 ? style.answer_opened : style.answer_closed
            }
          >
            The time from sign-up to shipping varies. It depends on factors like
            the car model, inspection, and shipping method. We'll provide an
            estimate during the process.
          </div>
        </li>
        <li onClick={() => openMenu(5)}>
          <div className={style.question}>
            <span>How long does the inspection take?</span>
            {openedIndex === 5 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 5 ? style.answer_opened : style.answer_closed
            }
          >
            Inspection times vary, but typically it takes a few days. We aim to
            complete it promptly to ensure a smooth process.
          </div>
        </li>
        <li onClick={() => openMenu(6)}>
          <div className={style.question}>
            <span>What if the inspection fails?</span>
            {openedIndex === 6 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 6 ? style.answer_opened : style.answer_closed
            }
          >
            If the inspection fails, we will work with you to address the
            issues. You may choose to cancel the purchase or explore options for
            repairs.
          </div>
        </li>
        <li onClick={() => openMenu(7)}>
          <div className={style.question}>
            <span>Can you help me with Car Repair if needed?</span>
            {openedIndex === 7 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 7 ? style.answer_opened : style.answer_closed
            }
          >
            Yes, we can assist you in finding reliable car repair services if
            needed. We aim to ensure your vehicle's optimal condition.
          </div>
        </li>
        <li onClick={() => openMenu(8)}>
          <div className={style.question}>
            <span>
              I’m buying 2 cars, do I have to pay again for Export Safe?
            </span>
            {openedIndex === 8 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 8 ? style.answer_opened : style.answer_closed
            }
          >
            Export Safe fees are generally per vehicle. For multiple cars, we
            can discuss potential discounts or package deals.
          </div>
        </li>
        <li onClick={() => openMenu(9)}>
          <div className={style.question}>
            <span>Can I get a refund if I don’t buy a car?</span>
            {openedIndex === 9 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 9 ? style.answer_opened : style.answer_closed
            }
          >
            Refund policies vary. We can discuss the specific terms during the
            purchasing process to ensure transparency.
          </div>
        </li>
        <li onClick={() => openMenu(10)}>
          <div className={style.question}>
            <span>What about customs, duty, VAT and clearance?</span>
            {openedIndex === 10 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 10 ? style.answer_opened : style.answer_closed
            }
          >
            We provide assistance and information regarding customs, duty, VAT,
            and clearance processes. These costs and procedures will be
            explained to you during the purchase.
          </div>
        </li>
        <li onClick={() => openMenu(11)}>
          <div className={style.question}>
            <span>What are the payment Methods?</span>
            {openedIndex === 11 ? <UpArrow /> : <DownArrow />}
          </div>

          <div
            className={
              openedIndex === 11 ? style.answer_opened : style.answer_closed
            }
          >
            We accept various payment methods, including bank transfers and
            online payments. Details will be provided during the purchasing
            process.
          </div>
        </li>
      </div>
      <ContactUsBlock />
    </div>
  );
}
