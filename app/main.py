from flask import Flask, jsonify, request, render_template, session, redirect, url_for

from app.services import (
    get_all_members,
    add_member,
    update_member,
    delete_member,
    create_user,
    verify_user,
    get_total_members,
    get_department_counts
)

app = Flask(__name__)

# Secret key for login sessions
app.secret_key = "member-management-secret-key"


# =========================
# LOGIN
# =========================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        username = request.form.get("username")
        password = request.form.get("password")

        user = verify_user(username, password)

        if user:
            session["user_id"] = user["id"]
            session["username"] = user["username"]

            return redirect(url_for("home"))

        return render_template(
            "login.html",
            error="Invalid username or password"
        )

    return render_template("login.html")


# =========================
# LOGOUT
# =========================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("login"))


# =========================
# HOME
# =========================

@app.route("/")
def home():

    if "user_id" not in session:
        return redirect(url_for("login"))

    return render_template("index.html")


# =========================
# GET ALL MEMBERS
# =========================

@app.route("/members", methods=["GET"])
def members():

    if "user_id" not in session:
        return jsonify({
            "message": "Unauthorized"
        }), 401

    members = get_all_members()

    return jsonify(members)


# =========================
# DASHBOARD
# =========================

@app.route("/dashboard", methods=["GET"])
def dashboard():
    if "user_id" not in session:
        return redirect(url_for("login"))

    total_members = get_total_members()
    department_counts = get_department_counts()

    return jsonify({
        "total_members": total_members,
        "department_counts": department_counts
    })


# =========================
# CREATE MEMBER
# =========================

@app.route("/members", methods=["POST"])
def create_member():

    if "user_id" not in session:
        return jsonify({
            "message": "Unauthorized"
        }), 401

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Invalid request data"
        }), 400

    required_fields = [
        "membership_id",
        "name",
        "department",
        "contact_no",
        "company_name"
    ]

    # Required field validation
    for field in required_fields:

        if not data.get(field) or not str(data[field]).strip():

            return jsonify({
                "message": f"{field.replace('_', ' ').title()} is required"
            }), 400

    # Contact number validation
    contact = str(data["contact_no"]).strip()

    if not contact.isdigit() or len(contact) != 10:

        return jsonify({
            "message": "Contact number must contain exactly 10 digits"
        }), 400

    try:

        add_member(
            data["membership_id"],
            data["name"],
            data["department"],
            data["contact_no"],
            data["company_name"]
        )

        return jsonify({
            "message": "Member added successfully"
        }), 201

    except Exception as error:

        print("Create member error:", error)

        return jsonify({
            "message": "Membership ID already exists or could not add member"
        }), 400


# =========================
# UPDATE MEMBER
# =========================

@app.route("/members/<membership_id>", methods=["PUT"])
def edit_member(membership_id):

    if "user_id" not in session:
        return jsonify({
            "message": "Unauthorized"
        }), 401

    data = request.get_json()

    if not data:
        return jsonify({
            "message": "Invalid request data"
        }), 400

    required_fields = [
        "name",
        "department",
        "contact_no",
        "company_name"
    ]

    # Required field validation
    for field in required_fields:

        if not data.get(field) or not str(data[field]).strip():

            return jsonify({
                "message": f"{field.replace('_', ' ').title()} is required"
            }), 400

    # Contact number validation
    contact = str(data["contact_no"]).strip()

    if not contact.isdigit() or len(contact) != 10:

        return jsonify({
            "message": "Contact number must contain exactly 10 digits"
        }), 400

    rows_updated = update_member(
        membership_id,
        data["name"],
        data["department"],
        data["contact_no"],
        data["company_name"]
    )

    if rows_updated == 0:

        return jsonify({
            "message": "Member not found"
        }), 404

    return jsonify({
        "message": "Member updated successfully"
    }), 200


# =========================
# DELETE MEMBER
# =========================

@app.route("/members/<membership_id>", methods=["DELETE"])
def remove_member(membership_id):

    if "user_id" not in session:
        return jsonify({
            "message": "Unauthorized"
        }), 401

    rows_deleted = delete_member(membership_id)

    if rows_deleted == 0:

        return jsonify({
            "message": "Member not found"
        }), 404

    return jsonify({
        "message": "Member deleted successfully"
    }), 200


# =========================
# RUN APPLICATION
# =========================

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )