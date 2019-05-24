from flask import Flask, request
from db_conn import DBConnection

app = Flask(__name__)
db_conn =  DBConnection()

@app.route('/')
def index():
    return 'index page here'

@app.route('/drink', methods=['GET'])
def get_drink_adaptive():

    return db_conn.get_drink(request.args)

@app.route('/contribute-recipe', methods=['POST'])
def add_drink():
    #Adding a drink here
    print()

@app.route('/ingredients')
def get_ingredients():
    return db_conn.get_ingredients()

if __name__ == '__main__':
    app.run()
