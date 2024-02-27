from pymongo import MongoClient
from logs import error, info, warm
import datetime

def mongoConnection():
    try:
        URI = 'mongodb+srv://fatec:CwNdaImFjuebsHKh@cluster0.gyfwek9.mongodb.net/'
        client = MongoClient(URI)
        db = client['seguranca']  
        print("Conexão bem-sucedida ao MongoDB")
        return db
    except Exception as e:
        print(f"Erro ao conectar ao MongoDB: {str(e)}")
        error().insert_one({
            'date': datetime.datetime.now(),
            'message': f"Erro ao conectar ao MongoDB: {str(e)}"
        })
        return None
    
def getIdUsers():
    try:
        db = mongoConnection()
        ids = []
        for i in db.users.find():
            ids.append(int(i['cli_id']))
        return tuple(ids)
    except Exception as e :
        error().insert_one({
            'date': datetime.datetime.now(),
            'message': f"Erro ao conectar ao MongoDB: {str(e)}"
        })
        return e