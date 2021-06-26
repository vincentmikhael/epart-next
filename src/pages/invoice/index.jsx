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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as SolidIcon from "@fortawesome/free-solid-svg-icons"

function FormBasePage(props) {

  const [ticket, setTicket] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("Ticket")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Invoice", link: "/invoice" }
    ])


    instance.get('invoice/list/all/all').then(e=>{
      setTicket(e.data.data)
    })
  }, []);

  const handleDelete = (e) => {
    instance.delete('invoice/'+e).then(e=>{
      Swal.fire({ text: "Invoice berhasil dihapus", icon: "success" })
      instance.get('invoice/list/all/all').then(e=>{
      setTicket(e.data.data)
    })
    })
  }

  const data = ticket;
const columns = [
  {
    name: 'Title',
    selector: 'invoice_title',
    sortable: true,
 
  },
  {
      name: 'For',
      selector: 'invoice_for',
      sortable: true
  },
  {
      name: 'Period Start',
      selector: 'invoice_period_start',
      sortable: true
  },
  {
      name: 'Period End',
      selector: 'invoice_period_end',
      sortable: true
  },
  {
      name: 'Total',
      selector: 'invoice_total',
      sortable: true
  },
  {
      name: 'File',
      selector: 'invoice_file',
      sortable: true
  },
  {
      name: 'Status',
      selector: 'status',
      sortable: true
  },
  {
    name: "Action",
    cell: row => <div>
        {/* <Link href={'/ticket/'+row.ticketNo}><button className="btn btn-primary"><FontAwesomeIcon icon={SolidIcon.faEye}/></button></Link> */}
        <Link href={'/invoice/update/'+row.id}><button className="btn btn-success"><FontAwesomeIcon icon={SolidIcon.faEdit}/></button></Link>
        <Link href="/"><button onClick={()=> handleDelete(row.id)} className="btn btn-danger"><FontAwesomeIcon icon={SolidIcon.faTrash}/></button></Link>
        </div>
  }
];


    return (
      <React.Fragment>
        <Head>
          <title>Invoice | Panely</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Invoice</h1>

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