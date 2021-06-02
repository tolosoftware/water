import React, {Component} from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';


class SidenavContent extends Component {
  componentDidMount() {
    const {history} = this.props;
    const that = this;
    const pathname = `${history.location.pathname}`;// get current path

    const menuLi = document.getElementsByClassName('menu');
    for (let i = 0; i < menuLi.length; i++) {
      menuLi[i].onclick = function (event) {

        const parentLiEle = that.closest(this, 'li');
        if(menuLi[i].classList.contains('menu') && parentLiEle !== null) {
          event.stopPropagation();

          if(menuLi[i].classList.contains('open')) {
            menuLi[i].classList.remove('open', 'active');
          } else {
            menuLi[i].classList.add('open', 'active');
          }
        } else {
          for (let j = 0; j < menuLi.length; j++) {
            const parentLi = that.closest(this, 'li');
            if (menuLi[j] !== this && (parentLi === null || !parentLi.classList.contains('open'))) {
              menuLi[j].classList.remove('open');
            } else {
              if(menuLi[j].classList.contains('open')) {
                menuLi[j].classList.remove('open');
              } else {
                menuLi[j].classList.add('open');
              }
            }
          }
        }
      }
    }

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  componentWillReceiveProps(nextProps) {
    const {history} = nextProps;
    const pathname = `${history.location.pathname}`;// get current path

    const activeLi = document.querySelector('a[href="' + pathname + '"]');// select current a element
    try {
      const activeNav = this.closest(activeLi, 'ul'); // select closest ul
      if (activeNav.classList.contains('sub-menu')) {
        this.closest(activeNav, 'li').classList.add('open');
      } else {
        this.closest(activeLi, 'li').classList.add('open');
      }
    } catch (error) {

    }
  }

  closest(el, selector) {
    try {
      let matchesFn;
      // find vendor prefix
      ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(function (fn) {
        if (typeof document.body[fn] === 'function') {
          matchesFn = fn;
          return true;
        }
        return false;
      });

      let parent;

      // traverse parents
      while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
          return parent;
        }
        el = parent;
      }
    } catch (e) {

    }

    return null;
  }

  render() {
    return (
      <CustomScrollbars className=" scrollbar">
        <ul className="nav-menu">

          <li className="nav-header">
            Menus
          </li>
          <li className="menu no-arrow">
            <NavLink to="/app/dashboard/crypto">
              <i className="zmdi zmdi-view-dashboard zmdi-hc-fw"/>
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/app/newproject">
              <i className="zmdi zmdi-chart zmdi-hc-fw"/>
              <span className="nav-text">Sizing</span>
            </NavLink>
          </li>

          <li className="menu no-arrow">
            <NavLink to="/app/activities">
              <i className="zmdi zmdi-file zmdi-hc-fw"/>
              <span className="nav-text">Activities</span>
            </NavLink>
          </li>

         
           

            <li className="menu no-arrow">
            <NavLink to="/app/datasheet">
              <i className="zmdi zmdi-cloud-download zmdi-hc-fw"/>
              <span className="nav-text">Download</span>
            </NavLink>
            </li>


         

          {JSON.parse(localStorage.getItem('UserData')).system == 1 ? (
            <li className="menu no-arrow">
            <NavLink to="/app/systemmangment">
              <i className="zmdi zmdi-widgets zmdi-hc-fw"/>
              <span className="nav-text">System Management</span>
            </NavLink>
          </li>
          ) : ''}

        
{JSON.parse(localStorage.getItem('UserData')).system == 1 || JSON.parse(localStorage.getItem('UserData')).system == 2? (
            <li className="menu no-arrow">
            <NavLink to="/app/usermangment">
              <i className="zmdi zmdi-account-add zmdi-hc-fw"/>
              <span className="nav-text">User Management</span>
            </NavLink>
            </li>
          ) : ''}

   
             <li className="menu no-arrow">
             <NavLink to="/app/setting">
               <i className="zmdi zmdi-wrench zmdi-hc-fw"/>
               <span className="nav-text">Setting</span>
             </NavLink>
           </li>
          
        </ul>
      </CustomScrollbars>
    );
  }
}

export default withRouter(SidenavContent);
