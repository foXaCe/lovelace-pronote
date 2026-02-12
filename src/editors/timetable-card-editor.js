import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteTimetableCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Entity').replace('{card}', 'timetable'), 'entity', this._config.entity, '(timetable|emploi_du_temps)')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header, true)}
            ${this.buildSwitchField(localize('editor.fields.current_week_only', 'Current week only'), 'current_week_only', this._config.current_week_only, false)}
            ${this.buildNumberField(localize('editor.fields.max_days', 'Max days'), 'max_days', this._config.max_days, null, 1)}
            ${this.buildSwitchField(localize('editor.fields.display_classroom', 'Display classroom'), 'display_classroom', this._config.display_classroom, true)}
            ${this.buildSwitchField(localize('editor.fields.display_teacher', 'Display teacher'), 'display_teacher', this._config.display_teacher, true)}
            ${this.buildSwitchField(localize('editor.fields.display_day_hours', 'Display day hours'), 'display_day_hours', this._config.display_day_hours, true)}
            ${this.buildSwitchField(localize('editor.fields.display_lunch_break', 'Display lunch break'), 'display_lunch_break', this._config.display_lunch_break, true)}
            ${this.buildSwitchField(localize('editor.fields.dim_ended_lessons', 'Dim ended lessons'), 'dim_ended_lessons', this._config.dim_ended_lessons, true)}
            ${this.buildSwitchField(localize('editor.fields.enable_slider', 'Enable slider'), 'enable_slider', this._config.enable_slider, false)}
            ${this.buildSwitchField(localize('editor.fields.switch_to_next_day', 'Switch to next day'), 'switch_to_next_day', this._config.switch_to_next_day, false)}
            ${this.buildSwitchField(localize('editor.fields.display_free_time_slots', 'Display free time slots'), 'display_free_time_slots', this._config.display_free_time_slots, true)}
        `;
    }
}

customElements.define("pronote-timetable-card-editor", PronoteTimetableCardEditor);
