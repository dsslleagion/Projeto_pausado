import argparse
from models.mongo import getIdUsers
from models.mysql import mysqlRemoveUsers,mysqlBackup,mysqlRestaurar
from func import listar_arquivos

# mysqlRemoveUsers(getIdUsers())

# mysqlBackup('bancoteste.mysql.database.azure.com', 'fatec', 'sjc123@w', 'clientes', './backup/', False)
# mysqlRestaurar('bancoteste.mysql.database.azure.com', 'fatec', 'sjc123@w', 'clientes', './backup/t.sql', False)

#listar_arquivos('./backup/')


def main():
    parser = argparse.ArgumentParser(description="""Exemplo de uso
                                     app [options] command
                                     """)
    
    # Adicione aqui os argumentos que seu programa precisa
    parser.add_argument('-l', '--list', action='store_true', help='Listagem dos arquivos de backup.')
    parser.add_argument('-g', '--generate', action='store_true', help='Gerar backup.')
    parser.add_argument('-r', '--restore', help='Restaurar backup.')
    
    args = parser.parse_args()

    # Acesse os valores dos argumentos como atributos de args
    if args.list:
        listar_arquivos('./backup/')
    
    if args.generate:
        mysqlBackup('bancoteste.mysql.database.azure.com', 'fatec', 'sjc123@w', 'clientes', './backup/', False)
    
    if args.restore:
        arquivo = f'./backup/{args.restore}'
        mysqlRestaurar('bancoteste.mysql.database.azure.com', 'fatec', 'sjc123@w', 'clientes', arquivo, False)
        mysqlRemoveUsers(getIdUsers())

if __name__ == '__main__':
    main()