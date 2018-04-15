from flask import request, render_template, jsonify, url_for, redirect, g
from .models import User, Post
from index import app, db
from sqlalchemy.exc import IntegrityError
from .utils.auth import generate_token, requires_auth, verify_token


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/<path:path>', methods=['GET'])
def any_root_path(path):
    return render_template('index.html')


@app.route("/api/user", methods=["GET"])
@requires_auth
def get_user():
    return jsonify(result=g.current_user)


@app.route("/api/post", methods=["GET"])
def get_post():
    post = Post.query.all()
    return jsonify([
        {
            'id': p.id,
            'title': p.title,
            'body': p.body,
            'author': {
                'username': User.query.get(p.author).username,
                'email': User.query.get(p.author).email
            }
        } for p in post
    ])


@app.route("/api/post", methods=["POST"])
def create_post():
    incoming = request.get_json()

    user = g.current_user
    new_post = Post(
        title=incoming['title'],
        body=incoming['email'],
        author_id=user.id
    )

    db.session.add(new_post)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="Something went wrong trying to make a post, whoops."), 409


@app.route("/api/create_user", methods=["POST"])
def create_user():
    incoming = request.get_json()
    user = User(
        email=incoming["email"],
        username=incoming["username"],
        password=incoming["password"]
    )
    db.session.add(user)

    try:
        db.session.commit()
    except IntegrityError:
        return jsonify(message="User with that email already exists"), 409

    new_user = User.query.filter_by(email=incoming["email"]).first()

    return jsonify(
        id=user.id,
        token=generate_token(new_user)
    )


@app.route("/api/get_token", methods=["POST"])
def get_token():
    incoming = request.get_json()
    user = User.get_user_with_email_and_password(incoming["email"], incoming["password"])
    if user:
        return jsonify(token=generate_token(user))

    return jsonify(error=True), 403


@app.route("/api/is_token_valid", methods=["POST"])
def is_token_valid():
    incoming = request.get_json()
    is_valid = verify_token(incoming["token"])

    if is_valid:
        return jsonify(token_is_valid=True)
    else:
        return jsonify(token_is_valid=False), 403
