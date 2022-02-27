import React, {useEffect, useState} from 'react';

import { Form, DatePicker, Card, Input, Button, Table, Row, Col, Typography, Tooltip, Drawer} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Filters} from "./Filters";
import {UploadData} from "./UploadData"

import 'antd/dist/antd.css';
import './App.css';

const { Title, Text } = Typography;

const fakeData = [
  {
    key: '1',
    input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    date: 1644879600,
  },
  {
    key: '2',
    input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: 1644879600,
  },
  {
    key: '3',
    input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: 1644879600,
  },
  {
    key: '4',
    input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    date: 1644879600,
  },
  {
    key: '5',
    input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    date: 1644879600,
  },
  {
    key: '6',
    input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    date: 1644879600,
  },
];

const tableColumns = [
    {
      title: 'Input',
      dataIndex: 'input_data',
      key: 'input',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date) => {
        return <> {moment.unix(date).format('DD/MM/YYYY')} </>
      }
    },
  ]

function App() {
  const [data, setData] = useState(fakeData)
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false)
  const [newDataDrawerOpen, setNewDataDrawerOpen] = useState(false)

  
  
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  useEffect(() => {
    const headers = { 'Content-Type': 'application/json' }
    fetch('http://localhost:5000/data')
    .then(response => response.json())
    .then(data => {
      if (data && Array.isArray(data)) {
        const formatedData = data.map(oneData => {
          return {
            ...oneData,
            key: oneData._id
          }
        })
        setData(formatedData)
      }
      console.log("data",data )
    })
    .catch(error => {
      console.log("error", error)
    })
  }, [])
  

  return (
    <div className="">
      <header className="App-header">
      <Col sm={22} lg={18} xxl={12}>
        <Card title={<Title level={2} style={{marginBottom:"0px"}}>Welcome to your online storage</Title>} style={{width:"100%", overflow:"hidden"}}>
          <Row justify="space-between" align="middle" wrap={false} style={{marginBottom:"20px"}}>
            <Col flex="none">
              <Title level={3} style={{marginBottom:"0px"}}>Inputs</Title>
              <Text type="secondary">{`${data.length} data`}</Text>
            </Col>
            <Col flex="none">
              <Tooltip title="Filters">
                <Button type="primary" shape="circle" size='large' icon={<FilterOutlined />} onClick={()=>setFiltersDrawerOpen(true)}/>
              </Tooltip>
              <Button type="primary" size="large" onClick={()=>setNewDataDrawerOpen(true)} style={{borderRadius:"5px", marginLeft:"20px"}}>Add data</Button>
            </Col>
          </Row>
            
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={tableColumns}
            dataSource={data}
            pagination={{ position:["none", "bottomCenter"],pageSize: 10 }}
            scroll={{ 
              scrollToFirstRowOnChange: true,
              y: 300 
            }}
          />

          <Drawer
            title="Filters"
            placement="right"
            closable={true}
            onClose={()=>setFiltersDrawerOpen(false)}
            visible={filtersDrawerOpen}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <Filters
              setFiltersDrawerOpen={setFiltersDrawerOpen}
              setData={setData}
            />
          </Drawer> 
          <Drawer
            title="Upload new data"
            placement="right"
            closable={true}
            onClose={()=>setNewDataDrawerOpen(false)}
            visible={newDataDrawerOpen}
            getContainer={false}
            style={{ position: 'absolute' }}
            width={"60%"}
          >
            <UploadData
              setData={setData}
            />
          </Drawer> 
        </Card>
      </Col>
      </header>
    </div>
  );
}

export default App;
