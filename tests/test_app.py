import pytest

from app.main import app


@pytest.fixture
def client():
    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


def test_login_page(client):
    response = client.get("/login")

    assert response.status_code == 200


def test_invalid_login(client):
    response = client.post(
        "/login",
        data={
            "username": "wrong_user",
            "password": "wrong_password"
        }
    )

    assert response.status_code == 200
    assert b"Invalid username or password" in response.data


def test_dashboard_requires_login(client):
    response = client.get("/dashboard")

    assert response.status_code in [302, 401]