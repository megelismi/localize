import React from 'react'; 
import sinon from 'sinon';
import chai, { expect, should } from 'chai';
import chaiEnzyme from 'chai-enzyme'; 
import { mount, shallow, render } from 'enzyme';

const willMount = sinon.spy();
const didMount = sinon.spy();
const willUnmount = sinon.spy();

chai.use(chaiEnzyme());

if (!global.document) {
  try {
    const jsdom = require('jsdom').jsdom; // could throw

    global.document = jsdom('');
    global.window = document.defaultView;
    Object.keys(document.defaultView).forEach((property) => {
      if (typeof global[property] === 'undefined') {
        global[property] = document.defaultView[property];
      }
    });

    global.navigator = {
      userAgent: 'node.js',
    };
  } catch (e) {
    // jsdom is not supported...
    if (e.message === "Cannot find module 'jsdom'") {
      console.error('[enzyme/withDom] Error: missing required module "jsdom"');
      console.error('[enzyme/withDom] To fix this you must run:');
      console.error('[enzyme/withDom]   npm install jsdom --save-dev');
    } else {
      console.error(`[enzyme withDom] ${e.stack || e.message}`);
    }
  }
}

import LandingPage from '../../client/js/components/pages/landing_page';
// import Login from '../../client/js/components/landing_page/login.js';
// import Welcome from '../../client/js/components/landing_page/welcome.js';
// import Dropdown from '../../client/js/components/game_page/dropdown.js';
// import Feedback from '../../client/js/components/game_page/feedback.js';
// import GameContainer from '../../client/js/components/game_page/game_container.js';
// import Header from '../../client/js/components/game_page/header.js';

// LANDING PAGE

describe('Landing Page', () => {
  const landingPage = shallow(<LandingPage />);
  it('Should render a div with class landing_page', () => {
    landingPage.hasClass('landing_container').should.equal(true);
  });
});

