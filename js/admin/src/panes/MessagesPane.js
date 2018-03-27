import app from 'flarum/app';
import Component from 'flarum/Component';
import MessageEdit from 'flagrow/saved-messages/components/MessageEdit';
import sortByProp from 'flagrow/saved-messages/utils/sortByProp';

export default class MessagesPane extends Component {
    init() {
        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flagrow/saved-messages',
        }).then(result => {
            app.store.pushPayload(result);

            m.redraw();
        });
    }

    view() {
        const messages = app.store.all('flagrow-saved-message').sort(sortByProp('key'));

        return m('.container', [
            m('table.Flagrow-Saved-Messages', [
                m('thead', m('tr', [
                    m('th', app.translator.trans('flagrow-saved-messages.admin.strings.key')),
                    m('th', app.translator.trans('flagrow-saved-messages.admin.strings.locale')),
                    m('th', app.translator.trans('flagrow-saved-messages.admin.strings.style')),
                    m('th', app.translator.trans('flagrow-saved-messages.admin.strings.content')),
                ])),
                m('tbody', messages.map(message => MessageEdit.component({
                    key: message.id(),
                    message,
                }))),
                m('tbody', MessageEdit.component({
                    key: 'new',
                    message: null,
                })),
            ]),
        ]);
    }
}
