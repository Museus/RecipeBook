from pymongo import MongoClient
from collections import OrderedDict
import datetime
import json
from bson import BSON
from bson import json_util

class DBConnection:

    def __init__(self, address='localhost', port=27017):

        # Initialize connection to specified DB
        self.client = MongoClient(address, port)
        if self.client is None:
            raise Exception("[ERROR] Failed to connect to database server")

        # Get relevant collections
        self.recipes = self.client['RecipeBook'].drink_recipes
        self.counters = self.client['RecipeBook'].counters
        self.resources = self.client['RecipeBook'].resources

    def add_drink(self, drink_info):

        # Make sure there's a drink to add
        if drink_info is None:
            raise Exception("[ERROR] No drink information submitted")
            return

        # Make sure the counter is valid
        drink_id = self.counters.find({"tracker": "drinks"})

        if drink_id is None:
            raise Exception("[ERROR] Could not assign drink_id")
            return

        # Set the drink id and increment the counter
        drink_info['drink_id'] = drink_id
        self.increment_drink_counter()

        # Add to the database
        recipe_id = self.recipes.insert_one(drink_info).inserted_id

    def get_drink(self, drink_info):
        recipes = []
        for recipe in self.recipes.find(drink_info):
            recipes.append(recipe) 
        return json.dumps(recipes, indent=2, default=json_util.default)
        
    def get_drink_recommendation(self, drink_info):
        drink_list = []
        ingredients_list = drink_info['ingredients_list']

        for ingredient in ingredients_list:

            # Find recipe that matches ingredient
            for recipe in self.recipes.find({"ingredients": {"ingredient_name": ingredient['ingredient_name']}}):

                # If the drink has been found before
                if not drink_list[recipe['drink_id']] is None:
                    # Increment the count of ingredients
                    drink_list[recipe['drink_id']].hits += 1
                else:
                    # Add the recipe to the hash table
                    drink_list[recipe['drink_id']] = recipe
                    # Add a hits field set to 1
                    drink_list[recipe['drink_id']].hits = 1

        print(drink_list)
        return drink_list

    def get_ingredients(self):
        ingredients = self.resources.find_one({"name": "ingredients-list"})['list']
        return json.dumps(ingredients, indent=2, default=json_util.default)

    def modify_drink(self, drink_id, new_info):
        this.recipes.update_one({"drink_id" : drink_id}, new_info)

    def remove_drink(self, drink_id):
        this.recipes.delete_one({"drink_id" : drink_id})
