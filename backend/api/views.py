# from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from .models import *
from .serializers import *
from rest_framework.response import Response



class ProjectManagerViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ProjectManager.objects.all()
    serializer_class = ProjectManagerSerializer

    def list(self, request):
        queryset = ProjectManager.objects.all()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)
    


class ProjectsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Projects.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = Projects.objects.all()
        serializer = self.serializer_class(queryset, many = True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else :
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        project = self.queryset.get(pk = pk)
        # project = get_object_or_404(Projects, pk=pk)
        serializer = self.serializer_class(project)
        return Response(serializer.data)

    def update(self, request, pk=None):
        project = self.queryset.get(pk = pk)

        serializer = self.serializer_class(project, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else :
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        project = self.queryset.get(pk = pk)
        # project = get_object_or_404(Projects, pk=pk)
        project.delete()

        return Response(status=204)
    



# from django.shortcuts import get_object_or_404
# from rest_framework import viewsets, permissions
# from .models import Projects
# from .serializers import ProjectSerializer
# from rest_framework.response import Response

# class ProjectsViewSet(viewsets.ModelViewSet):
#     permission_classes = [permissions.AllowAny]
#     queryset = Projects.objects.all()
#     serializer_class = ProjectSerializer

#     def list(self, request):
#         queryset = Projects.objects.all()
#         serializer = self.serializer_class(queryset, many=True)
#         return Response(serializer.data)

#     def create(self, request):
#         serializer = self.serializer_class(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=201)
#         return Response(serializer.errors, status=400)

#     def retrieve(self, request, pk=None):
#         project = get_object_or_404(Projects, pk=pk)
#         serializer = self.serializer_class(project)
#         return Response(serializer.data)

#     def update(self, request, pk=None):
#         project = get_object_or_404(Projects, pk=pk)
#         serializer = self.serializer_class(project, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=400)

#     def destroy(self, request, pk=None):
#         project = get_object_or_404(Projects, pk=pk)
#         project.delete()
#         return Response(status=204)
