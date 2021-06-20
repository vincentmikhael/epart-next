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

  const [content, setContent] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("Content")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Content", link: "/content" }
    ])


    instance.get('content').then(e=>{
        console.log(e)
      if(e.data.status){
        setContent(e.data.data)
      }
    })
  }, []);

const data = content;
const columns = [
  {
    name: 'Content ID',
    selector: 'contentID',
    sortable: true,
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    cell: row => <Link href={"/content/"+row.slug}>{row.title}</Link>,
 
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
                            <h1>Content</h1>
                            <Link href="/content/create">
                                <button className="btn btn-primary">Add New</button>
                            </Link>
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