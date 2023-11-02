from django.db import models

# Create your models here.


class Todo(models.Model):
    todo_status = (
        ('Completed', 'Completed'),
        ('Pending', 'Not Completed'),
        
        
    )
    title=models.CharField(max_length=250)
    description=models.TextField()
    completion_status=models.CharField(max_length=10,choices=todo_status)
    due_date=models.DateField()
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)