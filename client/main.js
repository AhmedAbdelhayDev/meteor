import { Meteor } from 'meteor/meteor';
import clientRender from '/imports/ui/index';

Meteor.startup(() => {
  clientRender()
});
