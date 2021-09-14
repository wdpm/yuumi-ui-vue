import type { App } from 'vue'
import Table from './src/index'
import TableColumn from './src/column'

export default {
  install: (app: App): void => {
    app.component(Table.name, Table)
    app.component(TableColumn.name, TableColumn)
  }
}

export const YuumiTable = Table
export const YuumiTableColumn = TableColumn
