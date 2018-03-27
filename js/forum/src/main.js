import app from 'flarum/app';
import Message from 'flagrow/canned-messages/models/Message';

app.initializers.add('flagrow-canned-messages', app => {
    app.store.models['flagrow-canned-message'] = Message;
});
