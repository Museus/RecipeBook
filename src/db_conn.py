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
        self.recipes = self.client['RecipeBook'].recipes
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

    def get_drink_by_name(self, drink_info):
        recipes = []
        regex = ".*" + str(drink_info.get('name')) + ".*"
        for recipe in self.recipes.find({"name": {'$regex' : regex}}):
            recipes.append(recipe) 
        print(recipes)
        return json.dumps(recipes, indent=2, default=json_util.default)
        
    def get_drink_suggestion(self, ingr_include, ingr_exclude):
        drink_list = []
        incl_list = []

        # STOP UNDO

        for ingredient in ingr_include:
            incl_list.append({'ingredient': ingredient})

        #incl_json = json.dumps(incl_list, indent=2, default=json_util.default)
        #print(incl_json)

        # Find recipe that matches ingredient
        for recipe in self.recipes.find({"ingredients": {'$elemMatch': { '$or': incl_list}}}):
            drink_list.append(recipe)
#
#            # If the drink has been found before
#            if not drink_dict[recipe['name']] is None:
#                # Increment the count of ingredients
#                drink_dict[recipe['name']].hits += 1
#            else:
#                # Add the recipe to the hash table
#                drink_dict[recipe['name']] = recipe
#
#                # Add a hits field set to 1
#                drink_dict[recipe['name']].hits = 1
#
#
#        sortedByHits = {}
#        for drink, hits in sorted(drink_dict.items(), key=lambda entry: entry['hits']):
#            sortedByHits.add(drink)

        return json.dumps(drink_list, indent=2, default=json_util.default)

    def get_ingredients(self):
        ingredients = self.resources.find_one({"name": "ingredients-list"})['list']
        return json.dumps(ingredients, indent=2, default=json_util.default)

    def modify_drink(self, drink_id, new_info):
        this.recipes.update_one({"drink_id" : drink_id}, new_info)

    def remove_drink(self, drink_id):
        this.recipes.delete_one({"drink_id" : drink_id})
