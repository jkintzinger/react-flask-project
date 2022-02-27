import React, {useEffect, useState} from 'react';
import { Form, DatePicker, Button, Row, Col, message} from 'antd';
import {} from '@ant-design/icons';
import moment from 'moment';

export const Filters = (props) => {
  const {
    retrieveData, 
    setFiltersDrawerOpen, 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate,
    setFilterFormSubmitted
  } = props;

  //Retrieve data from DB with filters
  const filterData = () => {
    setFiltersDrawerOpen(false);
    setFilterFormSubmitted(true);
    retrieveData();
	};

  const onFinishFailed = (errorInfo) => {
    message.error("Failed to submit the form")
  };

  return (
  <div>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      onFinish={()=>filterData()}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item label="Date">
        <DatePicker.RangePicker
          ranges={{
            'Yesterday': [
              moment().subtract(1, 'day').startOf('day'),
              moment().subtract(1, 'day').endOf('day')
            ],
            'This Week': [
              moment().startOf('week'),
              moment().endOf('week')
            ],
            'This Month': [
              moment().startOf('month'),
              moment().endOf('month')
            ]
          }}
          value={[startDate? moment(startDate,"DD/MM/YYYY"):null, endDate? moment(endDate,"DD/MM/YYYY"):null]}
          format="DD/MM/YYYY"
          onChange={(dates, dateStrings) => {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1]);
            setFilterFormSubmitted(false);
          }}
          style={{width:"100%"}}
        />
      </Form.Item>

      <Row justify="center" align="middle" wrap={false} style={{position:"absolute",bottom:"30px",left:"0px",width:"100%"}}>
        <Col><Button type="primary" htmlType="submit" style={{marginRight:"10px"}}>
          Submit
        </Button></Col>
        <Col><Button htmlType="button" onClick={()=>{setStartDate("");setEndDate("");setFilterFormSubmitted(false);}}>
          Reset
        </Button></Col>
      </Row>
    </Form>
  </div>
 );
}