import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import actions from '../../../redux/actions'
import qs from 'qs';
import Industry from './industry'
import Address from './address'
import Position from './position'
import Paging from './paging'
import '../../../style/App.scss'
const path = 'http://localhost:80'
class School extends React.Component {

  componentDidMount() {
    this.getIndustry();
  }

  getIndustry = () => {
    axios({
      method: 'post',
      url: `${path}/query/industry`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then((response) => {
      this.props.setIndustryInformation(response.data);
      this.getAddress()
    }).catch(function (error) {
      console.log(error);
    });
  }
  getAddress = () => {
    axios({
      method: 'post',
      url: `${path}/query/address`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then((response) => {
      this.props.setAddressInformation(response.data);
      this.props.setSelectedAddress(response.data[1].text)
    }).catch(function (error) {
      console.log(error);
    });
  }
  getPosition = (e) => {
    const job_name = e.target.outerText;
    axios({
      method: 'post',
      url: `${path}/query/position`,
      data: qs.stringify({ job_name }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then((response) => {
      this.props.setPositionInformation(response.data);
      this.props.setSelectedPosition(response.data[1].position)
    }).catch((err) => {
      console.log(err)
    })
  }
  paginate = (e) => {
    let page = {};
    page.pageSize = 10;
    page.pageNum = 1;
    let pagingType;
    if (typeof e === 'number') {
      page.pageNum = e;
    } else {
      pagingType = e.target.getAttribute('data-paging-type');
    }
    switch (pagingType) {
      case 'address':
        page.position = this.props.selectedPosition;
        page.address = e.target.innerText;
        this.props.setSelectedAddress(e.target.innerText)
        break;
      case 'position':
        page.position = e.target.innerText;
        this.props.setSelectedPosition(e.target.innerText)
        page.address = this.props.selectedAddress;
        break;
      default:
        page.position = this.props.selectedPosition;
        page.address = this.props.selectedAddress;
        break;
    }
    axios({
      url: `${path}/public?public=paging`,
      data: qs.stringify(page),
      method: "POST",
      dataType: "JSON",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then((response) => {
      this.props.setPagingInformation(response.data);
    }).catch((err) => {
      console.log(err)
    })
  }
  render() {
    return (
      <div id="school">
        <div onClick={this.getPosition}>
          <Industry ></Industry>
        </div>
        <div >
          <Address paginate={this.paginate}></Address>
          <Position paginate={this.paginate}></Position>
          <Paging paginate={this.paginate}></Paging>
        </div>
        <div></div>
      </div>
    );
  }
}
export default connect((state) => ({
  ...state
}), actions)(School);
