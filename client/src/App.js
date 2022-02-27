import React, {useEffect, useState} from 'react';

import {Card, Button, Table, Row, Col, Typography, Tooltip, Drawer, message, Badge, Avatar} from 'antd';
import {FilterOutlined} from '@ant-design/icons';
import moment from 'moment';
import {Filters} from "./Filters";
import {UploadData} from "./UploadData"
import {FakeNav} from "./FakeNav"

import './css/App.less';

const { Title, Text } = Typography;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const tableColumns = [
    {
      title: 'Id',
      dataIndex: '_id',
      key: '_id',
      width: 70,
    },
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
      },
      sorter: (a, b) => a.date - b.date,
    },
  ]

function App() {
  //State management
  const [data, setData] = useState([]);
  const [filtersDrawerOpen, setFiltersDrawerOpen] = useState(false);
  const [newDataDrawerOpen, setNewDataDrawerOpen] = useState(false);

  const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
  const [filterFormSubmitted, setFilterFormSubmitted] = useState(true);

  const [filterCount, setFilterCount] = useState(0);
  
  //Function to retrieve data from DB
  const retrieveData = async () => {
    const filters = {
			dateInterval: {
				from: moment(startDate, "DD/MM/YYYY").unix() || null,
				to: moment(endDate, "DD/MM/YYYY").unix() || null
      },
		};
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({filters: filters})
    };
    return fetch(SERVER_URL+'/retrieveData', requestOptions)
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
    })
    .catch(error => {
      message.error("An errorr occured while retrieving the data")
    })
  }

  //Count the number of active filters
  useEffect(() => {
    if (startDate != "" && endDate != "") {
      setFilterCount(1)
    } else {
      setFilterCount(0)
    }
  }, [startDate, endDate])

  //Initializing data array
  useEffect(() => {
    retrieveData()
  }, [])

  return (
    <div className="">
      <header className="App-header">
      <Col sm={22} lg={18} xxl={12}>
        <Card 
          title={<FakeNav/>} 
          style={{width:"100%", overflow:"hidden", borderRadius:"10px"}}
          extra={<Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>JK</Avatar>}
        >
          <Row justify="space-between" align="middle" wrap={false} style={{marginBottom:"20px"}}>
            <Col flex="none">
              <Title level={3} style={{marginBottom:"0px"}}>Inputs</Title>
              <Text type="secondary">{`${data.length} data`}</Text>
            </Col>
            <Col flex="none">
              <Badge size="small" count={filterCount}>
                <Tooltip title="Filters">
                  <Button type="primary" shape="circle" size='large' icon={<FilterOutlined />} onClick={()=>setFiltersDrawerOpen(true)}/>
                </Tooltip>
              </Badge>
              <Button type="primary" size="large" onClick={()=>setNewDataDrawerOpen(true)} style={{borderRadius:"5px", marginLeft:"20px"}}>Add data</Button>
            </Col>
          </Row>
            
          <Table
            rowSelection={{
              onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
              },
            }}
            columns={tableColumns}
            dataSource={data}
            pagination={{ position:["none", "bottomCenter"],pageSize: 10 }}
            scroll={{ 
              scrollToFirstRowOnChange: true,
              y: 300 
            }}
            style={{height:"420px"}}
          />
          
          <Drawer
            title="Filters"
            placement="right"
            closable={true}
            onClose={()=>{
              console.log('hey',filterFormSubmitted, !filterFormSubmitted)
              setFiltersDrawerOpen(false);
              if (!filterFormSubmitted) {
                retrieveData();
                setFilterFormSubmitted(true);
              }
            }}
            visible={filtersDrawerOpen}
            getContainer={false}
            style={{ position: 'absolute' }}
          >
            <Filters
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              setFiltersDrawerOpen={setFiltersDrawerOpen}
              setFilterFormSubmitted={setFilterFormSubmitted}
              retrieveData={retrieveData}
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
              retrieveData={retrieveData}
            />
          </Drawer> 
        </Card>
      </Col>
      </header>
    </div>
  );
}

export default App;
