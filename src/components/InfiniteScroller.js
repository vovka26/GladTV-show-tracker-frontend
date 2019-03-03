import React, { PureComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

class InfiniteScroll extends PureComponent {

    render() {
        return (
            <InfiniteScroll
                pageStart={2}
                loadMore={loadFunc}
                hasMore={true || false}
                loader={<div className="loader" key={0}>Loading ...</div>}
            >
                {items}
            </InfiniteScroll>
        )
    }
}

export default InfiniteScroll;
