"use client";
import ReactDOM from "react-dom";
import { ReactNode } from "react";
import Card from "./Card";

const Backdrop = (props: { onConfirm(): void }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen z-20 bg-black opacity-75`}
      onClick={props.onConfirm}
    ></div>
  );
};
const Overlay = (props: { children: ReactNode }) => {
  return (
    <Card>
      <div
        className={`fixed top-20 left-5 w-96 p-4 bg-white rounded-md shadow-2xl z-30 animate-accordion-up`}
      >
        {props.children}
      </div>
    </Card>
  );
};

const Modal = (props: { onConfirm(): void; children: ReactNode }) => {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;
  const backdropRoot = document.getElementById("backdrop") as HTMLElement;
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        modalRoot,
      )}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, backdropRoot)}
    </>
  );
};

export default Modal;
