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
      { text: "Master", link: "/master/add" }
    ])
  }, []);


    return (
      <React.Fragment>
        <Head>
          <title>Master</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Add Master</h1>
                        </div>
                        
                          <Login1Form />
                      </Card.Body>
                    </Card>
        </Container>
      </React.Fragment>
    )
}

function Login1Form() {
    const [name, setName] = useState([])
    const [tipe, setTipe] = useState([])

    const [nameValue, setNameValue] = useState([])
    const [tipeValue, setTipeValue] = useState([])
    const [parentValue, setParentValue] = useState([])

  // Define Yup schema for form validation
  const schema = yup.object().shape({

  })

  const { control, handleSubmit, errors,reset } = useForm({
    // Apply Yup as resolver for react-hook-form
    resolver: yupResolver(schema),
    // Define the default values for all input forms
    defaultValues: {
      userID: "",
      username: "",
      email: "",
      phone: "",
      role: "",
      isVerify: 1,
      password: ""
    }
  })

  const onChangeTipe = (e) =>{
        setTipeValue(e.target.value)
    instance.get(`apartement/master/${e.target.value}/all`).then(s =>{
        setName(s.data.data)
      
    })
  }
  const onChangeName = (e) =>{
             setNameValue(e.target.value)
    instance.get(`apartement/child/${e.target.value}`).then(s =>{
        setTipe(s.data.data)
 
    })
  }
  const onChangeParent = (e) =>{
    setParentValue(e.target.value)
  }

  // Handle form submit event
  const onSubmit = data => {
    instance.post('/apartement/master',{
        c_name: nameValue,
        parent_id: parentValue,
        c_type: tipeValue
    }).then(e=>{
      setNameValue("")
      setTipeValue("")
      setParentValue("")
      if(e.data.status){

        Swal.fire({ text: "Master berhasil ditambahkan", icon: "success" })
      }else{
        
        Swal.fire({ title: "Master gagal ditambahkan", icon: "error" })
      }
    })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* BEGIN Form Group */}
      <Row>
          <Col md="6">
                <Form.Group>
                    <Controller
        name="role"
        control={control}
        render={({ field,onChange,value,onBlur,ref }) => 
        <CustomInput innerRef={ref} invalid={Boolean(errors.role)} id="role" onChange={onChangeTipe} onBlur={onBlur}  type="select" size="lg">
                      <option disabled selected>Tipe</option>
                      <option value="apartement">Apartement</option>
                      <option value="blok">Blok</option>
                      <option value="unit">Unit</option>
                    </CustomInput>
        }
      />
      {errors.role && <Form.Feedback children={errors.role.message} />}
                  </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <Controller
        name="role"
        control={control}
        render={({ field,onChange,value,onBlur,ref }) => 
        <CustomInput innerRef={ref}  invalid={Boolean(errors.role)} id="role" onChange={onChangeName} onBlur={onBlur} type="select" size="lg">
            <option disabled selected>Name</option>

                    {
                        name.map(e => {
                            return (
                                <option value={e.id}>{e.c_name}</option>
                            )
                        })
                    }
                      
                    </CustomInput>
        }
      />
      {errors.role && <Form.Feedback children={errors.role.message} />}
                  </Form.Group>
          </Col>
          <Col md="6">
                <Form.Group>
                    <Controller
        name="role"
        control={control}
        render={({ field,onChange,value,onBlur,ref }) => 
        <CustomInput innerRef={ref}  invalid={Boolean(errors.role)} id="role" onChange={onChangeParent} onBlur={onBlur} type="select" size="lg">
            <option disabled selected>Parent_ID</option>

                    {
                        tipe.map(e => {
                            return (
                                <option value={e.id}>{e.c_name}</option>
                            )
                        })
                    }
                      
                    </CustomInput>
        }
      />
      {errors.role && <Form.Feedback children={errors.role.message} />}
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