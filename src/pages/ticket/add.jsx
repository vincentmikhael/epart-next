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
        props.pageChangeHeaderTitle("Ticket")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Ticket", link: "/ticket/add" }
    ])
  }, []);


    return (
      <React.Fragment>
        <Head>
          <title>Ticket</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Add Ticket</h1>
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
    note: yup
      .string()
      .required("Harus Diisi"),
    name: yup
      .string()
      .required("Harus Diisi"),
    phone: yup
      .string()
      .required("Harus Diisi"),
    nik: yup
      .string()
      .required("Harus Diisi"),
    ticket_checkin: yup
      .string()
      .required("Harus Diisi"),
    ticket_checkout: yup
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
      title: "",
      note: "",
      name: "",
      phone: "",
      nik: "",
      ticket_checkin: "",
      ticket_checkout: "",
      attachment: ""
    }
  })

  // Handle form submit event
  const onSubmit = data => {
      console.log(data)
    instance.post('/ticket',data).then(e=>{
      console.log(e)
      if(e.data.status){
        reset({
      title: "",
      note: "",
      name: "",
      phone: "",
      nik: "",
      ticket_checkin: "",
      ticket_checkout: "",
      attachment: ""
    })
        Swal.fire({ text: "Ticket berhasil ditambahkan", icon: "success" })
      }else{
        
        Swal.fire({ title: "Ticket gagal ditambahkan", text: e.data.error.message, icon: "error" })
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
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="textarea"
                        id="note"
                        name="note"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.note)}
                        placeholder="Please insert your note"
                    />
                    <Label for="note">Note</Label>
                    {errors.note && <Form.Feedback children={errors.note.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="name"
                        name="name"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.name)}
                        placeholder="Please insert your name"
                    />
                    <Label for="name">Name</Label>
                    {errors.name && <Form.Feedback children={errors.name.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="phone"
                        name="phone"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.phone)}
                        placeholder="Please insert your phone"
                    />
                    <Label for="phone">Phone</Label>
                    {errors.phone && <Form.Feedback children={errors.phone.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>

          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="nik"
                        name="nik"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.nik)}
                        placeholder="Please insert your nik"
                    />
                    <Label for="nik">Nik</Label>
                    {errors.nik && <Form.Feedback children={errors.nik.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="date"
                        id="ticket_checkin"
                        name="ticket_checkin"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.ticket_checkin)}
                        placeholder="Please insert your ticket_checkin"
                    />
                    <Label for="ticket_checkin">Ticket Checkin</Label>
                    {errors.ticket_checkin && <Form.Feedback children={errors.ticket_checkin.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="date"
                        id="ticket_checkout"
                        name="ticket_checkout"
                        size="lg"
                        control={control}
                        outvalid={Boolean(errors.ticket_checkout)}
                        placeholder="Please outsert your ticket_checkout"
                    />
                    <Label for="ticket_checkout">Ticket Checkout</Label>
                    {errors.ticket_checkout && <Form.Feedback children={errors.ticket_checkout.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
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