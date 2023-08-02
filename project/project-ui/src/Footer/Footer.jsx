import Footer from "rc-footer";
import "rc-footer/assets/index.css"; // import 'rc-footer/asssets/index.less';
import React from "react";

export default function CustomFooter() {
  const year = new Date().getFullYear();
  const element = (
    <p style={{ textAlign: "center", marginBottom: "2px" }}>
      &copy; {year} CanKitchen. All rights reserved.
    </p>
  );

  return (
    <div>
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
                url: 'https://pro.ant.design/',
                openExternal: true,
              },
              {
                title: 'Partners',
                url: 'https://mobile.ant.design/',
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
  );
}

//////

// import '../../assets/index.less';
// import React from 'react';
// import Footer from 'rc-footer';

// export default function App() {
//   return (
//     <div>
//       <Footer
//         columns={[
//           {
//             title: '相关资源',
//             items: [
//               {
//                 title: 'Ant Design Pro',
//                 url: 'https://pro.ant.design/',
//                 openExternal: true,
//               },
//               {
//                 title: 'Ant Design Mobile',
//                 url: 'https://mobile.ant.design/',
//                 openExternal: true,
//               },
//               {
//                 title: 'Kitchen',
//                 url: 'https://kitchen.alipay.com/',
//                 description: 'Sketch 工具集',
//               },
//             ],
//           },
//           {
//             title: '社区',
//             items: [
//               {
//                 title: 'Ant Design Pro',
//                 url: 'https://pro.ant.design/',
//                 openExternal: true,
//               },
//               {
//                 title: 'Ant Design Mobile',
//                 url: 'https://mobile.ant.design/',
//                 openExternal: true,
//               },
//               {
//                 title: 'Kitchen',
//                 url: 'https://kitchen.alipay.com/',
//                 description: 'Sketch 工具集',
//               },
//             ],
//           },
//           {
//             title: '帮助',
//             items: [
//               {
//                 title: 'Ant Design Pro',
//                 url: 'https://pro.ant.design/',
//                 openExternal: true,
//               },
//               {
//                 title: 'Ant Design Mobile',
//                 url: 'https://mobile.ant.design/',
//                 openExternal: true,
//               },
//               {
//                 title: 'Kitchen',
//                 url: 'https://kitchen.alipay.com/',
//                 description: 'Sketch 工具集',
//               },
//             ],
//           },
//           {
//             icon: (
//               <img
//                 src="https://gw.alipayobjects.com/zos/rmsportal/nBVXkrFdWHxbZlmMbsaH.svg"
//                 alt="more products"
//               />
//             ),
//             title: '更多产品',
//             items: [
//               {
//                 icon: (
//                   <img
//                     src="https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg"
//                     alt="yuque"
//                   />
//                 ),
//                 title: '语雀',
//                 url: 'https://yuque.com',
//                 description: '知识创作与分享工具',
//                 openExternal: true,
//               },
//               {
//                 icon: (
//                   <img
//                     src="https://gw.alipayobjects.com/zos/rmsportal/uHocHZfNWZOdsRUonZNr.png"
//                     alt="yuque"
//                   />
//                 ),
//                 title: '云凤蝶',
//                 url: 'https://yunfengdie.com',
//                 description: '中台建站平台',
//                 openExternal: true,
//               },
//             ],
//           },
//         ]}
//         bottom="Made with ❤️ by AFX"
          // bottom={element}
        // theme="light"
     // backgroundColor="#E07A5F"
//       />
//     </div>
//   );
// }