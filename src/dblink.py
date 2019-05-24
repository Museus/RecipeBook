from pymongo import MongoClient
from collections import OrderedDict
import datetime

class DBLink:

    def __init__(self, address='localhost', port=27017):

        # Initialize connection to specified DB
        self.client = MongoClient(address, port)
        if self.client is None:
            raise Exception("Failed to connect to database server")

        # Get recipes collection
        self.recipes = self.client['RecipeBook'].drink_recipes
        self.counters = self.client['RecipeBook'].counters


    def add_drink(self, drink_name, drink_type, drink_timing, 
                  drink_glass, ingredients_list, steps_list,
                  username, IBA_info, drink_id):
        recipe = OrderedDict([
                ("name", drink_name),
                ("type", drink_type),
                ("timing", drink_timing),
                ("glass", drink_glass),
                ("ingredients", ingredients_list),
                ("steps", steps_list),
                ("submit_date", str(datetime.datetime.now().today())),
                ("submit_user", username),
                ("IBA", IBA_info),
                ("drink_id", drink_id),
                ])

        recipe_id = self.recipes.insert_one(recipe).inserted_id
        return recipe

    def get_drink_by_id(self, drink_id):
        post = db.posts.find_one({"drink_id" : drink_id})
        return post

    def get_drink_by_ingredients(self, ingredients_list):
        drink_list = []
        for ingredient in ingredients_list:
            for post in db.posts.find({"ingredients":{"name" : ingredient.name }}):
                drink_list.add(post)

        print(drink_list)
        return drink_list
                
    def get_drink_by_type(self, drink_type):
        post = db.posts.find_one({"drink_type" : drink_type})
        return post

    def modify_drink(self, drink_id, new_info):
        db.drinks.update_one({"drink_id" : drink_id}, new_info)
        
    def remove_drink(self, drink_id):
        db.drinks.delete_one({"drink_id" : drink_id})
