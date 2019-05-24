from pymongo import MongoClient

print("This script is used to load a list of ingredients into the recipe database.")
print("This will remove all previous ingredients, so only use it to initialize the list.")
filename = raw_input("Input the path to the file you'd like to import.")

ingredients_list = []

with open(filename, 'r') as input_file:
    for ingredient in input_file:

        ingredients_list.append({"label": ingredient.rstrip('\n'), "value": ingredient.rstrip('\n')})

client = MongoClient()
resources = client['RecipeBook'].resources

recipe_id = resources.update_one(
    {
        "name": "ingredients-list"
    },
    {
        '$set': {
            "list" : ingredients_list 
        }
    }
)

