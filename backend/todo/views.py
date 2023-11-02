from rest_framework.views import APIView
from .serializers import *
from .models import Todo
from rest_framework.response import Response
# Create your views here.


class ToDo(APIView):
    def get(self,request):
        try:
            todos=Todo.objects.all().order_by('-created_at')
            serializer=ToDoSerializer(todos,many=True)
            return Response({'payload':serializer.data,'status':200,'message':'OK'})
        except Exception as e:
            return Response({'error':str(e),'status':404})

    def post(self,request):
        try:
            data=request.data
            serializer=PostTodoSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':201,'message':'Todo Created'})
            else:
                return Response({'status':400,'message':'Invalid Data','error':serializer.errors})
        except Exception as e:
            return Response({'status':400,'message':'something went wrong','error':str(e)})
        
    def patch(self,request):
        try:
            data=request.data
            id=data['id']
            todo=Todo.objects.get(id=id)
            serializer=PostTodoSerializer(instance=todo,data=data,partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status':200,'message':'Updated Successfully'})
            else:
                return Response({'status':400,'error':serializer.errors,'message':'Invalid Data'})
            
        except Exception as e:
            return Response({'status':400,'error':str(e),'message':'Something Went Wrong'})
    
    def delete(self,request):
        try:
            id=request.GET.get('id')
            todo=Todo.objects.get(id=id)
            todo.delete()
            return Response({'status':200,'message':"OK"})
        except Exception as e:
            return Response({'status':400,'message':"Something went Wrong",'error':str(e)})
