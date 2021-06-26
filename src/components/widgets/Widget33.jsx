import { Avatar, Portlet, Widget8, Widget10 } from "@panely/components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as SolidIcon from "@fortawesome/free-solid-svg-icons";

class Widget33Component extends React.Component {
  state = {
    data: [
      {
        title: "Owner",
        subtitle: "10",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-info" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faKey}/>
          </Widget8.Avatar>
        )
      },
      {
        title: "Tenant",
        subtitle: "20",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-primary" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faHotel}/>
          </Widget8.Avatar>
        )
      },
      {
        title: "Unit",
        subtitle: "50",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-success" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faSuitcase}/>
          </Widget8.Avatar>
        )
      },
      {
        title: "Visitor",
        subtitle: "100",
        avatar: () => (
          <Widget8.Avatar display circle variant="label-success" className="m-0">
            <FontAwesomeIcon icon={SolidIcon.faUsers}/>
          </Widget8.Avatar>
        )
      }
    ]
  }

  render() {
    return (
      <Portlet>
        <Widget10 vertical="md">
          {this.state.data.map((data, index) => {
            const { title, subtitle, avatar: WidgetAvatar } = data

            return (
              <Widget10.Item key={index}>
                <Widget10.Content>
                  <Widget10.Title className="text-center" children={title} />
                  <Widget10.Title className="text-center" children={subtitle} />
                </Widget10.Content>
                <Widget10.Addon>
                  <WidgetAvatar />
                </Widget10.Addon>
              </Widget10.Item>
            )
          })}
        </Widget10>
      </Portlet>
    )
  }
}

export default Widget33Component
