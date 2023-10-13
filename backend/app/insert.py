import re
import mysql.connector


class intoDatabase:
    def __init__(self, host, username, password, database):
        self.db_config = {
        "host": host,
        "user": username,
        "password": password,
        "database": database
        }
    

    def connect(self):
        self.conn = mysql.connector.connect(**self.db_config)
        self.cursor = self.conn.cursor()
    

    def commitclose(self):
        self.conn.commit()
        self.cursor.close()
        self.conn.close()


    def openfile(self, file_name):  # opens file and gets the issues and serverity
        with open(file_name, "r") as file: ##will be replaced with filename from upload page using variable
            markdown_content = file.read()
        pattern = r"- \[(?P<issue_name>[\w-]+)\]\(#[\w-]+\) \((?P<results_count>\d+ results)\) \((?P<severity>[\w]+)\)"
        self.matches = re.findall(pattern, markdown_content)

        self.perissue = []
        desc = []
        found = False
        with open(file_name, "r") as file:
            for line in file:
                if '##' in line:
                    self.perissue.append(desc)
                    desc = []
                else:
                    if found:
                        desc.append(line.strip())
                        found = False
                    if '[ ]' in line:
                        found = True        
        self.perissue.pop(0)  # pop first array entry as blank


    def insert(self):
        for match, desc in zip(self.matches, self.perissue):
            issue_name, results_count, severity = match
            descr = '\n'.join(desc)
            query = "INSERT INTO Vulnerabilities (vulnerability_name, results, impact, description) VALUES (%s, %s, %s, %s)"
            val = (issue_name, results_count, severity, descr)
            self.cursor.execute(query, val)



def main():
    insert = intoDatabase("feenix-mariadb.swin.edu.au", "s103989568", "170803", "s103989568_db")
    insert.connect()
    insert.openfile(r"backend\app\Downloads\results\Smart_result.md")
    insert.insert()
    insert.commitclose()

if __name__ == '__main__':
    main()