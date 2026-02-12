import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteAveragesCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Entity').replace('{card}', 'averages'), 'entity', this._config.entity, '(averages|moyennes)')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header)}
            ${this.buildSelectField(localize('editor.fields.average_format', 'Average format'), 'average_format', [{value: 'full', label: localize('editor.labels.full', 'Full')}, {value: 'short', label: localize('editor.labels.short', 'Short')}], this._config.average_format)}
            ${this.buildSwitchField(localize('editor.fields.display_class_average', 'Display class average'), 'display_class_average', this._config.display_class_average)}
            ${this.buildSwitchField(localize('editor.fields.compare_with_class_average', 'Compare with class average'), 'compare_with_class_average', this._config.compare_with_class_average)}
            ${this.buildTextField(localize('editor.fields.compare_with_ratio', 'Compare with ratio'), 'compare_with_ratio', this._config.compare_with_ratio, '')}
            ${this.buildSwitchField(localize('editor.fields.display_class_min', 'Display class min'), 'display_class_min', this._config.display_class_min)}
            ${this.buildSwitchField(localize('editor.fields.display_class_max', 'Display class max'), 'display_class_max', this._config.display_class_max)}
            ${this.buildSwitchField(localize('editor.fields.display_overall_average', 'Display overall average'), 'display_overall_average', this._config.display_overall_average, true)}
            ${this.buildSwitchField(localize('editor.fields.hide_period_switch', 'Hide period switch'), 'hide_period_switch', this._config.hide_period_switch, false)}
            ${this.buildDefaultPeriodSelectField(localize('editor.fields.default_period', 'Default period'), 'default_period', this._config.default_period, 'current', false)}
        `;
    }
}

customElements.define("pronote-averages-card-editor", PronoteAveragesCardEditor);
