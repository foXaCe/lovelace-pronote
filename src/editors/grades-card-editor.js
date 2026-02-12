import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteGradesCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Entity').replace('{card}', 'grades'), 'entity', this._config.entity, '(grades|notes)')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header)}
            ${this.buildSwitchField(localize('editor.fields.display_date', 'Display date'), 'display_date', this._config.display_date)}
            ${this.buildSwitchField(localize('editor.fields.display_comment', 'Display comment'), 'display_comment', this._config.display_comment)}
            ${this.buildSwitchField(localize('editor.fields.display_class_average', 'Display class average'), 'display_class_average', this._config.display_class_average)}
            ${this.buildSwitchField(localize('editor.fields.compare_with_class_average', 'Compare with class average'), 'compare_with_class_average', this._config.compare_with_class_average)}
            ${this.buildSelectField(localize('editor.fields.grade_format', 'Grade format'), 'grade_format', [{value: 'full', label: localize('editor.labels.full', 'Full')}, {value: 'short', label: localize('editor.labels.short', 'Short')}], this._config.grade_format)}
            ${this.buildSwitchField(localize('editor.fields.display_coefficient', 'Display coefficient'), 'display_coefficient', this._config.display_coefficient)}
            ${this.buildSwitchField(localize('editor.fields.display_class_min', 'Display class min'), 'display_class_min', this._config.display_class_min)}
            ${this.buildSwitchField(localize('editor.fields.display_class_max', 'Display class max'), 'display_class_max', this._config.display_class_max)}
            ${this.buildSwitchField(localize('editor.fields.display_new_grade_notice', 'Display new grade notice'), 'display_new_grade_notice', this._config.display_new_grade_notice)}
            ${this.buildNumberField(localize('editor.fields.max_grades', 'Max grades'), 'max_grades', this._config.max_grades)}
            ${this.buildSwitchField(localize('editor.fields.hide_period_switch', 'Hide period switch'), 'hide_period_switch', this._config.hide_period_switch, false)}
            ${this.buildDefaultPeriodSelectField(localize('editor.fields.default_period', 'Default period'), 'default_period', this._config.default_period)}
        `;
    }
}

customElements.define("pronote-grades-card-editor", PronoteGradesCardEditor);
