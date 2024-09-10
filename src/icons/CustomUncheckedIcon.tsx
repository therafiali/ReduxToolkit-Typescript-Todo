import React from 'react';

const CustomUncheckedIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
  className='bg-gray-700 rounded-md'
    {...props}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="gray"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" fill="#e3e8e9" />
  </svg>
);

export default CustomUncheckedIcon;
