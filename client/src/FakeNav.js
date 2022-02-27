import React, {useEffect, useState} from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';


export const FakeNav = (props) => {

  return (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="">
        <HomeOutlined />
      </Breadcrumb.Item>
      <Breadcrumb.Item href="">
        <UserOutlined />
        <span>Storage</span>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Inputs</Breadcrumb.Item>
    </Breadcrumb>
  </div>
 );
}