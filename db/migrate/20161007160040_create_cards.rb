class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
    	t.string :title
    	t.string :description
    	t.boolean :completed
    	t.integer :list_id
      t.timestamps
    end
  end
end
