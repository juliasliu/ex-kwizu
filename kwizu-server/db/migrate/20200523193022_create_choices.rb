class CreateChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :choices do |t|
      t.string :content
      t.integer :weight

      t.timestamps
    end
  end
end
