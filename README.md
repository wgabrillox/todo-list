FRONT END:
In client folder, run “npm run dev”

BACK END:
It will need a mongoDb cluster, create a collection named “todolist”, as well as a document named “Items”.
Create a file named “config.env” and create two env variables 
ATLAS_URI=<mongodb connection string>
PORT=5050

Then use the command “node —env-file=config.env server”
