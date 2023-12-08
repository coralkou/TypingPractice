
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("typing/<int:doc_id>", views.typing, name='typing'),
    path("add", views.add, name="add"),
    path("list/<str:type>", views.list, name="list"),
    path("profile",views.profile, name="profile"),
    #login status related
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    # API routes
    path("read/<str:doc_id>", views.read, name="read"),
    path("edit/<int:doc_id>", views.edit, name="edit"),
    path("obtainScore/<str:title>", views.obtainScore, name="obtainScore"),
    path('recordScore', views.recordScore, name="recordScore")
]
