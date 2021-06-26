import { Row, Col, Container } from "@panely/components"
import { pageChangeHeaderTitle, breadcrumbChange } from "store/actions"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import withLayout from "components/layout/withLayout"
import withAuth from "components/firebase/firebaseWithAuth"
import Widget3 from "components/widgets/Widget3"
import Widget7 from "components/widgets/Widget7"
import Widget10 from "components/widgets/Widget10"
import Widget13 from "components/widgets/Widget13"
import Widget14 from "components/widgets/Widget14"
import Widget15 from "components/widgets/Widget15"
import Widget16 from "components/widgets/Widget16"
import Widget18 from "components/widgets/Widget18"
import Widget21 from "components/widgets/Widget21"
import Widget22 from "components/widgets/Widget22"
import Widget27 from "components/widgets/Widget27"
import Widget28 from "components/widgets/Widget28"
import Widget29 from "components/widgets/Widget29"
import Widget33 from "components/widgets/Widget33"
import Widget34 from "components/widgets/Widget34"
import Widget35 from "components/widgets/Widget35"
import Head from "next/head"
import { useEffect } from "react"
import Portlet from "@panely/components/Portlet"
import ListGroup from "@panely/components/ListGroup"
import { Badge } from "@panely/components"
import Chart from "@panely/apexcharts"
import { Card } from "@panely/components"

function DashboardPage(props) {
  useEffect(() => {
    // Set header title
    props.pageChangeHeaderTitle("Dashboard")
    // Set breadcrumb data
    props.breadcrumbChange([
      { text: "Dashboard", link: "/" },
    ])
  }, [])
    return (
      <React.Fragment>
        <Head>
          <title>Dashboard | Panely</title>
        </Head>
        <Container fluid>
          <Row>
            <Col xs="12">
              <Widget33 />
            </Col>
          </Row>
          <Row>
            <Col xl="4">
              <Row portletFill="md" className="h-100">
                <Col md="6" xl="12">
                  <Portlet>
                      <Portlet.Header bordered>
                        <Portlet.Title className="h1">Ticket</Portlet.Title>
                      </Portlet.Header>

                      <Portlet.Body>

                        <Row className="h2">
                          <Col md="6">
                            <ListGroup bordered>
                              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                Open
                                <Badge pill variant="primary">
                                  14
                                </Badge>
                              </ListGroup.Item>
                              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                Progress
                                <Badge pill variant="primary">
                                  2
                                </Badge>
                              </ListGroup.Item>
                              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                Closed
                                <Badge pill variant="primary">
                                  1
                                </Badge>
                              </ListGroup.Item>
                           </ListGroup>
                          </Col>

                          <Col md="6" className="">
                            <Card className="">
                              <Card.Title className="border p-2 text-center">Total</Card.Title>
                              <Card.Body className="text-center display-4">5</Card.Body>
                            </Card>
  
                          </Col>
                        </Row>
                        


                      </Portlet.Body>
                  </Portlet>
                </Col>
                <Col md="6" xl="12">

                  <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Visitor/Day</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Chart5 theme={props.theme} />
                </Portlet.Body>
              </Portlet>
              
                </Col>
              </Row>
            </Col>
            <Col xl="4">
              <Row portletFill="md" className="h-100">
                <Col md="6" xl="12">
                  <Portlet>
                <Portlet.Header bordered>
                  <Portlet.Title>Parcel/Day</Portlet.Title>
                </Portlet.Header>
                <Portlet.Body>
                  <Chart5 theme={props.theme} />
                </Portlet.Body>
              </Portlet>
                </Col>
                <Col md="6" xl="12">
                  <Portlet>
                      <Portlet.Header bordered>
                        <Portlet.Title className="h1">Invoice</Portlet.Title>
                      </Portlet.Header>

                      <Portlet.Body>

                        <Row className="h2">
                          <Col md="6">
                            <ListGroup bordered>
                              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                Paid
                                <Badge pill variant="primary">
                                  14
                                </Badge>
                              </ListGroup.Item>
                              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                Unpaid
                                <Badge pill variant="primary">
                                  2
                                </Badge>
                              </ListGroup.Item>
                           </ListGroup>
                          </Col>

                          <Col md="6" className="">
                            <Card className="">
                              <Card.Title className="border p-2 text-center">Total</Card.Title>
                              <Card.Body className="text-center display-4">5</Card.Body>
                            </Card>
  
                          </Col>
                        </Row>
                        


                      </Portlet.Body>
                  </Portlet>
                </Col>
              </Row>
            </Col>

          </Row>

          <Row>
            <Col md="6">
              <Card>
                <Card.Body>
                  <h3 className="text-center">SOS Dress</h3>
                  <hr />
                  <h3 className="text-center">1000</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md="6">
              <Card>
                <Card.Body>
                  <h3 className="text-center">SOS Dress</h3>
                  <hr />
                  <h3 className="text-center">1000</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )

}

function mapDispathToProps(dispatch) {
  return bindActionCreators({ pageChangeHeaderTitle, breadcrumbChange }, dispatch)
}
class Chart5 extends React.Component {
  state = {
    // Chart options
    options: {
      theme: {
        mode: this.props.theme,
        palette: "palette1"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Traffic Sources"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001"
      ],
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Website Blog"
          }
        },
        {
          opposite: true,
          title: {
            text: "Social Media"
          }
        }
      ]
    },
    // Chart series data
    series: [
      {
        name: "Website Blog",
        type: "column",
        data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
      },
      {
        name: "Social Media",
        type: "line",
        data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
      }
    ]
  }

  componentDidUpdate(prevProps) {
    if (prevProps.theme !== this.props.theme) {
      let newState = this.state

      // Change chart options
      newState.options.theme = {
        mode: this.props.theme,
        palette: "palette1"
      }

      this.setState(newState)
    }
  }

  render() {
    const { options, series } = this.state

    return <Chart type="line" options={options} series={series} height={350} />
  }
}
export default connect(null, mapDispathToProps)(withLayout(DashboardPage))
