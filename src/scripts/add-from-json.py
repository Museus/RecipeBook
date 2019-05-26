from pymongo import MongoClient
import json

print("This script is used to load a list of recipes into the database.")
print("This will remove all previous recipes, so only use it to initialize the list.")
filename = raw_input("Input the path to the file you'd like to import.\n>")

client = MongoClient()
recipes = client['RecipeBook'].recipes

with open(filename, 'r') as input_file:
    drinks_list = json.load(input_file)
    for drink in drinks_list:
        print(drink)
        recipes.insert_one(drink);


