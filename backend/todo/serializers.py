from .models import Todo
from rest_framework import serializers
class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Todo
        fields='__all__'

class PostTodoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Todo
        fields=['title','description','completion_status','due_date']