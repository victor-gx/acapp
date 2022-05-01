from django.shortcuts import render


def index(request):
    return render(request, "multiends/web.html")
    # return render(request, "happy-new-year/source/index.html")
