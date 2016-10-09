class CreateActivities < ActiveRecord::Migration[5.0]
  def change
    create_table :activities do |t|
    	t.string :text
    	t.integer :card_id
      t.timestamps
    end
  end
end
