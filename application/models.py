from index import db, bcrypt


class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))

    def __init__(self, email, username, password):
        self.email = email
        self.active = True
        self.username = username
        self.password = User.hashed_password(password)

    @staticmethod
    def hashed_password(password):
        return bcrypt.generate_password_hash(password)

    @staticmethod
    def get_user_with_email_and_password(email, password):
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        else:
            return None


class Post(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    author = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    title = db.Column(db.String(255), unique=True)
    body = db.Column(db.String(255))

    def __init__(self, title, body):
        self.title = title
        self.active = True
        self.body = body
