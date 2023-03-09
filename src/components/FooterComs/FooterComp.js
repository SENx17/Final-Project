import React from "react";
import footerStyle from "./FooterComp.module.css";

const FooterComp = () => {
  return (
    <>
      <footer className={footerStyle.footerContainer}>
        <div className="py-4">
          &copy; 2023 Copyright : <span>Yohannes Julius</span>
        </div>
      </footer>
    </>
  );
};

export default FooterComp;
