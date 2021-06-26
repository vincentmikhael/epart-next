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

function FormBasePage(props) {

  const [visitor, setVisitor] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("Banner")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Banner", link: "/banner/add" }
    ])
  }, []);


    return (
      <React.Fragment>
        <Head>
          <title>Banner</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Banner</h1>
                        </div>
                        
                          <Login1Form />
                      </Card.Body>
                    </Card>
        </Container>
      </React.Fragment>
    )
}

function Login1Form() {
    const [image, setImage] = useState("")
  // Define Yup schema for form validation
  const schema = yup.object().shape({
    title: yup
      .string()
      .required("Harus Diisi"),
  })

  const { control, handleSubmit, errors,reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      title: ""
    }
  })

  const handleImage = e => {
      console.log(e)
    setImage(e.target.files[0])
  }

  // Handle form submit event
  const onSubmit = data => {
      let formData = new FormData();
      formData.append('uploadFile',image)
      formData.append('title',data.title)
    instance.post('/banner',formData).then(e=>{
          console.log(e)
      if(e.data.status){
        
        reset({
      title: "",
    })
    setImage("")
        Swal.fire({ text: "Banner berhasil dibuat", icon: "success" })
      }else{
        Swal.fire({ title: "Banner gagal dibuat", text: e.data.message, icon: "error" })
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* BEGIN Form Group */}
      <Row>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="title"
                        name="title"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.title)}
                        placeholder="Please insert your title"
                    />
                    <Label for="title">Title</Label>
                    {errors.title && <Form.Feedback children={errors.title.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>

          <Col md="6">
            <Form.Group className="mb-0">
                <Input type="file"name="uploadFile" onChange={handleImage} invalid={Boolean(errors.uploadFile)}></Input>
                    {errors.uploadFile && <Form.Feedback children={errors.uploadFile.message} />}
                  </Form.Group>
        </Col>

      </Row>
      



      <div className="d-flex align-items-center justify-content-between">

        <Button type="submit" variant="label-primary" size="lg" width="widest">
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