import mysql.connector


def get_connection():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="J22@2005",
        database="my_app_db"
    )

    return connection