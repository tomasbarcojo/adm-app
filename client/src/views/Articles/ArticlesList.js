import React from 'react';
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>
    Row {index}
  </div>
);

// const Example = () => (
//   <List
//     className="List"
//     height={150}
//     itemCount={1000}
//     itemSize={35}
//     width={300}
//   >
//     {Row}
//   </List>
// );

export default function ArticlesList() {
  return (
    <List
      className="List"
      height={1500}
      itemCount={1000}
      itemSize={35}
      width={1000}
    >
      {Row}
    </List>
  )
}
