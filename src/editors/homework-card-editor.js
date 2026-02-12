import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteHomeworkCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Entity').replace('{card}', 'homework'), 'entity', this._config.entity, '(homework|devoirs)')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header)}
            ${this.buildSwitchField(localize('editor.fields.current_week_only', 'Current week only'), 'current_week_only', this._config.current_week_only)}
            ${this.buildSwitchField(localize('editor.fields.reduce_done_homework', 'Reduce done homework'), 'reduce_done_homework', this._config.reduce_done_homework)}
            ${this.buildSwitchField(localize('editor.fields.display_done_homework', 'Display done homework'), 'display_done_homework', this._config.display_done_homework)}
            ${this.buildSwitchField(localize('editor.fields.enable_slider', 'Enable slider'), 'enable_slider', this._config.enable_slider, false)}
        `;
    }
}

customElements.define("pronote-homework-card-editor", PronoteHomeworkCardEditor);
