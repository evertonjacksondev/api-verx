import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('name')
        .notNullable()
      table.text('document')
        .notNullable()
        .unique()
      table.enu('document_type', ['PJ', 'PF'])
        .notNullable()
      table.text('city')
        .notNullable
      table.text('uf')
        .notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
