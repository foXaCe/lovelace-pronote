import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteAbsencesCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Entity').replace('{card}', 'absences'), 'entity', this._config.entity, 'absences')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header)}
            ${this.buildNumberField(localize('editor.fields.max_absences', 'Max absences'), 'max_absences', this._config.max_absences)}
            ${this.buildSwitchField(localize('editor.fields.hide_period_switch', 'Hide period switch'), 'hide_period_switch', this._config.hide_period_switch, false)}
            ${this.buildDefaultPeriodSelectField(localize('editor.fields.default_period', 'Default period'), 'default_period', this._config.default_period)}
        `;
    }
}

customElements.define("pronote-absences-card-editor", PronoteAbsencesCardEditor);
