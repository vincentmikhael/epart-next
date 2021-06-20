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
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Register User</h1>
                        </div>
                        
                          <Login1Form />
                      </Card.Body>
                    </Card>
        </Container>
      </React.Fragment>
    )
}

function Login1Form() {
  // Define Yup schema for form validation
  const schema = yup.object().shape({
    username: yup
      .string()
      .required("Harus Diisi"),
    phone: yup
      .string()
      .required("Harus Diisi"),
    password: yup
      .string()
      .required("Harus Diisi"),
    role: yup
      .string()
      .required("Harus Diisi"),
    apartement: yup
      .string()
      .required("Harus Diisi"),
    blok: yup
      .string()
      .required("Harus Diisi"),
    unit: yup
      .string()
      .required("Harus Diisi"),
  })

  const { control, handleSubmit, errors,reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      password: "",
      username: "",
      phone: "",
      role: "",
      apartement: "",
      blok: "",
      unit: ""
    }
  })

  // Handle form submit event
  const onSubmit = data => {
    instance.post('/users/register',data).then(e=>{
      if(e.data.status){
        reset({
      password: "",
      username: "",
      phone: "",
      role: "",
      apartement: "",
      blok: "",
      unit: ""
    })
        Swal.fire({ text: "User berhasil registrasi", icon: "success" })
      }else{
        Swal.fire({ title: "User gagal registrasi", text: e.data.message, icon: "error" })
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
                        id="password"
                        name="password"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.password)}
                        placeholder="Please insert your password"
                    />
                    <Label for="password">Password</Label>
                    {errors.password && <Form.Feedback children={errors.password.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <FloatLabel size="lg">
                    <Controller
                        as={Input}
                        type="text"
                        id="username"
                        name="username"
                        size="lg"
                        control={control}
                        invalid={Boolean(errors.username)}
                        placeholder="Please insert your username"
                    />
                    <Label for="username">Username</Label>
                    {errors.username && <Form.Feedback children={errors.username.message} />}
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
                    <Label for="phone">No.Telpon</Label>
                    {errors.phone && <Form.Feedback children={errors.phone.message} />}
                    </FloatLabel>
                </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <Controller
                        name="role"
                        control={control}
                        render={({ field,onChange,value,onBlur,ref }) => 
                        <CustomInput innerRef={ref} invalid={Boolean(errors.role)} id="role" onChange={onChange} onBlur={onBlur} type="select" size="lg">
                        <option disabled selected>Role</option>
                        <option value="admin">Admin</option>
                        </CustomInput>
                        }
                    />
                     {errors.role && <Form.Feedback children={errors.role.message} />}
                  </Form.Group>
          </Col>

          <Col md="6">
                <Form.Group>
                    <Controller
                        name="apartement"
                        control={control}
                        render={({ field,onChange,value,onBlur,ref }) => 
                        <CustomInput innerRef={ref} invalid={Boolean(errors.apartement)} id="apartement" onChange={onChange} onBlur={onBlur} type="select" size="lg">
                        <option disabled selected>Apartement</option>
                        <option value="apartement B">Apartement B</option>
                        </CustomInput>
                        }
                    />
                     {errors.apartement && <Form.Feedback children={errors.apartement.message} />}
                  </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <Controller
                        name="blok"
                        control={control}
                        render={({ field,onChange,value,onBlur,ref }) => 
                        <CustomInput innerRef={ref} invalid={Boolean(errors.blok)} id="blok" onChange={onChange} onBlur={onBlur} type="select" size="lg">
                        <option disabled selected>Blok</option>
                        <option value="blok B">Blok B</option>
                        </CustomInput>
                        }
                    />
                     {errors.blok && <Form.Feedback children={errors.blok.message} />}
                  </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <Controller
                        name="unit"
                        control={control}
                        render={({ field,onChange,value,onBlur,ref }) => 
                        <CustomInput innerRef={ref} invalid={Boolean(errors.unit)} id="unit" onChange={onChange} onBlur={onBlur} type="select" size="lg">
                        <option disabled selected>Unit</option>
                        <option value="1">1</option>
                        </CustomInput>
                        }
                    />
                     {errors.unit && <Form.Feedback children={errors.unit.message} />}
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