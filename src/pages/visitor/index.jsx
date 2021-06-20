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

function FormBasePage(props) {

  const [visitor, setVisitor] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("Visitor")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Visitor", link: "/vui" }
    ])


    instance.get('visitor/list/all/all/1').then(e=>{
      if(e.data.status){
        setVisitor(e.data.data)
      }
    })
  }, []);

const data = visitor;
const columns = [
  {
    name: 'User ID',
    selector: 'userID',
    sortable: true,
  },
  {
    name: 'Visitor Name',
    selector: 'visitor_name',
    sortable: true,
 
  },
  {
    name: 'Visitor Phone',
    selector: 'visitor_phone',
    sortable: true,
  },
  {
    name: 'Visitor As',
    selector: 'visitor_as',
    sortable: true,
  },
  {
    name: 'Visitor Type',
    selector: 'visitor_type',
    sortable: true,
  },
  {
    name: 'Visitor Check In',
    selector: 'visitor_checkin',
    sortable: true,
  },
  {
    name: 'Visitor Check Out',
    selector: 'visitor_checkout',
    sortable: true,
  },
  {
    name: 'Visitor Note',
    selector: 'visitor_note',
    sortable: true,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
  },
];
    return (
      <React.Fragment>
        <Head>
          <title>Visitor | Panely</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Visitor</h1>
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