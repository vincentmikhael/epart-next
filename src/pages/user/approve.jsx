import { Container, Row, Col, Form, Label, Input, Button, Portlet } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Head from "next/head"
import Card from "@panely/components/Card"
import Table from "@panely/components/Table"
import React, { useEffect, useState } from "react"
import { useTable } from "react-table"
import DataTable from "react-data-table-component"
import axios from "axios"
import Link from "next/link"
import FloatLabel from "@panely/components/FloatLabel"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers"
import CustomInput from "@panely/components/CustomInput"
import Select from "react-select";
import instance from "config/axios-config"
import Swal from "@panely/sweetalert2"
import AsyncSelect from "react-select/async";

function FormBasePage(props) {

  const [visitor, setVisitor] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("User")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "User", link: "/user/register" }
    ])
  }, []);


    return (
      <React.Fragment>
        <Head>
          <title>User</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body className="pb-5">
                        <div className="d-flex justify-content-between">
                            <h1>Approve User</h1>
                        </div>
                        
                          <Login1Form />
                      </Card.Body>
                    </Card>
        </Container>
      </React.Fragment>
    )
}

function Login1Form() {

  const [userID, setUserID] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    let a = []
    instance.get('users/list').then(e=>{
    e.data.data.map(e =>{
      a.push({
        label: e.userID,
        value: e.userID
      })
    })
  })
  setData(a)

  }, [])
  const schema = yup.object().shape({

  })

  const { control, handleSubmit, errors,reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      userID: ""
    }
  })


  // Handle form submit event
  const onSubmit = data => {
    instance.put('/users/approve',{
      userID: userID
    }).then(e=>{
      if(e.data.status){
        Swal.fire({ text: "User berhasil di approve", icon: "success" })
      }else{
        Swal.fire({ title: "User gagal di approve", text: e.data.message, icon: "error" })
      }
    })
  }
 
//   const filterData = (inputValue) => {
  

// };

  const loadOptions = (inputValue, callback) => {
  return callback(data.filter(i => i.label.includes(inputValue)))
};


  const getValue = option =>{
   setUserID(option.value)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="mb-5 pb-5s">
      {/* BEGIN Form Group */}
      <Row>
        <Col md="6">
            <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions={data}
          onChange={getValue}
        />
        </Col>
          

      </Row>
      



      <div className="d-flex align-items-center justify-content-between">

        <Button type="submit" className="mt-3" variant="label-primary" size="lg" width="widest">
          Submit
        </Button>
      </div>
    </Form>
  )
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withLayout(FormBasePage))