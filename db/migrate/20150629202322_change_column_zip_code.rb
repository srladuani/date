class ChangeColumnZipCode < ActiveRecord::Migration
  def change
    rename_column :locations, :zipcode, :zip_code
  end
end
