import insert
import database
import os


def main():
    path = "backend/app/Downloads/results"
    filerecent = None
    timerecent = 0
    for entry in os.scandir(path):
        if entry.is_file():
            # get the modification time of the file using entry.stat().st_mtime_ns
            mod_time = entry.stat().st_mtime_ns
            if mod_time > timerecent:
                # update the most recent file and its modification time
                filerecent = entry.name
                timerecent = mod_time

    with open('backend/app/contract_name.txt', 'r') as f:
        lines = f.readlines()
        contract_name = lines[-1]


    try:
        database1 = database.Database("feenix-mariadb.swin.edu.au", "s103989568", "170803", "s103989568_db")
        database1.createtable()

        insert1 = insert.intoDatabase("feenix-mariadb.swin.edu.au", "s103989568", "170803", "s103989568_db")
        insert1.openfile(f"backend/app/Downloads/results/{filerecent}")
        print(filerecent)
        insert1.insertrep(contract_name)
        insert1.insertvul()
        insert1.insertrepvul()
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()