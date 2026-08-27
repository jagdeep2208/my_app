from app.database import get_connection


def get_user_by_username(username):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM users WHERE username = %s",
        (username,)
    )

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    return user


def create_user(username, password_hash):
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        "INSERT INTO users (username, password_hash) VALUES (%s, %s)",
        (username, password_hash)
    )

    connection.commit()

    cursor.close()
    connection.close()


def get_all_members():
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute("SELECT * FROM members")

    members = cursor.fetchall()

    cursor.close()
    connection.close()

    return members