import React, {useEffect, useState} from 'react';
import { Form, DatePicker, Button, Row, Col, Input} from 'antd';
import {} from '@ant-design/icons';
import moment from 'moment';

const {TextArea} = Input;

export const UploadData = (props) => {
  //const {startDate, setStartDate, endDate, setEndDate, searchData} = props;
  const [inputText, setInputText] = useState("");
	const [date, setDate] = useState("");

  const [form] = Form.useForm();

  const initializeFormFields = () => {
    form.setFieldsValue({
      inputText: "",
      date: ""
    })
  }

  //Initialize form's fields
  useEffect(() => {
    initializeFormFields()
  }, [])


  const saveData = () => {
    form.validateFields()
    .then(() =>{
      const newData = {
        date: moment(date, "DD/MM/YYYY").unix(),
        input: inputText
      }
      console.log("newData",newData)
      setDate("");
      setInputText("");
      initializeFormFields();
    })
    .catch((error) => {
			console.log("An error occured");
		})
    
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Fail:', errorInfo);
  };
  return (
  <div>
    <Form
      form={form}
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      onFinish={()=>saveData()}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item 
        name="inputText"
        label="Input"
        rules={[
          {
            required: true,
            message: "This field must not be empty.",
          },
        ]}
      >
        <TextArea 
          value={inputText}
          autoSize={{ minRows: 3, maxRows: 5 }}
          placeholder="What do you want to tell me today.." 
          onChange={(input)=>{
            if (input && input.target && input.target.value) {
              setInputText(input.target.value);
            }
          }}
        />
      </Form.Item>
      <Form.Item
        name="date"
        label="Date"
        rules={[
          {
            required: true,
            message: "Please choose a date.",
          },
        ]} 
      >
        <DatePicker
          value={date || null}
          format="DD/MM/YYYY"
          onChange={(date, dateString) => {
            setDate(dateString)
          }}
        />
      </Form.Item>

      <Row justify="center" align="middle" wrap={false} style={{position:"absolute",bottom:"30px",left:"0px",width:"100%"}}>
        <Col><Button type="primary" htmlType="submit" style={{marginRight:"10px"}}>
          Submit
        </Button></Col>
      </Row>
    </Form>
  </div>
 );
}