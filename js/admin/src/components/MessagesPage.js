import app from 'flarum/app';
import Page from 'flarum/components/Page';
import Button from 'flarum/components/Button';
import MessageEdit from 'flagrow/canned-messages/components/MessageEdit';
import sortByProp from 'flagrow/canned-messages/utils/sortByProp';
import Settings from 'flagrow/canned-messages/components/Settings';

export default class MessagesPane extends Page {
    init() {
        super.init();

        app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/flagrow/canned-messages',
        }).then(result => {
            app.store.pushPayload(result);

            m.redraw();
        });
    }

    view() {
        const messages = app.store.all('flagrow-canned-message').sort(sortByProp('key'));

        return m('.container', [
            m('table.Flagrow-Canned-Messages', [
                m('thead', m('tr', [
                    m('th', app.translator.trans('flagrow-canned-messages.admin.strings.key')),
                    m('th', app.translator.trans('flagrow-canned-messages.admin.strings.locale')),
                    m('th', app.translator.trans('flagrow-canned-messages.admin.strings.style')),
                    m('th', app.translator.trans('flagrow-canned-messages.admin.strings.content')),
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
            Button.component({
                className: 'Button',
                icon: 'cog',
                children: app.translator.trans('flagrow-canned-messages.admin.buttons.configure-advanced'),
                onclick() {
                    app.modal.show(new Settings());
                },
            }),
        ]);
    }
}
