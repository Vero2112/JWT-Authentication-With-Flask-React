"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Task
from api.utils import generate_sitemap, APIException

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# @api.route('/')
# def sitemap():
#     return generate_sitemap(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# Handle/serialize errors like a JSON object
@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@api.route('/user', methods=['POST', 'GET'])
def learnmore():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()
    email=body["email"]
    password=body["password"]

# if email is None or len(email)<4:
#     raise APIException("el email tiene que tener un mínimo de 4 carácteres", status_code=404)

# if password is None or len(password)<6:
#     raise APIException("la contraseña tiene que tener un mínimo de 4 carácteres", status_code=404)
   
    # verificar usuario
    aux_user = User.query.filter_by(email=email).first()
    if aux_user:
        raise APIException("el usuario ya existe", status_code=404)

    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify("ok"), 201

@api.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email=body["email"]
    password=body["password"]

    if email is None or len(email) < 4:
        raise APIException("el email tiene que tener un mínimo de 4 carácteres", status_code=404)

    if password is None or len(password) < 2:
        raise APIException("la contraseña tiene que tener un mínimo de 2 carácteres", status_code=404)
   
    user = User.query.filter_by(email=email).first()

    if user is None:
        raise APIException("el usuario no existe", status_code=404)

    if user.password != password:
        raise APIException("Password o email incorrecto", status_code=404)

# me va a codificar el diccionario (todo lo compatible con json), sólo me va almacenar la data (email)
    
    # token
    data = {
        "email": user.email,
        "user_id": user.id
    }
    
#  access_token = create_access_token(identity=username)
#     return jsonify(access_token=access_token) ????

    token = create_access_token(identity=data)
    res = {
        "token": token,
        "user_id": user.id

    }
    return jsonify(res), 201

# Obtener todas las tareas
@api.route('/task', methods=['GET'])
@jwt_required()
def get_task():
    data = get_jwt_identity()     
    user_id = data["user_id"]  
    # user = User.query.get(user_id)

    # tasks = Task.query.all() ARREGLO

    user = User.query.get(user_id)
 
    if user is None:
        raise APIException("el usuario no existe", status_code=404)

    # mapear, como primera entrada una funcion lambda que cada iteración va a ser un task, en este task voy 
    # a llamar a funcion serialize, luego le voy a decir con quien va a iterarse. 
    # Necesito serializar para poder retornar
    tasks = Task.query.filter_by(user_id=user_id)
    all_tasks = list(map(lambda task: task.serialize(), tasks))
    return jsonify(all_tasks), 200
    # return "get task"

# Crear una Tarea
@api.route('/task', methods=['POST'])
@jwt_required()
def create_task():

    body = request.get_json()
# text = body = request.get_json()    
    text = body["text"]

    if text is None or len(text) < 1:
        raise APIException ("El texto tiene que contener más de un caracter", status_code=404)
# Para obtener el identificador necesito llamar a mi funcion jwt_required (identity) que estoy pasando para encriptar
    data = get_jwt_identity()     
    user_id = data["user_id"]        
    task = Task(text=text, done= False, user_id=user_id)   
#     task = Task(text=body["text"], done= False, user_id=body["user_id"])

    db.session.add(task)
    db.session.commit()
    return jsonify(task.serialize()),201
    # return "create task"


