import { Meteor } from 'meteor/meteor';
import clientRender from '/imports/ui/index';

Meteor.startup(() => {

  global.Buffer = function() {};
  global.Buffer.isBuffer = () => false;
  
  clientRender()
});


