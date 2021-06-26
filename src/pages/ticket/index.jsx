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

function FormBasePage(props) {

  const [ticket, setTicket] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("Ticket")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Ticket", link: "/ticket" }
    ])


    instance.get('ticket/list/open').then(e=>{
      console.log(e.data.data)
      setTicket(e.data.data)
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

  const data = ticket;
const columns = [
  {
    name: 'No Ticket',
    selector: 'ticketNo',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
 
  },
  {
      name: 'Ticket Check In',
      selector: 'ticket_checkin',
      sortable: true
  },
  {
      name: 'Ticket Check Out',
      selector: 'ticket_checkout',
      sortable: true
  },
  {
    name: "Action",
    cell: row => <div>
        <Link href={'/ticket/'+row.ticketNo}><button className="btn btn-primary">View</button></Link>
        <Link href={'/ticket/update/'+row.ticketNo}><button className="btn btn-success">Update Status</button></Link>
        <Link href="/"><button onClick={()=> handleDelete(row.id)} className="btn btn-danger">Delete</button></Link>
        </div>
  }
];


    return (
      <React.Fragment>
        <Head>
          <title>Ticket | Panely</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Ticket</h1>

                            <Link href="banner/add"><button className='btn btn-primary'>Add New</button></Link>
                        </div>
                        
                        <DataTable
        columns={columns}
        data={data}
        striped
        highlightOnHover
        responsive

      />
         
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