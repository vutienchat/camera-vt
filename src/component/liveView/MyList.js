import React, { useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import InfiniteScroll from "react-infinite-scroll-component";

const MyList = () => {
  const notiRef = useRef();
  const [items, setItems] = useState(
    Array.from({ length: 100 }, (_, index) => `Item ${index}`)
  );
  const itemSize = 35; // Chiều cao của mỗi mục
  const onScroll = () => {
    console.log(notiRef.current.querySelector("#load-more-data"));
  };

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={itemSize}
      width={400}
      onScroll={onScroll}
      outerRef={notiRef}
    >
      {({ index, style }) => (
        <div style={style} id={items.length - index === 3 && "load-more-data"}>
          {items[index]}
        </div>
      )}
    </List>
  );
};

export default MyList;
