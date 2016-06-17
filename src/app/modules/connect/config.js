import schema from 'schema';

schema.add('login');

schema.add('connect', { isSingle: true });
schema.connect.add('pin');