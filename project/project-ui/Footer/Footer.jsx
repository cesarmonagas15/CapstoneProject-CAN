import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import React from "react";

export default function CustomFooter() {
  const year = new Date().getFullYear();
  const element = (
    <p style={{ textAlign: "center", marginBottom: "10px" }}>
      &copy; {year} CanKitchen. All rights reserved.
    </p>
  );

  return (
    <Footer
      columns={[
        {
          icon: (
            <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
          ),
          title: "column 1",
          url: "url.com",
          description: "this is a test",
          openExternal: true,
        },
        {
          icon: (
            <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
          ),
          title: "column 2",
          url: "url.com",
          description: "this is a test",
          openExternal: true,
        },
        {
          icon: (
            <img src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg" />
          ),
          title: "column 3",
          url: "url.com",
          description: "this is a test",
          openExternal: true,
        },
      ]}
      bottom={element}
      //   theme="light"
      backgroundColor="#E07A5F"
    />
  );
}
