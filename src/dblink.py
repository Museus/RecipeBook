from pymongo import MongoClient
import datetime

def __init__():
    print()

def add_drink(drink_name, drink_type, drink_timing, 
              drink_glass, ingredients_list, steps_list,
              username, IBA_info, drink_id):
    post = {
            "name" : drink_name,
            "type" : drink_type,
            "timing" : drink_timing,
            "glass" : drink_glass,
            "ingredients" : ingredients_list,
            "steps" : steps_list,
            "submit_date" : datetime.datetime.now(),
            "submit_user" : username,
            "IBA" : IBA_info,
            "drink_id" : drink_id
            }

    posts = db.posts
    post_id = posts.insert_one(post).inserted_id

def get_drink_by_id(drink_id):
    post = db.posts.find_one({"drink_id" : drink_id})
    return post

def get_drink_by_ingredients(ingredients_list):
    drink_list = []
    for ingredient in ingredients_list:
        for post in db.posts.find({"ingredients":{"name" : ingredient.name }}):
            drink_list.add(post)

    print(drink_list)
    return drink_list
            
def get_drink_by_type(drink_type):
    post = db.posts.find_one({"drink_type" : drink_type})
    return post

def modify_drink(drink_id, new_info):
    db.drinks.update_one({"drink_id" : drink_id}, new_info)
    
def remove_drink(drink_id):
    db.drinks.delete_one({"drink_id" : drink_id})
