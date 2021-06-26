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
import instance from "config/axios-config"
import Swal from "@panely/sweetalert2"
import { useRouter } from "next/router"

function FormBasePage(props) {

    const router = useRouter()
  const { slug } = router.query
  const [ticket, setTicket] = useState({})

  useEffect(() => {
        props.pageChangeHeaderTitle("Ticket")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Ticket", link: "/ticket" }
    ])


    instance.get('ticket/detail/'+slug).then(e=>{
      console.log(e.data.data[0])
      setTicket(e.data.data[0])
    })
  }, []);

  const handleDelete = (e) => {
    instance.delete('banner/'+e).then(e=>{
      Swal.fire({ text: "Banner berhasil dihapus", icon: "success" })
      instance.get('banner').then(e=>{
      setBanner(e.data.data)
    })
    })
  }



    return (
      <React.Fragment>
        <Head>
          <title>Ticket | Panely</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>{ticket.title}</h1>
                        </div>

                        <Row className="mt-4 border-top pt-3">
                            <Col md="6">
                                <p>Created At : {ticket.createdAt}</p>
                                <p>Name : {ticket.name}</p>
                                <p>Nik : {ticket.nik}</p>
                                <p>Note : {ticket.note}</p>
                                <p>Phone : {ticket.phone}</p>
                                <p>Status: {ticket.status}</p>
                            </Col>
                            <Col md="6">
                                <p>Ticket No : {ticket.ticketNo}</p>
                                <p>Ticket Check In : {ticket.checkin}</p>
                                <p>Ticket Check Out : {ticket.checkout}</p>
                                <p>userID : {ticket.userID}</p>
                            </Col>
                        </Row>
                        
                        

         
                      </Card.Body>
                    </Card>
        </Container>
      </React.Fragment>
    )
}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}

export default connect(null, mapDispathToProps)(withLayout(FormBasePage))