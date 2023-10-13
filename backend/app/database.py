import mysql.connector


class Database:
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


    def createtable(self):
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS Vulnerabilities (
            vulnerability_id INT AUTO_INCREMENT PRIMARY KEY,
            vulnerability_name VARCHAR(255) NOT NULL,
            results INT,
            impact ENUM('High', 'Medium', 'Low', 'Informational') NOT NULL,
            description TEXT
            )
        """)

        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS Reports (
            report_id INT AUTO_INCREMENT PRIMARY KEY,
            contract_name VARCHAR(255) NOT NULL,
            audit_date DATE NOT NULL
            )
        """)

        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS ReportVulnerabilities (
            report_vulnerability_id INT AUTO_INCREMENT PRIMARY KEY,
            report_id INT,
            vulnerability_id INT,
            FOREIGN KEY (report_id) REFERENCES Reports(report_id),
            FOREIGN KEY (vulnerability_id) REFERENCES Vulnerabilities(vulnerability_id)
            )
        """)


    def commitclose(self):
        self.conn.commit()
        self.cursor.close()
        self.conn.close()


def main():
    database1 = Database("feenix-mariadb.swin.edu.au", "s103989568", "170803", "s103989568_db")
    database1.connect()
    database1.createtable()
    database1.commitclose()



if __name__ == '__main__':
    main()