from app.database import get_connection
from werkzeug.security import generate_password_hash, check_password_hash

def add_member(membership_id, name, department, contact_no, company_name):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO members
        (membership_id, name, department, contact_no, company_name)
        VALUES (%s, %s, %s, %s, %s)
    """

    values = (
        membership_id,
        name,
        department,
        contact_no,
        company_name
    )

    cursor.execute(query, values)
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


def update_member(
    membership_id,
    name,
    department,
    contact_no,
    company_name
):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        UPDATE members
        SET
            name = %s,
            department = %s,
            contact_no = %s,
            company_name = %s
        WHERE membership_id = %s
    """

    values = (
        name,
        department,
        contact_no,
        company_name,
        membership_id
    )

    cursor.execute(query, values)

    connection.commit()

    rows_updated = cursor.rowcount

    cursor.close()
    connection.close()

    return rows_updated

def delete_member(membership_id):

    connection = get_connection()
    cursor = connection.cursor()

    query = """
        DELETE FROM members
        WHERE membership_id = %s
    """

    cursor.execute(query, (membership_id,))
    connection.commit()

    rows_deleted = cursor.rowcount

    cursor.close()
    connection.close()

    return rows_deleted
def create_user(username, password_hash):
    connection = get_connection()
    cursor = connection.cursor()

    query = """
        INSERT INTO users (username, password_hash)
        VALUES (%s, %s)
    """

    cursor.execute(query, (username, password_hash))
    connection.commit()

    cursor.close()
    connection.close()
def verify_user(username, password):
    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT id, username, password_hash
        FROM users
        WHERE username = %s
    """

    cursor.execute(query, (username,))

    user = cursor.fetchone()

    cursor.close()
    connection.close()

    if user is None:
        return None

    if check_password_hash(
        user["password_hash"],
        password
    ):
        return user

    return None
def update_user_password(username, new_password):
    connection = get_connection()
    cursor = connection.cursor()

    password_hash = generate_password_hash(new_password)

    query = """
        UPDATE users
        SET password_hash = %s
        WHERE username = %s
    """

    cursor.execute(query, (password_hash, username))

    connection.commit()

    rows_updated = cursor.rowcount

    cursor.close()
    connection.close()

    return rows_updated
def get_total_members():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT COUNT(*) FROM members")

    total = cursor.fetchone()[0]

    cursor.close()
    connection.close()

    return total


def get_department_counts():

    connection = get_connection()
    cursor = connection.cursor(dictionary=True)

    query = """
        SELECT department, COUNT(*) AS total
        FROM members
        GROUP BY department
        ORDER BY total DESC
    """

    cursor.execute(query)

    departments = cursor.fetchall()

    cursor.close()
    connection.close()

    return departments