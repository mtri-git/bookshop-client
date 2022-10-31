import React from 'react'

export default function PaginateBar() {
  return (
    <div>PaginateBar</div>
  )
}
// {totalCount, currentCount, pageSize, onPageChange, siblingCount}
// totalPage = Math.ceil(totalCount/pageSize)
// const range = (start, end) => {
//     let length = end - start + 1;
//     /*
//         Create an array of certain length and set the elements within it from
//       start value to end value.
//     */
//     return Array.from({ length }, (_, idx) => idx + start);
//   };
