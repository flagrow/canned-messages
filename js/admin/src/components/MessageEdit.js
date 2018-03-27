import app from 'flarum/app';
import Component from 'flarum/Component';
import Button from 'flarum/components/Button';
import LocaleDropdown from 'flagrow/canned-messages/components/LocaleDropdown';
import Select from 'flarum/components/Select';

export default class MessageEdit extends Component {
    init() {
        this.message = this.props.message;
        this.dirty = false;
        this.processing = false;

        if (this.message === null) {
            this.initNewMessage();
        }
    }

    initNewMessage() {
        this.message = app.store.createRecord('flagrow-canned-message', {
            attributes: {
                key: '',
                locale: null,
                style: null,
                content: '',
            },
        });
    }

    view() {
        const bbtag = app.data.settings['flagrow.canned-messages.bbtag'] || 'CANNED-MESSAGE';

        return m('tr', [
            m('td', [
                m('input.FormControl', {
                    value: this.message.key(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'key')),
                }),
                (this.message.key() ? ['Use as ', m('code', '[' + bbtag + ']' + this.message.key() + '[/' + bbtag + ']')] : null),
            ]),
            m('td', [
                LocaleDropdown.component({
                    value: this.message.locale(),
                    onchange: this.updateAttribute.bind(this, 'locale'),
                }),
            ]),
            m('td', [
                Select.component({
                    value: this.message.style() === null ? 'none' : this.message.style(),
                    onchange: value => {
                        this.updateAttribute('style', value === 'none' ? null : value);
                    },
                    options: {
                        none: 'None',
                        alert: 'Default Alert',
                        'alert-success': 'Success Alert',
                        'alert-error': 'Error Alert',
                    },
                }),
            ]),
            m('td', [
                m('input.FormControl', {
                    value: this.message.content(),
                    oninput: m.withAttr('value', this.updateAttribute.bind(this, 'content')),
                }),
            ]),
            m('td', m('li.ButtonGroup', [
                Button.component({
                    type: 'submit',
                    className: 'Button Button--primary',
                    children: app.translator.trans('flagrow-canned-messages.admin.buttons.' + (this.message.exists ? 'save' : 'add') + '-message'),
                    loading: this.processing,
                    disabled: !this.dirty,
                    onclick: this.saveMessage.bind(this),
                }),
                (this.message.exists ? Button.component({
                    type: 'submit',
                    className: 'Button Button--danger',
                    children: app.translator.trans('flagrow-canned-messages.admin.buttons.delete-message'),
                    loading: this.processing,
                    onclick: this.deleteMessage.bind(this),
                }) : ''),
            ])),
        ]);
    }

    updateAttribute(attribute, value) {
        this.message.pushAttributes({
            [attribute]: value,
        });

        this.dirty = true;
    }

    saveMessage() {
        this.processing = true;

        const wasNew = !this.message.exists;

        this.message.save(this.message.data.attributes).then(() => {
            this.processing = false;
            this.dirty = false;

            if (wasNew) {
                this.initNewMessage();
            }

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }

    deleteMessage() {
        this.processing = true;

        this.message.delete().then(() => {
            this.processing = false;

            m.redraw();
        }).catch(err => {
            this.processing = false;

            throw err;
        });
    }
}
