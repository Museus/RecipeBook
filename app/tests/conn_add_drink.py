import sys
import json
from pymongo import MongoClient
from collections import OrderedDict
from random import randint

sys.path.insert(0, "/home/jredding/devel/RecipeBook/src")

from db_conn import DBConnection

db_conn = DBConnection()

def yes_no(question, default="yes"):

    valid = {"yes" : True, "y" : True, "ye": True, "no": False, "n": False}

    if default is None:
        prompt = " [y/n] "
    elif default == "yes":
        prompt = " [Y/n] "
    elif default == "no":
        prompt = " [y/N] "
    else:
        raise ValueError("Invalid default answer: '%s'" % default)
    
    while True:
        print(question + prompt)
        choice = raw_input().lower()
        if default is not None and choice == '':
            return valid[default]
        elif choice in valid:
            return valid[choice]
        else:
            print("Please respond with 'yes', 'y', 'no', or 'n'. \n")
        

while yes_no("Would you like to enter a drink?") is True:
    drink_name = raw_input("What is the name of the drink? ")
    drink_type = raw_input("What is the type of the drink? Shot? Cocktail? ")
    drink_timing = raw_input("What is the timing of the drink? ")
    drink_glass = raw_input("What glass should the drink be served in? ")

    ingredients_list = []
    i = 0

    while True:
        i += 1
        ingredient_name = raw_input("What is the name of ingredient " + str(i) + " ? ")
        ingredient_amount = raw_input("The amount? ")
        ingredient_unit = raw_input("The unit? ")

        ingredients_list.append({
            {"ingredient_name": ingredient_name},
            {"ingredient_amount": ingredient_amount},
            {"ingredient_unit": ingredient_unit}
            })

        print("Added ingredient.")
        if yes_no("Add another ingredient?") is False:
            break

    steps_list = []
    i = 0

    while True:
        i += 1
        step = raw_input("What is step " + str(i) + " ? ")
        steps_list.append(step)
        if yes_no("Add another step?") is False:
            break

    submit_user = raw_input("What is your username? ")
    
    IBA_info = {}

    if yes_no("Is this an IBA recipe? "):
        iba_category = raw_input("Which category? ")
        iba_link = raw_input("What's the link? ")

    IBA_info = {"category": iba_category, "link": iba_link}
        

    drink_id = randint(0, 1000000)

    added = db_conn.add_drink(
            drink_name, drink_type, drink_timing, drink_glass,
            ingredients_list, steps_list, submit_user, IBA_info, drink_id)
    print("Added the following drink.")
    print(added)
    with open('test_drinks/alexander.json', 'w') as outfile:
        json.dump(added, outfile)
