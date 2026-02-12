import { html } from "../lit-helpers.js";
import BasePronoteCardEditor from "./base-editor";
import { createLocalizeFunction } from "../localize.js";

class PronoteMenusCardEditor extends BasePronoteCardEditor {
    render() {
        if (!this.hass || !this._config) {
            return html``;
        }

        const localize = createLocalizeFunction(this.hass);

        return html`
            ${this.buildEntityPickerField(localize('editor.fields.entity', 'Entity').replace('{card}', 'menus'), 'entity', this._config.entity, 'menus')}
            ${this.buildSwitchField(localize('editor.fields.display_header', 'Display header'), 'display_header', this._config.display_header, true)}
            ${this.buildSwitchField(localize('editor.fields.display_menu_name', 'Display menu name'), 'display_menu_name', this._config.display_menu_name, true)}
            ${this.buildSwitchField(localize('editor.fields.display_labels', 'Display labels'), 'display_labels', this._config.display_labels, true)}
            ${this.buildSwitchField(localize('editor.fields.current_week_only', 'Current week only'), 'current_week_only', this._config.current_week_only, false)}
            ${this.buildNumberField(localize('editor.fields.max_days', 'Max days'), 'max_days', this._config.max_days, null, 1)}
            ${this.buildSwitchField(localize('editor.fields.switch_to_next_day', 'Switch to next day'), 'switch_to_next_day', this._config.switch_to_next_day, false)}
        `;
    }
}

customElements.define("pronote-menus-card-editor", PronoteMenusCardEditor);
