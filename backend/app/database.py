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


    def commit(self):
        self.conn.commit()

    
    def close(self):
        self.cursor.close()
        self.conn.close()


    def createtable(self):
        self.connect()
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS Vulnerabilities (
            vulnerability_id INT AUTO_INCREMENT PRIMARY KEY,
            vulnerability_name VARCHAR(255) NOT NULL,
            results INT,
            impact ENUM('High', 'Medium', 'Low', 'Informational') NOT NULL,
            description TEXT
            )
        """)
        self.commit()

        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS Reports (
            report_id INT AUTO_INCREMENT PRIMARY KEY,
            contract_name VARCHAR(255) NOT NULL,
            audit_date DATE NOT NULL,
            num_vulnerability INT
            )
        """)
        self.commit()

        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS ReportVulnerabilities (
            report_vulnerability_id INT AUTO_INCREMENT PRIMARY KEY,
            report_id INT,
            vulnerability_id INT,
            FOREIGN KEY (report_id) REFERENCES Reports(report_id),
            FOREIGN KEY (vulnerability_id) REFERENCES Vulnerabilities(vulnerability_id)
            )
        """)
        self.commit()
        self.close()

