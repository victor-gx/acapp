from django.http import JsonResponse


def getinfo(request):
    a = request.GET.get('platform')
    print(a)
