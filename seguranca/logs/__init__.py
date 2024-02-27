from pymongo import MongoClient
import datetime

def error():
    try:
        URI = 'mongodb+srv://fatec:CwNdaImFjuebsHKh@cluster0.gyfwek9.mongodb.net/'
        client = MongoClient(URI)
        db = client['seguranca'] 

        return db.error
    except Exception as e:
        print(f"Erro ao conectar ao MongoDB: {str(e)}")
        return None
    

def info():
    try:
        URI = 'mongodb+srv://fatec:CwNdaImFjuebsHKh@cluster0.gyfwek9.mongodb.net/'
        client = MongoClient(URI)
        db = client['seguranca']

        return db.info
    except Exception as e:
        print(f"Erro ao conectar ao MongoDB: {str(e)}")
        error().insert_one({
            'date': datetime.datetime.now(),
            'message': f"Erro ao conectar ao MongoDB: {str(e)}"
        })
        return None
    

def warm():
    try:
        URI = 'mongodb+srv://fatec:CwNdaImFjuebsHKh@cluster0.gyfwek9.mongodb.net/'
        client = MongoClient(URI)
        db = client['seguranca']

        return db.warm
    except Exception as e:
        print(f"Erro ao conectar ao MongoDB: {str(e)}")
        error().insert_one({
            'date': datetime.datetime.now(),
            'message': f"Erro ao conectar ao MongoDB: {str(e)}"
        })
        return None
