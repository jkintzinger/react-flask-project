import React, {useEffect, useState} from 'react';
import { Form, DatePicker, Button, Row, Col, Input, message} from 'antd';
import {} from '@ant-design/icons';
import moment from 'moment';

const {TextArea} = Input;

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


export const UploadData = (props) => {
  const {retrieveData} = props;

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

  //Save data to the DB then retrieve all data (with filters if necessary)
  const saveData = () => {
    form.validateFields()
    .then(() =>{
      const newData = {
        date: moment(date, "DD/MM/YYYY").unix(),
        input: inputText
      }
      setDate("");
      setInputText("");
      initializeFormFields();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newData)
      };
      fetch(SERVER_URL+'/uploadData', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log("uploadData data",data )
        message.success("Your input has been saved in the database")
        retrieveData()
      })
      .catch(error => {
        message.error("An errorr occured while saving your input")
      })
    })
    .catch((error) => {
			message.error("Missing fields")
		})
    
  };
  const onFinishFailed = (errorInfo) => {
    message.error("Failed to submit the form")
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