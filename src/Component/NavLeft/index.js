import React, { Component } from 'react';
import './index.less';
import MenuConfig from '../../Config/MenuConfig';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Logo.jpeg';
const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
  constructor() {
    super();
    this.list = this.list.bind(this);
  }
  componentWillMount() {
    this.setState({
      MenuTree:  this.list(MenuConfig),
    });
  }
  // 递归
  list(data) {
    return data.map((elem) => {
       // 做判断，如果有子路有,如果没有子路由 写html就要return()
      if(elem.children) {
        return (
          <SubMenu
            key={elem.path}
            title={
              <span>
                <span>{elem.title}</span>
              </span>
            }
          >
            {this.list(elem.children)}
          </SubMenu>
        )
      } else {
        return (
            <Menu.Item key={elem.path}>
              <Link to={elem.path}>{elem.title}</Link>
            </Menu.Item>
        )
      }
    });
  }
  render() {
    return (
      <div className='navLeft-wrapper'>
        <div className="logo">
          <Link to='/admin'><img src={ Logo } alt=""/></Link>
        </div>
        <h3 className="title">共享单车后台管理系统</h3>
        <Menu
          theme='dark' // 背景颜色
          mode="vertical" // 子菜单展开模式
        >
          {this.state.MenuTree}
        </Menu>
      </div>
    );
  }
}
export default NavLeft;