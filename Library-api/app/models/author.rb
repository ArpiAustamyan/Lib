class Author < ApplicationRecord
  validates_uniqueness_of :email
  has_secure_password
  has_secure_token :token
  has_many :books
  validates :email, presence: true
  validates :password_digest, presence: true
  validates_presence_of :password_confirmation, :if => :password_digest_changed?

  def self.validate_login(email, password)
    author = find_by(email: email)
    if author&.authenticate(password)
      author
    end
  end

  def invalidate_token
    self.update_columns(token: nil)
  end
end
