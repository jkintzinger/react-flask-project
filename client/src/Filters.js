import React, {useEffect, useState} from 'react';
import { Form, DatePicker, Button, Row, Col} from 'antd';
import {} from '@ant-design/icons';
import moment from 'moment';

export const Filters = (props) => {
  const {setData, setFiltersDrawerOpen} = props;

  const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

  const searchData = () => {
		const filters = {
			dateInterval: {
				from: moment(startDate, "DD/MM/YYYY").unix() || null,
				to: moment(endDate, "DD/MM/YYYY").unix() || null
      },
		};
    console.log("filters",filters)
    setFiltersDrawerOpen(false);
	};

  const onFinishFailed = (errorInfo) => {
    console.log('Fail:', errorInfo);
  };
  return (
  <div>
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      onFinish={()=>searchData()}
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
              moment()
            ],
            'This Month': [
              moment().startOf('month'),
              moment()
            ]
          }}
          value={[startDate? moment(startDate,"DD/MM/YYYY"):null, endDate? moment(endDate,"DD/MM/YYYY"):null]}
          format="DD/MM/YYYY"
          onChange={(dates, dateStrings) => {
            setStartDate(dateStrings[0]);
            setEndDate(dateStrings[1])
          }}
          style={{width:"100%"}}
        />
      </Form.Item>

      <Row justify="center" align="middle" wrap={false} style={{position:"absolute",bottom:"30px",left:"0px",width:"100%"}}>
        <Col><Button type="primary" htmlType="submit" style={{marginRight:"10px"}}>
          Submit
        </Button></Col>
        <Col><Button htmlType="button" onClick={()=>{setStartDate(null);setEndDate(null)}}>
          Reset
        </Button></Col>
      </Row>
    </Form>
  </div>
 );
}