import re
import mysql.connector
from datetime import datetime


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
        self.cursor = self.conn.cursor(buffered=True)
    

    def commit(self):
        self.conn.commit()

    
    def close(self):
        self.cursor.close()
        self.conn.close()


    def openfile(self, file_name):  # opens file and gets the issues and serverity
        self.perissue = []
        desc = []
        found = False

        with open(file_name, "r") as file: #will be replaced with filename from upload page using variable
            length = len(file.readlines())
            file.seek(0,0)
            for line in file:   
                length -= 1                
                if '##' in line or length == 0:
                    self.perissue.append(desc)
                    desc = []
                else:
                    if found:
                        desc.append(line.strip())
                        found = False
                    if '[ ]' in line:
                        found = True  
            file.seek(0,0)            
            markdown_content = file.read()
        pattern = r"- \[(?P<issue_name>[\w-]+)\]\(#[\w-]+\) \((?P<results_count>\d+ results)\) \((?P<severity>[\w]+)\)"
        self.matches = re.findall(pattern, markdown_content)
        self.perissue.pop(0)  # pop first array entry as blank


    def insertvul(self):
        issue_num = 0
        self.connect()
        for match, desc in zip(self.matches, self.perissue):
            issue_num += 1
            issue_name, results_count, severity = match
            descr = '\n'.join(desc)
            self.cursor.execute(
                """INSERT INTO Vulnerabilities (vulnerability_name, results, impact, description) VALUES (%s, %s, %s, %s)"""
                , (issue_name, results_count, severity, descr) 
            )
            self.commit()
        self.close()
        self.num = issue_num


    def insertrep(self, report_name):
        self.report_name = report_name
        date = datetime.today().strftime('%Y-%m-%d')
        self.connect()
        self.cursor.execute(
            """INSERT INTO Reports (contract_name, audit_date, num_vulnerability) VALUES (%s, %s, %s)""" 
            , (report_name, date, self.num)
        )
        self.commit()
        self.close()


    def insertrepvul(self):
        self.connect()
        self.cursor.execute(
            """SELECT report_id FROM Reports WHERE contract_name = %s""" 
            , (self.report_name, )
        )
        report_id = self.cursor.fetchone()
        report_id = ''.join(map(str, report_id))  # needs error handling for when sql fetch is None.
        self.close()

        self.connect()
        for match in self.matches:
            issue_name = match[0]
            self.cursor.execute(
                """SELECT vulnerability_id FROM Vulnerabilities WHERE vulnerability_name = %s""" 
                , (issue_name, )
            )
            issue_id = self.cursor.fetchone()
            issue_id = ''.join(map(str, issue_id))  # needs error handling for when sql fetch is None.

            self.cursor.execute(
                """INSERT INTO ReportVulnerabilities (report_id, vulnerability_id) VALUES (%s, %s)"""
                , (report_id, issue_id)
            )
        self.commit()
        self.close()


