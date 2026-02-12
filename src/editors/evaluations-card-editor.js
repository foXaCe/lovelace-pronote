import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteEvaluationsCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Evaluations entity').replace('{card}', ''), 'entity', this._config.entity, 'evaluations')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header)}
            ${this.buildSwitchField(localize('editor.fields.display_description', 'Display description'), 'display_description', this._config.display_description)}
            ${this.buildSwitchField(localize('editor.fields.display_teacher', 'Display teacher'), 'display_teacher', this._config.display_teacher)}
            ${this.buildSwitchField(localize('editor.fields.display_date', 'Display date'), 'display_date', this._config.display_date)}
            ${this.buildSwitchField(localize('editor.fields.display_comment', 'Display comment'), 'display_comment', this._config.display_comment)}
            ${this.buildSwitchField(localize('editor.fields.display_coefficient', 'Display coefficient'), 'display_coefficient', this._config.display_coefficient)}
            ${this.buildNumberField(localize('editor.fields.max_evaluations', 'Max evaluations'), 'max_evaluations', this._config.max_evaluations)}
            ${this.buildSwitchField(localize('editor.fields.hide_period_switch', 'Hide period switch'), 'hide_period_switch', this._config.hide_period_switch, false)}
            ${this.buildDefaultPeriodSelectField(localize('editor.fields.default_period', 'Default period'), 'default_period', this._config.default_period)}
        `;
    }
}

customElements.define("pronote-evaluations-card-editor", PronoteEvaluationsCardEditor);
