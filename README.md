## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|email|string|null: false, foreign_key: true|add_column :users, :email, :string|add_index :users, :email, unique: true
|password|integer|null: false, foreign_key: true|
|username|string|null: false, foreign_key: true|
    
### Association
- has_many :chats
- has_many :members

# chatsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|text|string|null: false, foreign_key: true|
|user_id|string|null: false, foreign_key: true|
    
### Association
- has_many :groups
- belongs_to :users

# groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, foreign_key: true|
|text|string|null: false, foreign_key: true|
|chat_id|string|null: false, foreign_key: true|
    
### Association
- has_many :members
- belongs_to :chats

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user