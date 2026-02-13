import { VERSION } from './version'

console.info(
  `%c PRONOTE CARDS %c v${VERSION} `,
  'color: white; background: #4A90D9; font-weight: bold; padding: 2px 4px; border-radius: 4px 0 0 4px;',
  'color: #4A90D9; background: white; font-weight: bold; padding: 2px 4px; border: 1px solid #4A90D9; border-radius: 0 4px 4px 0;'
);

import './cards/timetable-card.js'
import './cards/homework-card.js'
import './cards/grades-card.js'
import './cards/averages-card.js'
import './cards/evaluations-card.js'
import './cards/absences-card.js'
import './cards/delays-card.js'
import './cards/menus-card.js'

import './editors/timetable-card-editor.js'
import './editors/homework-card-editor.js'
import './editors/grades-card-editor.js'
import './editors/evaluations-card-editor.js'
import './editors/delays-card-editor.js'
import './editors/averages-card-editor.js'
import './editors/absences-card-editor.js'
import './editors/menus-card-editor.js'
