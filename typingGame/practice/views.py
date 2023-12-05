from django.shortcuts import render

# Create your views here.
import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

from .models import * 

def index(request):
    return render(request, "practice/index.html")

def list(request, type):
    if type == "recommend" or "":#Find all the documents, order by timestamp
        docList = Doc.objects.order_by("-createdTime")
        if len(docList) > 20:
            docList = docList[:20]
    if type == "myList":#Add paginator here
        docList = Doc.objects.filter(user=request.user).order_by("-createdTime")
    return render(request, "practice/list.html", {
        "docs": docList,
        "type":type
    })


def typing(request, doc_id):
    try:
        item = Doc.objects.get(pk=doc_id)
    except Doc.DoesNotExist:
        return JsonResponse({
            "error": "Invalid document Id."
        }, status=400)
    return render(request, "practice/typing.html", {
        "title": item.docName,
        "docId": item.id
    })

def add(request):
    if request.method == 'GET':
        return render(request, "practice/add.html", {
            "title":"",
            "content":"",
            "left": 1500
        })
    else:
        name = request.POST['name']
        content = request.POST['content']
        #Formalized name and content
        name = ' '.join(word.capitalize() for word in name.split())
        try:
            oldDoc = Doc.objects.get(docName=name,userId=request.user.id)
        except Doc.DoesNotExist:            
            name = ' '.join(word.capitalize() for word in name.split())
            newDoc = Doc(user=request.user, userId=request.user.id, docName=name, docContent=content)
            newDoc.save()
            return HttpResponseRedirect(reverse("list", args=["myList"]))
        oldDoc.docContent=content
        oldDoc.save()
        return HttpResponseRedirect(reverse("list", args=["myList"]))

def edit(request, doc_id):
    try:
        curDoc = Doc.objects.get(id=doc_id)
    except Doc.DoesNotExist:
        return JsonResponse({"error": "The document id does not exit."}, status=400)
    title = curDoc.docName
    content = curDoc.docContent
    left = 1500 - len(content)
    return render(request, "practice/add.html", {
            "title":title,
            "content":content,
            "left": left
    })


#####API calls########################################################################################
def read(request, doc_id):
    if request.method == 'GET':
        item = Doc.objects.get(pk=doc_id)
        content = item.docContent
        lines=[]
        start, end = 0, 0
        while end < len(content):
            if content[end] == " " and end - start > 75:
                lines.append(content[start:end])            
                end += 1
                start = end
                continue
            elif content[end] == '\r' or content[end] == '\n':
                if start != end:
                    lines.append(content[start:end])
                end += 2
                start = end
                continue
            else:
                end += 1
        return JsonResponse(lines, safe=False)




###Below Functions to handle login status#################################################################################################################

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "practice/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "practice/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "practice/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "practice/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "practice/register.html")
