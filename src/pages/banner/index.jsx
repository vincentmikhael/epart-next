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

  const [banner, setBanner] = useState([])

  useEffect(() => {
        props.pageChangeHeaderTitle("Banner")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Banner", link: "/banner" }
    ])


    instance.get('banner').then(e=>{
      console.log(e.data.data)
      setBanner(e.data.data)
    })
  }, []);

  const handleDelete = (e) => {
    instance.delete('banner/'+e).then(e=>{
      Swal.fire({ text: "Banner berhasil dihapus", icon: "success" })
      instance.get('banner').then(e=>{
      console.log(e.data.data)
      setBanner(e.data.data)
    })
    })
  }

  const data = banner;
const columns = [
  {
    name: 'Image',
    selector: 'fileName',
    sortable: true,
    cell: row => <div><img className="img-fluid" src={'https://epart.kandaradigital.com/public/banner/'+row.fileName} alt="" /></div>
  },
  {
    name: 'Title',
    selector: 'title',
    sortable: true,
    cell: row => <Link href={"/content/"+row.slug}>{row.title}</Link>,
 
  },
  {
    name: "Action",
    cell: row => <Link href="/"><button onClick={()=> handleDelete(row.id)} className="btn btn-danger">Delete</button></Link>
  }
];


    return (
      <React.Fragment>
        <Head>
          <title>Banner | Panely</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                        <div className="d-flex justify-content-between">
                            <h1>Banner</h1>

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