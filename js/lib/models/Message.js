import Model from 'flarum/Model';
import mixin from 'flarum/utils/mixin';

export default class Message extends mixin(Model, {
    key: Model.attribute('key'),
    locale: Model.attribute('locale'),
    style: Model.attribute('style'),
    content: Model.attribute('content'),
}) {
    /**
     * @inheritDoc
     */
    apiEndpoint() {
        return '/flagrow/canned-messages' + (this.exists ? '/' + this.data.id : '');
    }
}
