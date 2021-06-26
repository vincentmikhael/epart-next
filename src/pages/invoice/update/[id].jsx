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
import { useRouter } from "next/router"

function FormBasePage(props) {

  const [visitor, setVisitor] = useState([])

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
                            <h2 className="mb-3">Update Invoice</h2>
                        </div>
                        
                          <Login1Form />
                      </Card.Body>
                    </Card>
        </Container>
      </React.Fragment>
    )
}

function Login1Form() {
  const router = useRouter()
  const { id } = router.query
  // Define Yup schema for form validation
  const schema = yup.object().shape({
    status: yup
      .string()
      .required("Harus Diisi"),
  })

  const { control, handleSubmit, errors,reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      status: ""
    }
  })

  // Handle form submit event
  const onSubmit = data => {
    let a = {
      status: data.status,
      id: id
    }
    instance.put('invoice',a).then(e=>{
      if(e.data.status){
        reset({
      status: ""
    })
        Swal.fire({ text: "Invoice berhasil di update", icon: "success" })
      }else{
        Swal.fire({ title: "Invoice gagal di update", text: e.data.message, icon: "error" })
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
                        id="status"
                        name="status"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.status)}
                        placeholder="Please insert your status"
                    />
                    <Label for="status">status</Label>
                    {errors.status && <Form.Feedback children={errors.status.message} />}
                    </FloatLabel>
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