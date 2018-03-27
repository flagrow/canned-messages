import app from 'flarum/app';
import SettingsModal from 'flarum/components/SettingsModal';
import Button from 'flarum/components/Button';

const settingsPrefix = 'flagrow.canned-messages.';
const translationPrefix = 'flagrow-canned-messages.admin.settings.';

export default class Settings extends SettingsModal {
    title() {
        return app.translator.trans(translationPrefix + 'title');
    }

    form() {
        return [
            m('.Form-group', [
                Button.component({
                    className: 'Button',
                    icon: 'map-signs',
                    children: app.translator.trans('flagrow-canned-messages.admin.buttons.configure-messages'),
                    onclick() {
                        m.route(app.route('flagrow-canned-messages'));
                        app.modal.close();
                    },
                }),
            ]),
            m('.Form-group', [
                m('label', app.translator.trans(translationPrefix + 'bbtag')),
                m('input.FormControl', {
                    bidi: this.setting(settingsPrefix + 'bbtag'),
                    placeholder: 'CANNED-MESSAGE',
                }),
                m('.helpText', app.translator.trans('flagrow-canned-messages.admin.settings.bbtag-help')),
            ]),
        ];
    }
}
