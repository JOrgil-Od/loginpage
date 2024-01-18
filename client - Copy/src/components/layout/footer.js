import React from "react";

function FooterLayout() {
  return (
    <footer className="footer-layout">
      <div className="footer-short-text">
        {`Created by Orgil-Od.J © ${new Date().getFullYear()} он`}
      </div>
      <div className="footer-long-text">
        {`Created by Orgil-Od.J © ${new Date().getFullYear()} он`}
      </div>
    </footer>
  );
}

export default FooterLayout;
