import React from 'react'
import { Header, Icon, Image } from 'semantic-ui-react'

const HomepageHeader = (props) => (
  <div>
    <Header as='h2' icon textAlign='center'>
      <Icon name='users' circular />
    <Header.Content style={{ marginLeft: '-1200px', marginTop: '-50px'}} >Welcome {props.name}</Header.Content>
    </Header>
    <Image style={{ marginLeft: '-1200px', marginTop: '-20px'}} 
      
      size='large'
      src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.materialui.co%2FmaterialIcons%2Fsocial%2Fperson_grey_192x192.png&f=1&nofb=1"
    />
  </div>
)

export default HomepageHeader