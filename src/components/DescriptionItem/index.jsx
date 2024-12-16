import React, {useEffect, useState} from 'react';
import {Descriptions} from 'antd';

const DescriptionItem = ({selectedDescription}) => {
    const items = [
        {
            key: '1',
            //label: 'Mô tả',
            children: <p dangerouslySetInnerHTML={{__html: selectedDescription}}/>,
        }
    ];
    return <Descriptions layout="vertical" items={items}/>;
};

export default DescriptionItem;
