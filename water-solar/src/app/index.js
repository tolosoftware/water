import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from 'components/Header/index';
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Dashboard from './routes/dashboard';
import ExtraPages from './routes/extraPages';
//custom component
import Setting from './routes/setting';
import Systemmangment from './routes/systemmangment';
import Knowledgebase from './routes/knowledgebase';
import Activities from './routes/activities';
import Newproject from './routes/newproject';
import Usermangment from './routes/usermangment';
import Datasheet from './routes/datasheet';
//end custom component
import {
  ABOVE_THE_HEADER,
  BELOW_THE_HEADER,
  COLLAPSED_DRAWER,
  FIXED_DRAWER,
  HORIZONTAL_NAVIGATION,
} from 'constants/ActionTypes';
import {isIOS, isMobile} from 'react-device-detect';
import asyncComponent from '../util/asyncComponent';
import TopNav from 'components/TopNav';


class App extends React.Component {
  
  render() {
    if(localStorage.getItem('token') == null) {
        this.props.history.push('/signin');
    }

    const {match, drawerType, navigationStyle, horizontalNavPosition} = this.props;
    const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'fixed-drawer' : drawerType.includes(COLLAPSED_DRAWER) ? 'collapsible-drawer' : 'mini-drawer';

    //set default height and overflow for iOS mobile Safari 10+ support.
    if (isIOS && isMobile) {
      document.body.classList.add('ios-mobile-view-height')
    }
    else if (document.body.classList.contains('ios-mobile-view-height')) {
      document.body.classList.remove('ios-mobile-view-height')
    }
    return (
      <div className={`app-container ${drawerStyle}`}>
        <Sidebar/>
        <div className="app-main-container">
          <div
            className={`app-header ${navigationStyle === HORIZONTAL_NAVIGATION ? 'app-header-horizontal' : ''}`}>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === ABOVE_THE_HEADER) &&
            <TopNav styleName="app-top-header"/>}
            <Header/>
            {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) &&
            <TopNav/>}
          </div>

          <main className="app-main-content-wrapper">
            <div className="app-main-content">
              <Switch>

                {/* custom route */}
                <Route path={`${match.url}/setting`} component={Setting} />
                <Route path={`${match.url}/systemmangment`} component={Systemmangment} />
                <Route path={`${match.url}/project-summary/:id`} component={Knowledgebase} />
                <Route path={`${match.url}/activities`} component={Activities} />
                <Route path={`${match.url}/newproject`} component={Newproject} />
                <Route path={`${match.url}/usermangment`} component={Usermangment} />
                <Route path={`${match.url}/datasheet`} component={Datasheet} />
                {/* end custom route component  */}
                <Route path={`${match.url}/dashboard`} component={Dashboard}/>
                <Route path={`${match.url}/extra-pages`} component={ExtraPages}/>
                <Route component={asyncComponent(() => import('app/routes/extraPages/routes/404'))}/>
              </Switch>
            </div>
            <Footer/>
          </main>
        </div>
        {/* <ColorOption/> */}
      </div>
    );
  }
}


const mapStateToProps = ({settings}) => {
  const {drawerType, navigationStyle, horizontalNavPosition} = settings;
  return {drawerType, navigationStyle, horizontalNavPosition}
};
export default withRouter(connect(mapStateToProps)(App));