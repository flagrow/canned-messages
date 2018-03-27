import app from 'flarum/app';
import Message from 'flagrow/canned-messages/models/Message';
import addMessagesPane from 'flagrow/canned-messages/addMessagesPane';

app.initializers.add('flagrow-canned-messages', app => {
    app.store.models['flagrow-canned-message'] = Message;

    addMessagesPane();
});
