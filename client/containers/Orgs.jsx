import React from 'react'
import {connect} from 'react-redux'

import GMapLocate from './GMapLocate'
import {getOrgsByItem} from '../actions/joinItemToOrgs'

const renderOrgClass = (org, key) => (

  <div className='itemClass-box' key={key}>
    <hr className='itemClass-separator'/>
    <p><a href={org.org_url} target="_blank">{org.org_name}</a></p>
    <img src={`${org.org_img}`}/>
    {renderMap(org)}
    <div className='itemClass-textbox'>
      <p className="itemClass-info">Address: {org.org_address}</p>
      <p className="itemClass-info">{org.org_info}</p>
    </div>
  </div>

)

const renderMap = (org) =>  <GMapLocate address={org.org_address}/>

class OrgClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: props.item || {itemClass_name: '...'},
      donateAble: props.donateAble,
      recycleAble: props.recycleAble
    }
  }
  componentDidMount () {
    window.scrollTo(0, 0)
    this.props.dispatch(getOrgsByItem())
  }

  componentWillReceiveProps ({item, recycleAble, donateAble}) {
    this.setState({
      item,
      donateAble,
      recycleAble
    })
  }
  renderOrgList (orgs) {
    if (orgs != 0) {
      return (
          <div className='isDonate-able-container'>
            <h5>{orgs[0].org_isDonatable ? 'Donate' : 'Recycle'} here:</h5>
            <div className="donate-able">
              {orgs.map((org, key) => renderOrgClass(org, key))}
            </div>
          </div>
      )
    }
  }

render() {
  let {recycleAble, donateAble} = this.state
  let itemClass_name = this.state.item
    ? this.state.item.itemClass_name
    : ''
  return (
    <div className='wallpaper-no-border'>
      <div className='container'>
        <div className="itemClass-list-header">
          <h4>The Following Organisations Will Take Your {itemClass_name}:</h4>
        </div>
        <div className='itemClass-container'>
            {this.renderOrgList(recycleAble)}
            <br/>
            {this.renderOrgList(donateAble)}
          </div>
      </div>
    </div>
  )
}

}

const filterDonate = (orgs, isDonatable) => {
  return orgs.filter(org => org.org_isDonatable == isDonatable)
}

const mapStateToProps = ({joinItemToOrgs}, {match}) => {
  let {itemClass_id} = match.params
  const orgs = joinItemToOrgs.filter(org => org.itemClass_id == itemClass_id)
  const donateAble = filterDonate(orgs, true)
  const recycleAble = filterDonate(orgs, false)
  const item = joinItemToOrgs.find(item => item.itemClass_id == itemClass_id)
  return {joinItemToOrgs: orgs, item, donateAble, recycleAble}
}

export default connect(mapStateToProps)(OrgClass)
