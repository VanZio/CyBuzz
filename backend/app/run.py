import insert
import database

def main():
    database1 = database.Database("feenix-mariadb.swin.edu.au", "s103989568", "170803", "s103989568_db")
    database1.createtable()   

    insert1 = insert.intoDatabase("feenix-mariadb.swin.edu.au", "s103989568", "170803", "s103989568_db")
    insert1.openfile(r"backend\app\Downloads\results\Smart_result.md")
    insert1.insertrep("ContractA")
    insert1.insertvul()
    insert1.insertrepvul()   


if __name__ == '__main__':
    main()