from flask import Flask, request
from db_conn import DBConnection
from flask_cors import CORS
import sys

app = Flask(__name__)
CORS(app)
db_conn =  DBConnection()

@app.route('/')
def index():
    return 'index page here'

@app.route('/drink', methods=['GET'])
def get_drink_by_name():
    return db_conn.get_drink_by_name(request.args)

@app.route('/suggestion', methods=['GET'])
def get_drink_suggestion():
    print("Suggestion")
    ingr_include = request.args.getlist('ingrInclude')
    ingr_exclude = request.args.getlist('ingrExclude')
    return db_conn.get_drink_suggestion(ingr_include, ingr_exclude)

@app.route('/contribute-recipe', methods=['POST'])
def add_drink():
    #Adding a drink here
    print()

@app.route('/ingredients')
def get_ingredients():
    return db_conn.get_ingredients()

if __name__ == '__main__':
    app.run()
