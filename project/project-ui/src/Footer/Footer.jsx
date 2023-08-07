import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import React from "react";
import "./Footer.css"

export default function CustomFooter() {
  const year = new Date().getFullYear();
  const element = (
    <p style={{ textAlign: "center", marginBottom: "2px" }}>
      &copy; {year} CanKitchen. All rights reserved.
    </p>
  );

  return (
    <>
    <br/>
    <div className="footer-container">
    <Footer
        columns={[
          {
            title: 'CONTACT US',
            items: [
              {
                title: 'CanKitchen.inc@gmail.com',
                url: 'mailto:cankitchen.inc@gmail.com',
                openExternal: true,
              }
            ],
          },
          {
            title: 'GENERAL',
            items: [
              {
                title: 'Mission',
                url: 'https://capstonecan.web.app/AboutUs',
                openExternal: true,
              },
              {
                title: 'Partners',
                url: 'https://capstonecan.web.app/FoodShift',
                openExternal: true,
              },
            ],
          },
          {
            title: 'FOOD SHIFT',
            items: [
              {
                title: 'Website',
                url: 'https://foodshift.net/',
                openExternal: true,
              },
              {
                title: 'Donate Here',
                url: 'https://secure.acceptiva.com/?cst=37a27a',
                openExternal: true,
              },
            ],
          },
          {
            title: 'SPONSORED BY',
            items: [
              {
                title: 'Salesforce',
                url: 'https://www.salesforce.com/company/careers/university-recruiting/',
                openExternal: true,
              },
              {
                title: 'CodePath',
                url: 'https://www.codepath.org/',
                openExternal: true,
              },
            ],
          },
        ]}
        bottom={element}
        // theme="light"
     backgroundColor="#E07A5F"
     
      />
    </div>
    </>
  );
      }