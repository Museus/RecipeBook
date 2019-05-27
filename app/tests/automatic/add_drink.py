import sys
import os
import datetime
import json
from collections import OrderedDict
from random import randint

sys.path.insert(0, "/home/jredding/devel/RecipeBook/src")

from db_conn import DBConnection

db_conn = DBConnection()

test_drink_path = "/home/jredding/devel/RecipeBook/tests/test_drinks"

for drink_file in os.listdir(test_drink_path):
    with open(os.path.join(test_drink_path, drink_file)) as json_file:
        drink_info = json.load(json_file)
        drink_info['submit_time'] = datetime.datetime.now()
        print("Adding the following drink.")
        print(json.dumps(drink_info, indent=2))

        db_conn.add_drink(drink_info)
