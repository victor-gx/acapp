from django.http import HttpResponse


def index(resquest):
    line1 = '<h1 style="text-align: center">我的第一个网页<h1>'
    return HttpResponse(line1)
