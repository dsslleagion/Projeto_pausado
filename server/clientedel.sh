#!/bin/bash


DIA=0
MES=0
ANO=0

while true
do
        if [ "$DIA" -le 0 ] || [ "$DIA" -gt 31 ]
        then
                read -p "Digite aqui o dia: " DIA
        elif [ "$MES" -le 0 ] || [ "$MES" -gt 12 ]
        then
                read -p "Digite aqui o mês: " MES
        elif  ! [[ "$ANO" =~ ^[0-9]{4}$ ]]
        then
                read -p "Digite aqui o ano: " ANO
        else
                break
        fi
done


VirificaDigito(){
        if echo $1 | grep -qE ^[0-9]{$2}$
        then
                echo "$1"
        else
                echo "0$1"
        fi
}


DIA_RESUL=$(VirificaDigito $DIA 2)
MES_RESUL=$(VirificaDigito $MES 2)


DATA=$(echo $ANO-$MES_RESUL-$DIA_RESUL T00:00:00Z | sed 's/ //g')


MONGO_JSON=$(docker exec MONGODB_APP mongosh --quiet -eval "use clientes" -eval "db.cliente.find({ date: { \$gte: ISODate('$DATA') } })")



IDS=$(echo $MONGO_JSON | sed 's/{/{\n/g; s/}/\n}/g; s/,/\n,/g' | grep cli_id | cut -d ":" -f2 | sed 's/ //g' )

for i in $IDS    
do
        echo "Deletando usuario com ID: $i"
        docker exec mysql-server mysql -h"localhost" -u"root" -p"fatec" -e"use clientes;"  -e "DELETE FROM cliente WHERE id = $i;" > /dev/null 2>&1
done
