import schema from 'schema';

schema.add('extensions');

schema.add('mailboxes');

schema.add('dialplans');

schema.addVerb('ping', 'GET', {
	url: "ping"
});