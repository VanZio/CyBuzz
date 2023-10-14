import insert
import database
from flask import Flask, request

app = Flask(__name__)

def main():
    db_config = {
        "host": "feenix-mariadb.swin.edu.au",
        "user": "s103989568",
        "password": "170803",
        "database": "s103989568_db",
    }

    try:
        database1 = database.Database(**db_config)
        database1.createtable()

        insert1 = insert.intoDatabase(**db_config)
        insert1.openfile(f"backend/app/Downloads/results/{filename}")
        insert1.insertrep(contractName)
        insert1.insertvul()
        insert1.insertrepvul()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()