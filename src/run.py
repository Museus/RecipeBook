from flask import Flask, request
from db_conn import DBConnection
from flask_cors import CORS

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
    include_ingr = request.args.includeIngredients
    avoid_ingr = request.args.avoidIngredients


@app.route('/contribute-recipe', methods=['POST'])
def add_drink():
    #Adding a drink here
    print()

@app.route('/ingredients')
def get_ingredients():
    return db_conn.get_ingredients()

if __name__ == '__main__':
    app.run()
