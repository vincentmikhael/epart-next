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
import { useRouter } from "next/router"

function FormBasePage(props) {

  const [content, setContent] = useState({})
  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
        props.pageChangeHeaderTitle("Content")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
      { text: "Content", link: "/content" }
    ])


    instance.get('content/detail/'+slug).then(e=>{
        setContent(e.data.data[0])
    })
  }, []);

    return (
      <React.Fragment>
        <Head>
          <title>Content</title>
        </Head>
        <Container fluid>
          <Card>
                      <Card.Body>
                            <h1>{content.title}</h1>
                            <p>{content.content_desc}</p>
                        
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