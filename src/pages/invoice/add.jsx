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

  const [image, setImage] = useState("")

  useEffect(() => {
        props.pageChangeHeaderTitle("Invoice")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Invoice", link: "/invoice" }
    ])
  }, []);


    return (
      <React.Fragment>
        <Head>
          <title>Invoice</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Add Invoice</h1>
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
    invoice_title: yup
      .string()
      .required("Harus Diisi"),
    invoice_for: yup
      .string()
      .required("Harus Diisi"),
    invoice_total: yup
      .string()
      .required("Harus Diisi"),
    invoice_period_start: yup
      .string()
      .required("Harus Diisi"),
    invoice_period_end: yup
      .string()
      .required("Harus Diisi"),

  })

   const handleImage = e => {
      console.log(e)
    setImage(e.target.files[0])
  }

  const { control, handleSubmit, errors,reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      invoice_title: "",
      invoice_for: "",
      invoice_total: "",
      invoice_period_start: "",
      invoice_period_end: "",
    }
  })

  // Handle form submit event
  const onSubmit = data => {
      let formData = new FormData();
      formData.append('invoice_title',data.invoice_title)
      formData.append('invoice_for',data.invoice_for)
      formData.append('invoice_total',data.invoice_total)
      formData.append('invoice_period_start',data.invoice_period_start)
      formData.append('invoice_period_end',data.invoice_period_end)
      formData.append('uploadFile',image)

    instance.post('/invoice',formData).then(e=>{
      if(e.data.status){
        reset({
      invoice_title: "",
      invoice_for: "",
      invoice_total: "",
      invoice_period_start: "",
      invoice_period_end: "",
    })
        Swal.fire({ text: "Invoice berhasil ditambahkan", icon: "success" })
      }else{
        
        Swal.fire({ title: "Invoice gagal ditambahkan", text: e.data.error.message, icon: "error" })
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
                        id="invoice_title"
                        name="invoice_title"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.invoice_title)}
                        placeholder="Please insert your invoice_title"
                    />
                    <Label for="invoice_title">Invoice Title</Label>
                    {errors.invoice_title && <Form.Feedback children={errors.invoice_title.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="invoice_for"
                        name="invoice_for"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.invoice_for)}
                        placeholder="Please insert your invoice_for"
                    />
                    <Label for="invoice_for">Invoice For</Label>
                    {errors.invoice_for && <Form.Feedback children={errors.invoice_for.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>

          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="date"
                        id="invoice_period_start"
                        name="invoice_period_start"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.invoice_period_start)}
                        placeholder="Please insert your invoice_period_start"
                    />
                    <Label for="invoice_period_start">Period Start</Label>
                    {errors.invoice_period_start && <Form.Feedback children={errors.invoice_period_start.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>

          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="date"
                        id="invoice_period_end"
                        name="invoice_period_end"
                        size="lg"
                        control={control}
                        outvalid={Boolean(errors.invoice_period_end)}
                        placeholder="Please outsert your invoice_period_end"
                    />
                    <Label for="invoice_period_end">Period end</Label>
                    {errors.invoice_period_end && <Form.Feedback children={errors.invoice_period_end.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>

           <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="invoice_total"
                        name="invoice_total"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.invoice_total)}
                        placeholder="Please insert your invoice_total"
                    />
                    <Label for="invoice_total">Invoice Total</Label>
                    {errors.invoice_total && <Form.Feedback children={errors.invoice_total.message} />}
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